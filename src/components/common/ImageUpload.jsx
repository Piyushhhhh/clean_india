import React, { useRef, useState, useEffect } from 'react';
import { Camera, CheckCircle, XCircle } from 'lucide-react';
import { compressImage } from '../../utils/imageCompression';
import { verifyGarbageImage, preloadModel } from '../../utils/aiImageVerification';
import AIVerificationBadge from './AIVerificationBadge';

const ImageUpload = ({ image, setImage, onVerificationChange }) => {
  const fileInputRef = useRef(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verification, setVerification] = useState(null);

  // Preload AI model when component mounts
  useEffect(() => {
    preloadModel();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Compress image first
      const compressed = await compressImage(file);
      setImage(compressed);

      // Run AI verification
      setIsVerifying(true);
      setVerification(null);
      
      try {
        const result = await verifyGarbageImage(compressed);
        setVerification(result);
        
        // Notify parent component of verification result
        if (onVerificationChange) {
          onVerificationChange(result);
        }
      } catch (aiError) {
        console.error('AI verification error:', aiError);
        // If AI fails, still allow the upload
        setVerification({
          isValid: true,
          confidence: 0,
          detectedItems: [],
          reason: 'AI verification unavailable',
        });
      } finally {
        setIsVerifying(false);
      }
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setVerification(null);
    if (onVerificationChange) {
      onVerificationChange(null);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Photo Evidence
        <span className="ml-2 text-xs text-gray-500">(AI-powered verification)</span>
      </label>
      
      {!image ? (
        <div 
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-green-400 transition-colors group"
        >
          <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition-colors">
            <Camera className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-sm text-gray-500 font-medium">Tap to take picture or upload</span>
          <span className="text-xs text-gray-400 mt-1">AI will verify image quality</span>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="relative w-full h-48 bg-gray-900 rounded-xl overflow-hidden group">
            <img src={image} alt="Preview" className="w-full h-full object-cover opacity-90" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white/90 p-1 rounded-full text-red-500 hover:bg-white transition-colors z-10"
            >
              <XCircle className="h-6 w-6" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <span className="text-white text-xs font-medium flex items-center">
                <CheckCircle className="h-3 w-3 mr-1 text-green-400" /> Photo Attached
              </span>
            </div>
          </div>
          
          {/* AI Verification Badge */}
          <AIVerificationBadge 
            verification={verification} 
            isVerifying={isVerifying}
          />
        </div>
      )}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        capture="environment"
        className="hidden" 
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUpload;


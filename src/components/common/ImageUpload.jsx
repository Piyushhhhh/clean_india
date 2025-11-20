import React, { useRef } from 'react';
import { Camera, CheckCircle, XCircle } from 'lucide-react';
import { compressImage } from '../../utils/imageCompression';

const ImageUpload = ({ image, setImage }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file);
      setImage(compressed);
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Photo Evidence</label>
      
      {!image ? (
        <div 
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-green-400 transition-colors group"
        >
          <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition-colors">
            <Camera className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-sm text-gray-500 font-medium">Tap to take picture or upload</span>
        </div>
      ) : (
        <div className="relative w-full h-48 bg-gray-900 rounded-xl overflow-hidden group">
          <img src={image} alt="Preview" className="w-full h-full object-cover opacity-90" />
          <button
            type="button"
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-white/90 p-1 rounded-full text-red-500 hover:bg-white transition-colors"
          >
            <XCircle className="h-6 w-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className="text-white text-xs font-medium flex items-center">
              <CheckCircle className="h-3 w-3 mr-1 text-green-400" /> Photo Attached
            </span>
          </div>
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


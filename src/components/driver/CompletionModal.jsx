import React, { useState, useRef } from 'react';
import { X, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { compressImage } from '../../utils/imageCompression';

const CompletionModal = ({ report, onClose, onComplete, isSubmitting }) => {
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [notes, setNotes] = useState('');
  const fileInputRef = useRef(null);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file);
      setAfterPhoto(compressed);
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (!afterPhoto) {
      alert('Please take an "after" photo showing the cleaned location.');
      return;
    }
    onComplete(report.id, afterPhoto, notes);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">Complete Collection</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Location Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">{report.location}</h3>
            <p className="text-sm text-gray-600">
              {report.wasteType} • {report.severity || 'Normal'}
            </p>
          </div>

          {/* Before/After Comparison */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Photo Evidence</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Before Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Before (Reported)
                </label>
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {report.image ? (
                    <img
                      src={report.image}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span className="text-sm">No image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* After Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  After (Cleaned) <span className="text-red-500">*</span>
                </label>
                {!afterPhoto ? (
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="relative aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-green-400 transition-colors group"
                  >
                    <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition-colors">
                      <Camera className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium text-center px-2">
                      Take photo of cleaned area
                    </span>
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                    <img
                      src={afterPhoto}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setAfterPhoto(null)}
                      className="absolute top-2 right-2 bg-white/90 p-1 rounded-full text-red-500 hover:bg-white transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <span className="text-white text-xs font-medium flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1 text-green-400" /> Photo Captured
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
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Collected 3 bags of waste, cleaned surrounding area..."
              className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
              rows={3}
            />
          </div>

          {/* Warning */}
          {!afterPhoto && (
            <div className="flex items-start space-x-2 text-sm text-orange-600 bg-orange-50 px-4 py-3 rounded-lg border border-orange-200">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Photo Required</p>
                <p className="text-xs mt-1">
                  Please take an "after" photo to verify the collection was completed.
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!afterPhoto || isSubmitting}
              className={`flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                !afterPhoto || isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-green-700 active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Completing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Mark as Completed</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;


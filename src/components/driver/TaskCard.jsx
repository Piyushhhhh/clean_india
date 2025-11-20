import React, { useState } from 'react';
import { MapPin, CheckCircle, Image as ImageIcon } from 'lucide-react';
import CompletionModal from './CompletionModal';

const TaskCard = ({ report, onComplete }) => {
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompleteClick = () => {
    setShowCompletionModal(true);
  };

  const handleModalComplete = async (reportId, afterPhoto, notes) => {
    setIsSubmitting(true);
    await onComplete(reportId, afterPhoto, notes);
    setIsSubmitting(false);
    setShowCompletionModal(false);
  };
  const isPriority = report.severity === 'Emergency' || 
                     report.severity === 'High' || 
                     report.wasteType === 'Hazardous';

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      {isPriority && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
      )}
      
      <div className="flex gap-4">
        {/* Image Thumbnail */}
        {report.image ? (
          <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <img src={report.image} alt="Location" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 border border-gray-200">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              ID: {report.id.slice(0, 4)}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
              report.severity === 'Emergency' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {report.severity}
            </span>
          </div>
          
          <h4 className="text-lg font-bold text-gray-900 mb-1 truncate">{report.location}</h4>
          <p className="text-sm text-gray-600 mb-3">
            {report.wasteType} • {report.description || 'No details'}
          </p>
          
          <div className="flex space-x-3">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(report.location)}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              <MapPin className="h-4 w-4 mr-1" /> Navigate
            </a>
          </div>
        </div>
        
        <div className="flex flex-col justify-center pl-2 border-l border-gray-100">
          <button
            onClick={handleCompleteClick}
            className="bg-green-600 text-white p-3 rounded-lg shadow hover:bg-green-700 active:scale-95 transition-all flex flex-col items-center w-20"
          >
            <CheckCircle className="h-6 w-6 mb-1" />
            <span className="text-xs font-bold">Collect</span>
          </button>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <CompletionModal
          report={report}
          onClose={() => setShowCompletionModal(false)}
          onComplete={handleModalComplete}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default TaskCard;


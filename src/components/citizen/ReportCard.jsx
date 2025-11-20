import React, { useState } from 'react';
import { CheckCircle, Clock, Image as ImageIcon, Eye } from 'lucide-react';

const ReportCard = ({ report }) => {
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  
  const hasAfterPhoto = report.status === 'completed' && report.afterPhoto;

  return (
    <>
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
        {/* Thumbnail */}
        <div className="relative">
          {report.image ? (
            <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
              <img src={report.image} alt="Evidence" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 border border-gray-100">
              <ImageIcon className="h-8 w-8" />
            </div>
          )}
          {hasAfterPhoto && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
              ✓
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                report.wasteType === 'Hazardous' ? 'bg-red-100 text-red-800' :
                report.wasteType === 'Wet Waste' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {report.wasteType}
              </span>
              <span className="text-xs text-gray-400">
                {report.createdAt?.toDate().toLocaleDateString()}
              </span>
            </div>
            {report.status === 'completed' ? (
              <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full border border-green-100">
                <CheckCircle className="h-3 w-3 mr-1" /> DONE
              </span>
            ) : (
              <span className="flex items-center text-orange-600 text-xs font-bold bg-orange-50 px-2 py-1 rounded-full border border-orange-100">
                <Clock className="h-3 w-3 mr-1" /> PENDING
              </span>
            )}
          </div>
          <h4 className="font-semibold text-gray-800 leading-tight mb-1">{report.location}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
          
          {/* View Before/After Button */}
          {hasAfterPhoto && (
            <button
              onClick={() => setShowBeforeAfter(true)}
              className="mt-2 text-xs text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              <Eye className="h-3 w-3 mr-1" />
              View Before/After Photos
            </button>
          )}
        </div>
      </div>

      {/* Before/After Modal */}
      {showBeforeAfter && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowBeforeAfter(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800">Before & After</h2>
              <button
                onClick={() => setShowBeforeAfter(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-1">✓ Collection Completed</h3>
                <p className="text-sm text-gray-600">{report.location}</p>
                {report.completionNotes && (
                  <p className="text-sm text-gray-600 mt-2 italic">"{report.completionNotes}"</p>
                )}
                {report.resolvedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Completed on: {report.resolvedAt.toDate().toLocaleString()}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Before (Reported)</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img src={report.image} alt="Before" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">After (Cleaned)</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img src={report.afterPhoto} alt="After" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportCard;


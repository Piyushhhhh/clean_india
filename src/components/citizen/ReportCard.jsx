import React from 'react';
import { CheckCircle, Clock, Image as ImageIcon } from 'lucide-react';

const ReportCard = ({ report }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
      {/* Thumbnail */}
      {report.image ? (
        <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          <img src={report.image} alt="Evidence" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 border border-gray-100">
          <ImageIcon className="h-8 w-8" />
        </div>
      )}
      
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
      </div>
    </div>
  );
};

export default ReportCard;


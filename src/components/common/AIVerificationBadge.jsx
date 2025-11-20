import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Sparkles } from 'lucide-react';

const AIVerificationBadge = ({ verification, isVerifying }) => {
  if (isVerifying) {
    return (
      <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg animate-pulse">
        <Sparkles className="h-4 w-4" />
        <span className="font-medium">AI analyzing image...</span>
      </div>
    );
  }

  if (!verification) return null;

  const { isValid, confidence, detectedItems, reason } = verification;

  if (isValid) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">AI Verified ✓</span>
          {confidence > 0 && (
            <span className="text-xs text-green-500">
              {confidence.toFixed(0)}% confidence
            </span>
          )}
        </div>
        {detectedItems.length > 0 && (
          <div className="text-xs text-gray-600 px-3">
            Detected: {detectedItems.slice(0, 5).join(', ')}
            {detectedItems.length > 5 && `, +${detectedItems.length - 5} more`}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">AI Warning</p>
            <p className="text-xs mt-1">{reason}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default AIVerificationBadge;


import React from 'react';

const WasteTypeCard = ({ type, icon: Icon, selected, onClick, color }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
        selected 
          ? `border-${color}-500 bg-${color}-50 text-${color}-700` 
          : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
      }`}
    >
      <Icon className={`h-8 w-8 mb-2 ${selected ? '' : 'text-gray-400'}`} />
      <span className="text-sm font-medium">{type}</span>
    </button>
  );
};

export default WasteTypeCard;


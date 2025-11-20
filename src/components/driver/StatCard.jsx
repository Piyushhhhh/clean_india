import React from 'react';

const StatCard = ({ label, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;


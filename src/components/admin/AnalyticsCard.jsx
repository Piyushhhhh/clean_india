import React from 'react';

const AnalyticsCard = ({ title, value, icon: Icon, color, trend, subtitle, urgent }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className={`bg-white p-6 rounded-xl border shadow-sm transition-all ${
      urgent ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      
      {trend && (
        <p className="text-xs text-gray-500">{trend}</p>
      )}
      
      {subtitle && (
        <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
      )}
      
      {urgent && (
        <div className="mt-3 text-xs text-red-600 font-medium flex items-center">
          <span className="animate-pulse mr-1">●</span>
          Requires attention
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;


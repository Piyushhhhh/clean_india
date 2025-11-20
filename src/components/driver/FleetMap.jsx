import React from 'react';
import { Truck } from 'lucide-react';

const FleetMap = ({ pendingCount }) => {
  return (
    <div className="hidden md:block">
      <div className="bg-gray-100 rounded-2xl h-[500px] sticky top-24 border border-gray-200 p-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <Truck className="h-12 w-12 text-green-600 mb-4 animate-pulse" />
          <h4 className="font-bold text-gray-600">Live Fleet Map</h4>
          <p className="text-sm text-gray-500 max-w-xs mb-6">
            Simulating GPS tracking of {pendingCount} pending stops.
          </p>
          
          <div className="grid grid-cols-3 gap-4 w-full max-w-[200px] opacity-50">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`h-2 w-2 rounded-full mx-auto ${i < pendingCount ? 'bg-red-500' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetMap;


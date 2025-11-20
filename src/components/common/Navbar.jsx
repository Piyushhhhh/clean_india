import React from 'react';
import { Recycle, User, Truck, Award, BarChart3 } from 'lucide-react';

const Navbar = ({ role, setRole, userPoints }) => {
  const cycleRole = () => {
    if (role === 'citizen') setRole('driver');
    else if (role === 'driver') setRole('admin');
    else setRole('citizen');
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Recycle className="h-6 w-6" />
          <span className="font-bold text-xl tracking-tight">
            CleanConnect <span className="text-green-200 text-sm font-normal">India</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {role === 'citizen' && (
            <div className="hidden md:flex items-center bg-white/20 px-3 py-1 rounded-full text-sm">
              <Award className="h-4 w-4 mr-1 text-yellow-300" />
              <span className="font-medium">{userPoints} Points</span>
            </div>
          )}
          
          <button 
            onClick={cycleRole}
            className="flex items-center bg-white text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-green-50 transition-colors"
          >
            {role === 'citizen' ? (
              <>
                <User className="h-4 w-4 mr-2" />
                Citizen View
              </>
            ) : role === 'driver' ? (
              <>
                <Truck className="h-4 w-4 mr-2" />
                Driver View
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4 mr-2" />
                Admin View
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


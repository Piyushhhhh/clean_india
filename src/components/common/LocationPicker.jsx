import React, { useState, useEffect, useRef } from 'react';
import { Search, Crosshair, MapPin } from 'lucide-react';
import { SUGGESTED_PLACES } from '../../data/cities';
import { getCurrentLocation } from '../../utils/geolocation';

const LocationPicker = ({ location, setLocation, coords, setCoords }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const suggestionRef = useRef(null);

  const handleLocationInput = (e) => {
    const value = e.target.value;
    setLocation(value);
    
    if (value.length > 1) {
      const filtered = SUGGESTED_PLACES.filter(place => 
        place.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (place) => {
    setLocation(place);
    setShowSuggestions(false);
    setCoords(null);
  };

  const handleGetLocation = async () => {
    setIsLocating(true);
    try {
      const position = await getCurrentLocation();
      setCoords(position);
      // Simulate reverse geocoding delay
      setTimeout(() => {
        setLocation(`${position.lat}, ${position.lng} (GPS Detected)`);
        setIsLocating(false);
      }, 800);
    } catch (error) {
      alert("Could not fetch location. Please enable GPS.");
      setIsLocating(false);
    }
  };

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={suggestionRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">Location Details</label>
      <div className="flex space-x-2 mb-2 relative">
        <div className="relative flex-1">
          <input
            required
            type="text"
            value={location}
            onChange={handleLocationInput}
            onFocus={() => location.length > 1 && setShowSuggestions(true)}
            placeholder="Search city, area or landmark..."
            className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none pl-10"
            autoComplete="off"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
        
        <button 
          type="button"
          onClick={handleGetLocation}
          disabled={isLocating}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap shadow-sm font-medium text-sm"
        >
          {isLocating ? (
            <span className="animate-pulse">Locating...</span>
          ) : (
            <>
              <Crosshair className="h-4 w-4 mr-1.5" />
              GPS
            </>
          )}
        </button>
      </div>
      
      {/* Autocomplete Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 md:right-[100px] bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto mt-1">
          {suggestions.map((place, index) => (
            <li 
              key={index}
              onClick={() => selectSuggestion(place)}
              className="px-4 py-2 hover:bg-green-50 cursor-pointer text-gray-700 text-sm border-b border-gray-50 last:border-0 flex items-center"
            >
              <MapPin className="h-3 w-3 mr-2 text-gray-400" />
              {place}
            </li>
          ))}
        </ul>
      )}
        
      {/* Visual Map Feedback */}
      {coords && (
        <div className="w-full h-32 bg-blue-50 rounded-lg border border-blue-100 relative overflow-hidden mb-2 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#3b82f6_1.5px,transparent_1.5px),linear-gradient(90deg,#3b82f6_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
          <div className="text-center z-10">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-red-500 rounded-full shadow-lg mb-1 animate-bounce">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <p className="text-xs font-bold text-blue-800 bg-white/80 px-2 py-0.5 rounded backdrop-blur-sm">
              {coords.lat}, {coords.lng}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;


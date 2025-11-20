import React, { useState } from 'react';
import { Camera, Recycle, Leaf, AlertTriangle } from 'lucide-react';
import WasteTypeCard from '../common/WasteTypeCard';
import LocationPicker from '../common/LocationPicker';
import ImageUpload from '../common/ImageUpload';
import Spinner from '../common/Spinner';

const ReportForm = ({ onSubmit, isSubmitting }) => {
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState(null);
  const [wasteType, setWasteType] = useState('General');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Normal');
  const [image, setImage] = useState(null);
  const [aiVerification, setAiVerification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Include AI verification data in submission
    const reportData = {
      location,
      coords,
      wasteType,
      description,
      severity,
      image,
      aiVerified: aiVerification?.isValid || false,
      aiConfidence: aiVerification?.confidence || 0,
      aiDetectedItems: aiVerification?.detectedItems || [],
    };
    
    onSubmit(reportData);
    
    // Reset form
    setLocation('');
    setCoords(null);
    setDescription('');
    setWasteType('General');
    setSeverity('Normal');
    setImage(null);
    setAiVerification(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Camera className="h-5 w-5 mr-2 text-green-600" />
        New Report
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Waste Type Selection */}
        <div className="grid grid-cols-3 gap-3">
          <WasteTypeCard 
            type="Dry Waste" 
            icon={Recycle} 
            color="blue" 
            selected={wasteType === 'Dry Waste'} 
            onClick={() => setWasteType('Dry Waste')} 
          />
          <WasteTypeCard 
            type="Wet Waste" 
            icon={Leaf} 
            color="green" 
            selected={wasteType === 'Wet Waste'} 
            onClick={() => setWasteType('Wet Waste')} 
          />
          <WasteTypeCard 
            type="Hazardous" 
            icon={AlertTriangle} 
            color="red" 
            selected={wasteType === 'Hazardous'} 
            onClick={() => setWasteType('Hazardous')} 
          />
        </div>

        {/* Image Attachment */}
        <ImageUpload 
          image={image} 
          setImage={setImage}
          onVerificationChange={setAiVerification}
        />

        {/* Location Picker */}
        <LocationPicker 
          location={location}
          setLocation={setLocation}
          coords={coords}
          setCoords={setCoords}
        />

        {/* Severity and Description */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <select 
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
            >
              <option value="Normal">Normal Collection</option>
              <option value="High">High Priority</option>
              <option value="Emergency">Emergency / Hazard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any extra info..."
              className="w-full rounded-lg border-gray-300 border px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 transition-all active:scale-[0.98] flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? <Spinner size="sm" /> : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;


import React, { useMemo } from 'react';
import { MapPin, AlertCircle, TrendingUp } from 'lucide-react';

const Heatmap = ({ reports, hotspots }) => {
  // Group reports by location and calculate intensity
  const heatmapData = useMemo(() => {
    const locationData = {};
    
    reports.forEach(report => {
      const loc = report.location;
      if (!locationData[loc]) {
        locationData[loc] = {
          location: loc,
          count: 0,
          pending: 0,
          completed: 0,
          coords: report.coords,
          wasteTypes: {},
          recentReports: []
        };
      }
      
      locationData[loc].count++;
      locationData[loc][report.status]++;
      locationData[loc].wasteTypes[report.wasteType] = 
        (locationData[loc].wasteTypes[report.wasteType] || 0) + 1;
      
      // Keep last 5 reports
      if (locationData[loc].recentReports.length < 5) {
        locationData[loc].recentReports.push(report);
      }
    });
    
    // Convert to array and sort by count
    return Object.values(locationData)
      .sort((a, b) => b.count - a.count);
  }, [reports]);

  // Categorize intensity
  const getIntensityLevel = (count) => {
    if (count >= 10) return { level: 'critical', color: 'red', label: 'Critical Hotspot' };
    if (count >= 5) return { level: 'high', color: 'orange', label: 'High Activity' };
    if (count >= 3) return { level: 'medium', color: 'yellow', label: 'Moderate Activity' };
    return { level: 'low', color: 'green', label: 'Low Activity' };
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
          Heatmap Legend
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Critical (10+ reports)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-700">High (5-9 reports)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Moderate (3-4 reports)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Low (1-2 reports)</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Key Insights
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Critical Hotspots</p>
            <p className="text-2xl font-bold text-red-600">
              {heatmapData.filter(d => d.count >= 10).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Require permanent bins</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">High Activity Areas</p>
            <p className="text-2xl font-bold text-orange-600">
              {heatmapData.filter(d => d.count >= 5 && d.count < 10).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Monitor closely</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Locations</p>
            <p className="text-2xl font-bold text-blue-600">{heatmapData.length}</p>
            <p className="text-xs text-gray-500 mt-1">Reporting garbage</p>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-red-600" />
          Location Heatmap
        </h3>
        
        <div className="space-y-3">
          {heatmapData.map((location, index) => {
            const intensity = getIntensityLevel(location.count);
            const pendingPercent = (location.pending / location.count * 100).toFixed(0);
            
            return (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  intensity.level === 'critical' ? 'border-red-300 bg-red-50' :
                  intensity.level === 'high' ? 'border-orange-300 bg-orange-50' :
                  intensity.level === 'medium' ? 'border-yellow-300 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{location.location}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        intensity.level === 'critical' ? 'bg-red-200 text-red-800' :
                        intensity.level === 'high' ? 'bg-orange-200 text-orange-800' :
                        intensity.level === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {intensity.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {location.count} reports • {location.pending} pending • {location.completed} completed
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${
                      intensity.level === 'critical' ? 'text-red-600' :
                      intensity.level === 'high' ? 'text-orange-600' :
                      intensity.level === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {location.count}
                    </div>
                    <div className="text-xs text-gray-500">reports</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Completion Status</span>
                    <span>{pendingPercent}% pending</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${100 - pendingPercent}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Waste Types */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {Object.entries(location.wasteTypes).map(([type, count]) => (
                    <span 
                      key={type}
                      className="text-xs px-2 py-1 bg-white rounded-full border border-gray-200"
                    >
                      {type}: {count}
                    </span>
                  ))}
                </div>
                
                {/* Action for critical hotspots */}
                {intensity.level === 'critical' && (
                  <div className="mt-3 p-2 bg-white rounded border border-red-200">
                    <p className="text-xs text-red-800 font-medium flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Recommendation: Install permanent waste bin at this location
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Heatmap;


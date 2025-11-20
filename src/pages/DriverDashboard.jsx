import React from 'react';
import { MapPin, CheckCircle, BarChart3, Clock, Navigation } from 'lucide-react';
import StatCard from '../components/driver/StatCard';
import TaskCard from '../components/driver/TaskCard';
import FleetMap from '../components/driver/FleetMap';

const DriverDashboard = ({ reports, onStatusUpdate }) => {
  const pendingReports = reports.filter(r => r.status === 'pending');
  const completedReports = reports.filter(r => r.status === 'completed');
  
  const sortedPending = [...pendingReports].sort((a, b) => {
    const severityScore = { 'Hazardous': 3, 'Emergency': 3, 'High': 2, 'Normal': 1 };
    const scoreA = severityScore[a.severity] || severityScore[a.wasteType] || 1;
    const scoreB = severityScore[b.severity] || severityScore[b.wasteType] || 1;
    return scoreB - scoreA;
  });

  const handleComplete = (reportId, afterPhoto, notes) => {
    onStatusUpdate(reportId, 'completed', afterPhoto, notes);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Pending Stops" value={pendingReports.length} icon={MapPin} color="orange" />
        <StatCard label="Collected Today" value={completedReports.length} icon={CheckCircle} color="green" />
        <StatCard label="Efficiency" value="94%" icon={BarChart3} color="blue" />
        <StatCard label="Route Time" value="4h 20m" icon={Clock} color="purple" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Task List */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <Navigation className="h-5 w-5 mr-2 text-green-600" />
            Optimized Route (Priority List)
          </h3>
          
          {sortedPending.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
              <p className="text-gray-500">No pending garbage collections in your zone.</p>
            </div>
          ) : (
            sortedPending.map((report) => (
              <TaskCard 
                key={report.id} 
                report={report} 
                onComplete={handleComplete}
              />
            ))
          )}
        </div>

        {/* Right: Map Visualization */}
        <FleetMap pendingCount={pendingReports.length} />
      </div>
    </div>
  );
};

export default DriverDashboard;


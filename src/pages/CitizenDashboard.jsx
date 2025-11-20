import React from 'react';
import ReportForm from '../components/citizen/ReportForm';
import ReportCard from '../components/citizen/ReportCard';

const CitizenDashboard = ({ reports, onSubmitReport, userId }) => {
  const myReports = reports.filter(r => r.userId === userId);
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <ReportForm onSubmit={onSubmitReport} />
      
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Your Recent Reports</h3>
        {myReports.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">You haven't reported any issues yet.</p>
          </div>
        ) : (
          myReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;


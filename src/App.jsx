import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import CitizenDashboard from './pages/CitizenDashboard';
import DriverDashboard from './pages/DriverDashboard';
import Spinner from './components/common/Spinner';
import { useAuth } from './hooks/useAuth';
import { useReports } from './hooks/useReports';
import { submitReport, updateReportStatus } from './services/reportService';

function App() {
  const { user, loading: authLoading } = useAuth();
  const { reports, loading: reportsLoading } = useReports(user);
  const [role, setRole] = useState('citizen'); // 'citizen' or 'driver'
  const [userPoints, setUserPoints] = useState(120);

  const handleSubmitReport = async (formData) => {
    if (!user) return;
    
    const result = await submitReport(formData, user.uid);
    
    if (result.success) {
      setUserPoints(prev => prev + 10);
    } else {
      alert("Failed to submit report. Please try again.");
    }
  };

  const handleStatusUpdate = async (reportId, newStatus, afterPhoto = null, notes = '') => {
    const result = await updateReportStatus(reportId, newStatus, afterPhoto, notes);
    
    if (!result.success) {
      alert("Failed to update report status. Please try again.");
    }
  };

  if (authLoading || reportsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar role={role} setRole={setRole} userPoints={userPoints} />
      
      <main>
        {role === 'citizen' ? (
          <>
            <div className="bg-green-600 text-white py-8 px-4 text-center mb-6">
              <h1 className="text-3xl font-bold mb-2">Keep India Clean</h1>
              <p className="text-green-100 max-w-xl mx-auto">
                Spot garbage? Report it in seconds with a photo and location. 
                Earn points for every verified report.
              </p>
            </div>
            
            <CitizenDashboard 
              reports={reports} 
              onSubmitReport={handleSubmitReport} 
              userId={user?.uid}
            />
          </>
        ) : (
          <DriverDashboard 
            reports={reports} 
            onStatusUpdate={handleStatusUpdate} 
          />
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12 py-6 text-center text-gray-500 text-sm">
        <p>© 2024 CleanConnect India Municipality Initiative.</p>
        <p className="mt-1 text-xs">Powered by Community • Swachh Bharat Abhiyan</p>
      </footer>
    </div>
  );
}

export default App;


import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  TrendingDown,
  ArrowUp,
  X
} from 'lucide-react';

const SLATracker = ({ reports, overdue, critical, avgResponseTime }) => {
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Calculate time since report
  const getTimeSinceReport = (report) => {
    const now = new Date();
    const reportTime = report.createdAt?.toDate();
    if (!reportTime) return { hours: 0, status: 'unknown' };
    
    const hoursSince = (now - reportTime) / (1000 * 60 * 60);
    
    let status = 'good';
    if (hoursSince > 48) status = 'overdue';
    else if (hoursSince > 24) status = 'critical';
    else if (hoursSince > 12) status = 'warning';
    
    return {
      hours: hoursSince.toFixed(1),
      status,
      timeString: hoursSince < 24 
        ? `${hoursSince.toFixed(1)}h`
        : `${(hoursSince / 24).toFixed(1)}d`
    };
  };

  // All pending reports with SLA status
  const pendingWithSLA = useMemo(() => {
    return reports
      .filter(r => r.status === 'pending')
      .map(r => ({
        ...r,
        sla: getTimeSinceReport(r)
      }))
      .sort((a, b) => b.sla.hours - a.sla.hours);
  }, [reports]);

  // SLA statistics
  const slaStats = useMemo(() => {
    const within12h = pendingWithSLA.filter(r => r.sla.hours <= 12).length;
    const within24h = pendingWithSLA.filter(r => r.sla.hours > 12 && r.sla.hours <= 24).length;
    const within48h = pendingWithSLA.filter(r => r.sla.hours > 24 && r.sla.hours <= 48).length;
    const beyond48h = pendingWithSLA.filter(r => r.sla.hours > 48).length;
    
    return { within12h, within24h, within48h, beyond48h };
  }, [pendingWithSLA]);

  const handleEscalate = (report) => {
    setSelectedReport(report);
    setShowEscalationModal(true);
  };

  const confirmEscalation = () => {
    // In a real app, this would send to supervisor
    alert(`Report ${selectedReport.id.slice(0, 6)} escalated to supervisor!`);
    setShowEscalationModal(false);
    setSelectedReport(null);
  };

  return (
    <div className="space-y-6">
      {/* SLA Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Within 12h</h3>
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600">{slaStats.within12h}</p>
          <p className="text-xs text-gray-500 mt-1">On track</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">12-24h</h3>
            <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{slaStats.within24h}</p>
          <p className="text-xs text-gray-500 mt-1">Watch closely</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">24-48h</h3>
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-orange-600">{slaStats.within48h}</p>
          <p className="text-xs text-gray-500 mt-1">Critical</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-red-300 shadow-sm ring-2 ring-red-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Over 48h</h3>
            <div className="p-2 rounded-lg bg-red-100 text-red-600">
              <Bell className="h-4 w-4 animate-pulse" />
            </div>
          </div>
          <p className="text-3xl font-bold text-red-600">{slaStats.beyond48h}</p>
          <p className="text-xs text-red-600 font-medium mt-1">SLA breach!</p>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Average Response Time</h3>
            <p className="text-sm text-gray-600">Target: &lt;24 hours</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-gray-900">{avgResponseTime}h</p>
            <div className={`text-sm font-medium flex items-center justify-end mt-1 ${
              avgResponseTime <= 24 ? 'text-green-600' : 'text-orange-600'
            }`}>
              {avgResponseTime <= 24 ? (
                <>
                  <TrendingDown className="h-4 w-4 mr-1" />
                  Meeting SLA
                </>
              ) : (
                <>
                  <ArrowUp className="h-4 w-4 mr-1" />
                  Above target
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all ${
              avgResponseTime <= 24 ? 'bg-green-600' : 'bg-orange-600'
            }`}
            style={{ width: `${Math.min((24 / Math.max(avgResponseTime, 24)) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-600" />
          Pending Reports (SLA Tracking)
        </h3>
        
        {pendingWithSLA.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
            <p>No pending reports! All caught up.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingWithSLA.map((report) => (
              <div 
                key={report.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  report.sla.status === 'overdue' 
                    ? 'border-red-300 bg-red-50' 
                    : report.sla.status === 'critical'
                    ? 'border-orange-300 bg-orange-50'
                    : report.sla.status === 'warning'
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-mono text-gray-500">
                        #{report.id.slice(0, 6)}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        report.sla.status === 'overdue' 
                          ? 'bg-red-200 text-red-800' 
                          : report.sla.status === 'critical'
                          ? 'bg-orange-200 text-orange-800'
                          : report.sla.status === 'warning'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}>
                        {report.sla.status === 'overdue' ? '🚨 SLA Breach' :
                         report.sla.status === 'critical' ? '⚠️ Critical' :
                         report.sla.status === 'warning' ? '⏱️ Warning' :
                         '✓ On Track'}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        report.wasteType === 'Hazardous' ? 'bg-red-100 text-red-800' :
                        report.wasteType === 'Wet Waste' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {report.wasteType}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-1">{report.location}</h4>
                    <p className="text-sm text-gray-600 mb-2">{report.description || 'No description'}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Reported: {report.createdAt?.toDate().toLocaleString()}</span>
                      <span className="font-medium">
                        Pending for: {report.sla.timeString}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <div className={`text-2xl font-bold ${
                      report.sla.status === 'overdue' ? 'text-red-600' :
                      report.sla.status === 'critical' ? 'text-orange-600' :
                      report.sla.status === 'warning' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {report.sla.timeString}
                    </div>
                    
                    {(report.sla.status === 'overdue' || report.sla.status === 'critical') && (
                      <button
                        onClick={() => handleEscalate(report)}
                        className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700 transition-colors flex items-center"
                      >
                        <ArrowUp className="h-3 w-3 mr-1" />
                        Escalate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Escalation Modal */}
      {showEscalationModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
                Escalate Report
              </h2>
              <button
                onClick={() => setShowEscalationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800 mb-2">
                <strong>Report ID:</strong> {selectedReport.id.slice(0, 8)}
              </p>
              <p className="text-sm text-red-800 mb-2">
                <strong>Location:</strong> {selectedReport.location}
              </p>
              <p className="text-sm text-red-800 mb-2">
                <strong>Pending for:</strong> {selectedReport.sla?.timeString}
              </p>
              <p className="text-sm text-red-800">
                <strong>SLA Status:</strong> {selectedReport.sla?.status === 'overdue' ? 'BREACHED' : 'CRITICAL'}
              </p>
            </div>
            
            <p className="text-gray-700 mb-6">
              This report has {selectedReport.sla?.status === 'overdue' ? 'exceeded' : 'nearly exceeded'} the 48-hour SLA. 
              Escalating will notify the supervisor immediately.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEscalationModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmEscalation}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Bell className="h-5 w-5 mr-2" />
                Escalate Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SLATracker;


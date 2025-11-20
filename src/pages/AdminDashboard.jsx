import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle,
  XCircle,
  BarChart3,
  Map as MapIcon,
  Calendar,
  Users,
  Truck
} from 'lucide-react';
import Heatmap from '../components/admin/Heatmap';
import SLATracker from '../components/admin/SLATracker';
import AnalyticsCard from '../components/admin/AnalyticsCard';

const AdminDashboard = ({ reports }) => {
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d
  const [selectedView, setSelectedView] = useState('overview'); // overview, heatmap, sla

  // Calculate analytics
  const analytics = useMemo(() => {
    const now = new Date();
    const pending = reports.filter(r => r.status === 'pending');
    const completed = reports.filter(r => r.status === 'completed');
    
    // SLA calculations
    const overdue = pending.filter(r => {
      const reportTime = r.createdAt?.toDate();
      if (!reportTime) return false;
      const hoursSinceReport = (now - reportTime) / (1000 * 60 * 60);
      return hoursSinceReport > 48;
    });

    const critical = pending.filter(r => {
      const reportTime = r.createdAt?.toDate();
      if (!reportTime) return false;
      const hoursSinceReport = (now - reportTime) / (1000 * 60 * 60);
      return hoursSinceReport > 24 && hoursSinceReport <= 48;
    });

    // Average response time
    const completedWithTimes = completed.filter(r => r.resolvedAt && r.createdAt);
    const avgResponseTime = completedWithTimes.length > 0
      ? completedWithTimes.reduce((sum, r) => {
          const responseTime = (r.resolvedAt.toDate() - r.createdAt.toDate()) / (1000 * 60 * 60);
          return sum + responseTime;
        }, 0) / completedWithTimes.length
      : 0;

    // Hotspot analysis
    const locationCounts = {};
    reports.forEach(r => {
      const loc = r.location;
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });
    
    const hotspots = Object.entries(locationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([location, count]) => ({ location, count }));

    // Completion rate
    const totalReports = reports.length;
    const completionRate = totalReports > 0 
      ? ((completed.length / totalReports) * 100).toFixed(1)
      : 0;

    // Waste type distribution
    const wasteTypes = {};
    reports.forEach(r => {
      wasteTypes[r.wasteType] = (wasteTypes[r.wasteType] || 0) + 1;
    });

    return {
      total: totalReports,
      pending: pending.length,
      completed: completed.length,
      overdue: overdue.length,
      critical: critical.length,
      avgResponseTime: avgResponseTime.toFixed(1),
      completionRate,
      hotspots,
      wasteTypes,
      overdueReports: overdue,
      criticalReports: critical
    };
  }, [reports]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin & Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor performance, track SLAs, and identify waste management hotspots
        </p>
      </div>

      {/* View Selector */}
      <div className="mb-6 flex space-x-2 overflow-x-auto">
        <button
          onClick={() => setSelectedView('overview')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            selectedView === 'overview'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Overview</span>
        </button>
        <button
          onClick={() => setSelectedView('heatmap')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            selectedView === 'heatmap'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <MapIcon className="h-4 w-4" />
          <span>Heatmap</span>
        </button>
        <button
          onClick={() => setSelectedView('sla')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            selectedView === 'sla'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>SLA Tracking</span>
        </button>
      </div>

      {/* Overview View */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnalyticsCard
              title="Total Reports"
              value={analytics.total}
              icon={MapPin}
              color="blue"
              trend="+12% vs last week"
            />
            <AnalyticsCard
              title="Pending"
              value={analytics.pending}
              icon={Clock}
              color="orange"
              subtitle={`${analytics.critical} critical`}
            />
            <AnalyticsCard
              title="Completed"
              value={analytics.completed}
              icon={CheckCircle}
              color="green"
              subtitle={`${analytics.completionRate}% rate`}
            />
            <AnalyticsCard
              title="Overdue (>48h)"
              value={analytics.overdue}
              icon={AlertTriangle}
              color="red"
              urgent={analytics.overdue > 0}
            />
          </div>

          {/* Performance Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Avg Response Time</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{analytics.avgResponseTime}h</p>
              <p className="text-sm text-gray-500 mt-1">Target: &lt;24h</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${analytics.avgResponseTime <= 24 ? 'bg-green-600' : 'bg-orange-600'}`}
                  style={{ width: `${Math.min((24 / Math.max(analytics.avgResponseTime, 24)) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Completion Rate</h3>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{analytics.completionRate}%</p>
              <p className="text-sm text-gray-500 mt-1">Target: &gt;90%</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${analytics.completionRate}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">SLA Compliance</h3>
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.total > 0 
                  ? ((analytics.total - analytics.overdue) / analytics.total * 100).toFixed(0)
                  : 100}%
              </p>
              <p className="text-sm text-gray-500 mt-1">Within 48h</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ 
                    width: `${analytics.total > 0 
                      ? ((analytics.total - analytics.overdue) / analytics.total * 100)
                      : 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Waste Type Distribution */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">Waste Type Distribution</h3>
            <div className="space-y-3">
              {Object.entries(analytics.wasteTypes).map(([type, count]) => (
                <div key={type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{type}</span>
                    <span className="font-medium text-gray-900">
                      {count} ({((count / analytics.total) * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        type === 'Hazardous' ? 'bg-red-600' :
                        type === 'Wet Waste' ? 'bg-green-600' :
                        'bg-blue-600'
                      }`}
                      style={{ width: `${(count / analytics.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Hotspots */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-600" />
              Top 10 Garbage Hotspots
            </h3>
            <div className="space-y-2">
              {analytics.hotspots.map((hotspot, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <span className="text-gray-700">{hotspot.location}</span>
                  </div>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {hotspot.count} reports
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Heatmap View */}
      {selectedView === 'heatmap' && (
        <Heatmap reports={reports} hotspots={analytics.hotspots} />
      )}

      {/* SLA Tracking View */}
      {selectedView === 'sla' && (
        <SLATracker 
          reports={reports}
          overdue={analytics.overdueReports}
          critical={analytics.criticalReports}
          avgResponseTime={analytics.avgResponseTime}
        />
      )}
    </div>
  );
};

export default AdminDashboard;


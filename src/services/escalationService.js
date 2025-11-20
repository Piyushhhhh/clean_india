import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, appId } from '../config/firebase';

/**
 * Check all reports and auto-escalate those overdue
 * This should be run periodically (e.g., every hour)
 */
export const checkAndEscalateOverdue = async (reports) => {
  const now = new Date();
  const escalatedReports = [];
  
  for (const report of reports) {
    // Only check pending reports
    if (report.status !== 'pending') continue;
    
    // Skip if already escalated
    if (report.escalated) continue;
    
    // Check if overdue (>48 hours)
    const reportTime = report.createdAt?.toDate();
    if (!reportTime) continue;
    
    const hoursSinceReport = (now - reportTime) / (1000 * 60 * 60);
    
    if (hoursSinceReport > 48) {
      try {
        await escalateReport(report.id, 'Automatic escalation: SLA breach (>48h)');
        escalatedReports.push(report);
      } catch (error) {
        console.error(`Failed to escalate report ${report.id}:`, error);
      }
    }
  }
  
  return escalatedReports;
};

/**
 * Escalate a specific report
 * @param {string} reportId - Report ID to escalate
 * @param {string} reason - Reason for escalation
 */
export const escalateReport = async (reportId, reason = 'Manual escalation') => {
  try {
    const reportRef = doc(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'garbage_reports',
      reportId
    );
    
    await updateDoc(reportRef, {
      escalated: true,
      escalatedAt: serverTimestamp(),
      escalationReason: reason,
      priority: 'high' // Boost priority
    });
    
    // In a real app, send notification to supervisor here
    // await sendSupervisorNotification(reportId, reason);
    
    console.log(`Report ${reportId} escalated: ${reason}`);
    return { success: true };
  } catch (error) {
    console.error('Error escalating report:', error);
    return { success: false, error };
  }
};

/**
 * Get escalation statistics
 */
export const getEscalationStats = (reports) => {
  const escalated = reports.filter(r => r.escalated);
  const now = new Date();
  
  // Count reports needing escalation
  const needsEscalation = reports.filter(r => {
    if (r.status !== 'pending' || r.escalated) return false;
    const reportTime = r.createdAt?.toDate();
    if (!reportTime) return false;
    const hoursSince = (now - reportTime) / (1000 * 60 * 60);
    return hoursSince > 48;
  });
  
  return {
    totalEscalated: escalated.length,
    needsEscalation: needsEscalation.length,
    escalatedReports: escalated,
    reportsToEscalate: needsEscalation
  };
};

/**
 * Simulate supervisor notification
 * In a real app, this would send email/SMS/push notification
 */
const sendSupervisorNotification = async (reportId, reason) => {
  // Mock implementation
  console.log(`🔔 SUPERVISOR NOTIFICATION`);
  console.log(`Report ID: ${reportId}`);
  console.log(`Reason: ${reason}`);
  console.log(`Action Required: Review and assign immediately`);
  
  // In production, use:
  // - Email service (SendGrid, AWS SES)
  // - SMS service (Twilio)
  // - Push notifications (Firebase Cloud Messaging)
  // - Webhook to supervisor dashboard
  
  return { sent: true };
};


import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, appId } from '../config/firebase';

/**
 * Submit a new garbage report
 */
export const submitReport = async (formData, userId) => {
  try {
    await addDoc(
      collection(db, 'artifacts', appId, 'public', 'data', 'garbage_reports'), 
      {
        ...formData,
        userId,
        status: 'pending',
        createdAt: serverTimestamp(),
        votes: 0
      }
    );
    return { success: true };
  } catch (error) {
    console.error("Error adding report:", error);
    return { success: false, error };
  }
};

/**
 * Update report status (for drivers)
 */
export const updateReportStatus = async (reportId, newStatus) => {
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
      status: newStatus,
      resolvedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, error };
  }
};


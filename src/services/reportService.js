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
 * @param {string} reportId - Report ID
 * @param {string} newStatus - New status
 * @param {string} afterPhoto - Base64 image data URL
 * @param {string} notes - Optional completion notes
 */
export const updateReportStatus = async (reportId, newStatus, afterPhoto = null, notes = '') => {
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
    
    const updateData = {
      status: newStatus,
      resolvedAt: serverTimestamp()
    };

    // Add after photo and notes if provided
    if (afterPhoto) {
      updateData.afterPhoto = afterPhoto;
    }
    if (notes) {
      updateData.completionNotes = notes;
    }
    
    await updateDoc(reportRef, updateData);
    
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, error };
  }
};


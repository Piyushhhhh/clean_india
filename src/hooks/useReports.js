import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  orderBy 
} from 'firebase/firestore';
import { db, appId } from '../config/firebase';

export const useReports = (user) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    const q = query(
      collection(db, 'artifacts', appId, 'public', 'data', 'garbage_reports'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReports(data);
        setLoading(false);
      }, 
      (error) => {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { reports, loading };
};


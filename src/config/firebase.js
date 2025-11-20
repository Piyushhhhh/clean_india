import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = JSON.parse(__firebase_config);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// App ID for Firestore collections
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'clean-connect-india';


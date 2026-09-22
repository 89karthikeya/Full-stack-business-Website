import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
export const firebaseConfig = {
  apiKey: "AIzaSyBVrbgLYB5c-UqTPqV5OTHgQJ0BNcKNGWY",
  authDomain: "ai-business-360e4.firebaseapp.com",
  projectId: "ai-business-360e4",
  storageBucket: "ai-business-360e4.firebasestorage.app",
  messagingSenderId: "514651065845",
  appId: "1:514651065845:web:04169a7d8e14579753a4bc",
  firestoreDatabaseId: "(default)"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

export interface ConsultationData {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  automationGoal: string;
  currentProcess?: string;
}

export async function submitConsultation(data: ConsultationData) {
  const collectionRef = collection(db, 'consultations');
  const docRef = await addDoc(collectionRef, {
    name: data.name,
    businessName: data.businessName,
    email: data.email,
    phone: data.phone || '',
    automationGoal: data.automationGoal,
    currentProcess: data.currentProcess || '',
    createdAt: serverTimestamp(),
    status: 'pending'
  });

  // After the Firestore save succeeds, trigger secure server-side email notification
  try {
    const endpoint = typeof window !== 'undefined'
      ? '/api/send-consultation-notification'
      : 'http://localhost:3000/api/send-consultation-notification';

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        consultationId: docRef.id,
        name: data.name,
        businessName: data.businessName,
        email: data.email,
        phone: data.phone || '',
        automationGoal: data.automationGoal,
        currentProcess: data.currentProcess || ''
      })
    });
  } catch (notifyError) {
    console.warn('Server notification dispatch error:', notifyError);
  }

  return docRef;
}

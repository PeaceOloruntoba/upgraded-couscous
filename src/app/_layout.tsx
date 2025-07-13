import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { useStore } from '../store';
import "../global.css"

export default function Layout() {
  const { setUser, fetchPaymentStatus } = useStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? { uid: user.uid, email: user.email } : null);
      if (user) fetchPaymentStatus();
    });
    return unsubscribe;
  }, []);

  return <Slot />;
}

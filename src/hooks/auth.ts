import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import { useStore } from '../store';

export const useAuth = () => {
  const { setUser, fetchPaymentStatus } = useStore();

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      firstName,
      lastName,
      paymentStatus: 'inactive',
    });
    setUser({ uid: userCredential.user.uid, email: userCredential.user.email, firstName, lastName });
    await fetchPaymentStatus();
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await doc(db, 'users', userCredential.user.uid).get();
    const data = userDoc.data();
    setUser({ uid: userCredential.user.uid, email: userCredential.user.email, firstName: data?.firstName, lastName: data?.lastName });
    await fetchPaymentStatus();
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      firstName: userCredential.user.displayName?.split(' ')[0] || '',
      lastName: userCredential.user.displayName?.split(' ')[1] || '',
      paymentStatus: 'inactive',
    }, { merge: true });
    setUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      firstName: userCredential.user.displayName?.split(' ')[0] || '',
      lastName: userCredential.user.displayName?.split(' ')[1] || '',
    });
    await fetchPaymentStatus();
  };

  const tikTokSignIn = async () => {
    const provider = new OAuthProvider('oidc.tiktok');
    const userCredential = await signInWithPopup(auth, provider);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      firstName: '',
      lastName: '',
      paymentStatus: 'inactive',
    }, { merge: true });
    setUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      firstName: '',
      lastName: '',
    });
    await fetchPaymentStatus();
  };

  const logoff = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { signup, login, googleSignIn, tikTokSignIn, logoff };
};
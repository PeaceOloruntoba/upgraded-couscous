import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import { useStore } from '../store';

export const useAuth = () => {
  const { setUser, fetchPaymentStatus } = useStore();

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      paymentStatus: 'inactive',
    });
    setUser({ uid: userCredential.user.uid, email: userCredential.user.email });
    await fetchPaymentStatus();
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser({ uid: userCredential.user.uid, email: userCredential.user.email });
    await fetchPaymentStatus();
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      paymentStatus: 'inactive',
    });
    setUser({ uid: userCredential.user.uid, email: userCredential.user.email });
    await fetchPaymentStatus();
  };

  const tikTokSignIn = async () => {
    const provider = new OAuthProvider('oidc.tiktok');
    const userCredential = await signInWithPopup(auth, provider);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      paymentStatus: 'inactive',
    });
    setUser({ uid: userCredential.user.uid, email: userCredential.user.email });
    await fetchPaymentStatus();
  };

  const logoff = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { signup, login, googleSignIn, tikTokSignIn, logoff };
};

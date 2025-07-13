import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import * as GoogleSignIn from "expo-google-sign-in";
import { auth, db } from "../utils/firebaseConfig";
import { useStore } from "../store";

export const useAuth = () => {
  const { setUser, fetchPaymentStatus } = useStore();

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email,
      firstName,
      lastName,
      paymentStatus: "inactive",
    });
    setUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      firstName,
      lastName,
    });
    await fetchPaymentStatus();
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    const data = userDoc.data();
    setUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
    });
    await fetchPaymentStatus();
  };

  const googleSignIn = async () => {
    await GoogleSignIn.initAsync();
    const { type, user } = await GoogleSignIn.signInAsync();

    if (type === "success" && user?.auth) {
      const credential = GoogleAuthProvider.credential(user.auth.idToken, user.auth.accessToken);
      const userCredential = await signInWithCredential(auth, credential);

      const displayName = userCredential.user.displayName || "";
      const [firstName, lastName] = displayName.split(" ");

      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          email: userCredential.user.email,
          firstName: firstName || "",
          lastName: lastName || "",
          paymentStatus: "inactive",
        },
        { merge: true }
      );

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        firstName: firstName || "",
        lastName: lastName || "",
      });
      await fetchPaymentStatus();
    }
  };

  const logoff = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { signup, login, googleSignIn, logoff };
};

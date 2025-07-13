import { Slot } from "expo-router";
import { useEffect } from "react";
import { auth, db } from "../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useStore } from "../store";
import "../global.css";

export default function Layout() {
  const { setUser, fetchPaymentStatus } = useStore();

useEffect(() => {
  let isMounted = true;
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user && isMounted) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.data();

      setUser({
        uid: user.uid,
        email: user.email,
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
      });

      await fetchPaymentStatus();
    } else {
      setUser(null);
    }
  });

  return () => {
    isMounted = false;
    unsubscribe();
  };
}, []);


  return <Slot />;
}

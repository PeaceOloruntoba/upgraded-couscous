import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { auth, db } from "../utils/firebaseConfig";
import { useStore } from "../store";

WebBrowser.maybeCompleteAuthSession();

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
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: "<YOUR_EXPO_CLIENT_ID>",
      iosClientId: "<YOUR_IOS_CLIENT_ID>",
      androidClientId: "<YOUR_ANDROID_CLIENT_ID>",
      webClientId: "<YOUR_WEB_CLIENT_ID>",
    });

    const result = await promptAsync();
    if (result?.type === "success") {
      const { id_token, access_token } = result.authentication!;
      const credential = GoogleAuthProvider.credential(id_token, access_token);
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

  const tikTokSignIn = async () => {
    const provider = new OAuthProvider("oidc.tiktok");
    const result = await AuthSession.startAsync({
      authUrl: provider.providerId,
    });
    if (result?.type === "success") {
      const credential = OAuthProvider.credential(result.params.id_token);
      const userCredential = await signInWithCredential(auth, credential);

      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          email: userCredential.user.email,
          firstName: "",
          lastName: "",
          paymentStatus: "inactive",
        },
        { merge: true }
      );

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        firstName: "",
        lastName: "",
      });
      await fetchPaymentStatus();
    }
  };

  const logoff = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { signup, login, googleSignIn, tikTokSignIn, logoff };
};

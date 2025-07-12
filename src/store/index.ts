import { create } from 'zustand';
import { auth } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

interface UserState {
  user: { uid: string; email: string | null } | null;
  paymentStatus: 'active' | 'inactive';
  stripePaymentMethodId: string | null;
  setUser: (user: { uid: string; email: string | null } | null) => void;
  fetchPaymentStatus: () => Promise<void>;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  paymentStatus: 'inactive',
  stripePaymentMethodId: null,
  setUser: (user) => set({ user }),
  fetchPaymentStatus: async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const data = userDoc.data();
      set({
        paymentStatus: data?.paymentStatus || 'inactive',
        stripePaymentMethodId: data?.stripePaymentMethodId || null,
      });
    }
  },
}));

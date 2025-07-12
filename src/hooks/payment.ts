import { useStripe } from '@stripe/stripe-react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { useStore } from '../store';

export const usePayment = () => {
  const { createPaymentMethod, confirmPayment } = useStripe();
  const { fetchPaymentStatus, user } = useStore();

  const addPaymentMethod = async () => {
    try {
      const { paymentMethod, error } = await createPaymentMethod({
        paymentMethodType: 'Card',
      });
      if (error) throw new Error(error.message);
      await updateDoc(doc(db, 'users', user!.uid), {
        paymentStatus: 'active',
        stripePaymentMethodId: paymentMethod!.id,
      });
      await fetchPaymentStatus();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removePaymentMethod = async (paymentMethodId: string) => {
    try {
      await updateDoc(doc(db, 'users', user!.uid), {
        paymentStatus: 'inactive',
        stripePaymentMethodId: null,
      });
      await fetchPaymentStatus();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const chargeForSession = async (amount: number) => {
    try {
      const { paymentIntent, error } = await confirmPayment(
        // Assume clientSecret is fetched from a secure endpoint or pre-generated
        'client-secret-from-stripe',
        {
          paymentMethodType: 'Card',
        }
      );
      if (error) throw new Error(error.message);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { addPaymentMethod, removePaymentMethod, chargeForSession };
};

import { View, Text } from 'react-native';
import { Button } from '../components/Button';
import { useStore } from '../store';
import { useAuth } from '../hooks/auth';
import { Link } from 'expo-router';

export default function Dashboard() {
  const { user, paymentStatus, stripePaymentMethodId } = useStore();
  const { logoff } = useAuth();

  return (
    <View className={`flex-1 justify-center p-4 bg-gray-100`}>
      <Text className={`text-2xl font-bold mb-4`}>Dashboard</Text>
      <Text className={`text-lg mb-4`}>Welcome, {user?.email}</Text>
      <Text className={`text-lg mb-4`}>
        Payment Status: {paymentStatus === 'active' ? `Active (${stripePaymentMethodId})` : 'Inactive'}
      </Text>
      <Link href="/payment" asChild>
        <Button title="Add Payment Method" />
      </Link>
      {paymentStatus === 'active' && (
        <Link href="/remove-card" asChild>
          <Button title="Remove Payment Method" />
        </Link>
      )}
      <Link href="/sign-language" asChild>
        <Button title="Sign Language Feature" />
      </Link>
      <Button title="Log Off" onPress={logoff} />
    </View>
  );
}

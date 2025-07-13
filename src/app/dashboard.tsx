import { View, Text } from 'react-native';
import { useStore } from '../store';
import { useAuth } from '../hooks/auth';
import { Link } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Button } from '@/components/Button';

export default function DashboardScreen() {
  const { user, paymentStatus, stripePaymentMethodId } = useStore();
  const { logoff } = useAuth();

  return (
    <View className="flex-1 justify-center p-6 bg-gradient-to-b from-blue-100 to-white">
      <Animatable.Text
        animation="fadeInDown"
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
        accessibilityLabel="Dashboard"
      >
        Dashboard
      </Animatable.Text>
      <View className="space-y-4">
        <Text className="text-xl text-gray-600 mb-4">Welcome, {user?.firstName || user?.email}</Text>
        <Text className="text-lg text-gray-600 mb-4">
          Payment Status: {paymentStatus === 'active' ? `Active (Card ending ${stripePaymentMethodId?.slice(-4)})` : 'Inactive'}
        </Text>
        <Link href="/payment" asChild>
          <Button title="Add Payment Method" className="w-full" />
        </Link>
        {paymentStatus === 'active' && (
          <Link href="/remove-card" asChild>
            <Button title="Remove Payment Method" className="w-full bg-red-500" />
          </Link>
        )}
        <Link href="/sign-language" asChild>
          <Button title="Sign Language Feature" className="w-full bg-green-500" />
        </Link>
        <Button title="Log Off" onPress={logoff} className="w-full bg-gray-500" />
      </View>
    </View>
  );
};
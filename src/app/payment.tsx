import { View, Text } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';
import { usePayment } from '../hooks/payment';
import * as Animatable from 'react-native-animatable';
import { Button } from '@/components/Button';

export default function Payment() {
  const { addPaymentMethod } = usePayment();

  const handleAdd = async () => {
    const result = await addPaymentMethod();
    if (!result.success) alert(`Error: ${result.error}`);
  };

  return (
    <View className="flex-1 justify-center p-6 bg-gradient-to-b from-blue-100 to-white">
      <Animatable.Text
        animation="fadeInDown"
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
        accessibilityLabel="Add Payment Method"
      >
        Add Payment Method
      </Animatable.Text>
      <View className="space-y-4">
        <CardField
          accessibilityLabel="Card Details"
          className="h-12 border-2 border-gray-200 rounded-xl bg-white p-3"
        />
        <Button title="Add Card" onPress={handleAdd} className="w-full" />
      </View>
    </View>
  );
};
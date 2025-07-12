import { View, Text } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';
import { usePayment } from '../hooks/payment';
import { Button } from '@/components/Button';

export default function Payment() {
  const { addPaymentMethod } = usePayment();

  const handleAdd = async () => {
    const result = await addPaymentMethod();
    if (!result.success) alert(`Error: ${result.error}`);
  };

  return (
    <View className={`flex-1 justify-center p-4 bg-gray-100`}>
      <Text className={`text-2xl font-bold mb-4`}>Add Payment Method</Text>
      <CardField
        accessibilityLabel="Card Details"
        // className="h-12 border-2 border-gray-300 rounded-lg mb-4"
      />
      <Button title="Add Card" onPress={handleAdd} />
    </View>
  );
}
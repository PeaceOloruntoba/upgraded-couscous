import { View, Text } from 'react-native';
import { useTailwind } from 'nativewind';
import { CardField } from '@stripe/stripe-react-native';
import { Button } from '../components';
import { usePayment } from '../hooks/payment';

export default function Payment() {
  const { tw } = useTailwind();
  const { addPaymentMethod } = usePayment();

  const handleAdd = async () => {
    const result = await addPaymentMethod();
    if (!result.success) alert(`Error: ${result.error}`);
  };

  return (
    <View style={tw`flex-1 justify-center p-4 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Add Payment Method</Text>
      <CardField
        accessibilityLabel="Card Details"
        style={tw`h-12 border-2 border-gray-300 rounded-lg mb-4`}
      />
      <Button title="Add Card" onPress={handleAdd} />
    </View>
  );
}
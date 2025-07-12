import { View, Text } from 'react-native';
import { usePayment } from '../hooks/payment';
import { useStore } from '../store';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

export default function RemoveCard() {
  const { stripePaymentMethodId } = useStore();
  const { removePaymentMethod } = usePayment();
  const [modalVisible, setModalVisible] = useState(false);

  const handleRemove = async () => {
    const result = await removePaymentMethod(stripePaymentMethodId!);
    if (!result.success) alert(`Error: ${result.error}`);
    setModalVisible(false);
  };

  return (
    <View className={`flex-1 justify-center p-4 bg-gray-100`}>
      <Text className={`text-2xl font-bold mb-4`}>Remove Payment Method</Text>
      <Text className={`text-lg mb-4`}>Card: {stripePaymentMethodId}</Text>
      <Button title="Remove Card" onPress={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        title="Confirm Removal"
        message="Are you sure you want to remove this payment method?"
        onConfirm={handleRemove}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
}
import { View, Text } from 'react-native';
import { usePayment } from '../hooks/payment';
import { useStore } from '../store';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';
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
    <View className="flex-1 justify-center p-6 bg-gradient-to-b from-blue-100 to-white">
      <Animatable.Text
        animation="fadeInDown"
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
        accessibilityLabel="Remove Payment Method"
      >
        Remove Payment Method
      </Animatable.Text>
      <View className="space-y-4">
        <Text className="text-lg text-gray-600 mb-4">Card: {stripePaymentMethodId?.slice(-4)}</Text>
        <Button title="Remove Card" onPress={() => setModalVisible(true)} className="w-full bg-red-500" />
        <Modal
          visible={modalVisible}
          title="Confirm Removal"
          message="Are you sure you want to remove this payment method?"
          onConfirm={handleRemove}
          onCancel={() => setModalVisible(false)}
          className="shadow-xl"
        />
      </View>
    </View>
  );
};
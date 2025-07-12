import { Modal as RNModal, View, Text, ModalProps } from 'react-native';
import { Button } from './Button';

interface ModalPropsExtended extends ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal = ({ title, message, onConfirm, onCancel, ...props }: ModalPropsExtended) => {
  return (
    <RNModal {...props} transparent animationType="fade">
      <View className={`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View className={`bg-white p-6 rounded-lg w-3/4`}>
          <Text className={`text-xl font-bold mb-4`}>{title}</Text>
          <Text className={`text-lg mb-4`}>{message}</Text>
          <View className={`flex-row justify-between`}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Confirm" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </RNModal>
  );
};

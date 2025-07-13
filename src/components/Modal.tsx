import { Modal as RNModal, View, Text, ModalProps } from 'react-native';
import { Button } from './Button';
import * as Animatable from 'react-native-animatable';

interface ModalPropsExtended extends ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export const Modal = ({ title, message, onConfirm, onCancel, className = '', ...props }: ModalPropsExtended) => {
  return (
    <RNModal {...props} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-60">
        <Animatable.View animation="zoomIn" duration={300} className={`bg-white p-6 rounded-2xl w-11/12 max-w-md shadow-xl ${className}`}>
          <Text className="text-2xl font-bold text-gray-800 mb-4">{title}</Text>
          <Text className="text-lg text-gray-600 mb-6">{message}</Text>
          <View className="flex-row justify-between">
            <Button title="Cancel" onPress={onCancel} className="w-5/12" />
            <Button title="Confirm" onPress={onConfirm} className="w-5/12" />
          </View>
        </Animatable.View>
      </View>
    </RNModal>
  );
};
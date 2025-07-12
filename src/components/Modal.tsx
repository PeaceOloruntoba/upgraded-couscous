import { Modal as RNModal, View, Text, ModalProps } from 'react-native';
import { useTailwind } from 'nativewind';
import { Button } from './Button';

interface ModalPropsExtended extends ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal = ({ title, message, onConfirm, onCancel, ...props }: ModalPropsExtended) => {
  const { tw } = useTailwind();
  return (
    <RNModal {...props} transparent animationType="fade">
      <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View style={tw`bg-white p-6 rounded-lg w-3/4`}>
          <Text style={tw`text-xl font-bold mb-4`}>{title}</Text>
          <Text style={tw`text-lg mb-4`}>{message}</Text>
          <View style={tw`flex-row justify-between`}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Confirm" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </RNModal>
  );
};

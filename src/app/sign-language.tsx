import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { useSignLanguage } from '../hooks/sign-language';
import { Modal } from '@/components/Modal';
import { SubtitleDisplay } from '@/components/SubtitleDisplay';

export default function SignLanguage() {
  const { paymentStatus } = useStore();
  const { processSignLanguage } = useSignLanguage();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [subtitles, setSubtitles] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleProcess = async (frame: any) => {
    if (paymentStatus !== 'active') {
      setModalVisible(true);
      return;
    }
    const result = await processSignLanguage(frame);
    if (result.success) setSubtitles(result.text);
    else alert(`Error: ${result.error}`);
  };

  if (!hasPermission) return <Text className={`text-lg`}>Camera permission required</Text>;

  return (
    <View className={`flex-1 bg-gray-100`}>
      <Camera className={`flex-1`} onCameraReady={() => handleProcess({ /* frame data */ })} />
      <SubtitleDisplay text={subtitles} />
      <Modal
        visible={modalVisible}
        title="Payment Required"
        message="Add a payment method to enable this feature."
        onConfirm={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
}

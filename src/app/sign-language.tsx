import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { useSignLanguage } from '../hooks/sign-language';
import { SubtitleDisplay } from '@/components/SubtitleDisplay';
import { Modal } from '@/components/Modal';

export default function SignLanguage() {
  const { paymentStatus } = useStore();
  const { processSignLanguage } = useSignLanguage();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [subtitles, setSubtitles] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (hasPermission && paymentStatus === 'active') {
      const interval = setInterval(async () => {
        if (cameraRef.current) {
          try {
            // Capture a photo (low-res for performance)
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
            const result = await processSignLanguage({ uri: photo.uri });
            if (result.success) setSubtitles(result.text);
          } catch (error) {
            alert(`Error: ${(error as Error).message}`);
          }
        }
      }, 1000); // Capture every 1 second
      return () => clearInterval(interval);
    }
  }, [hasPermission, paymentStatus]);

  if (hasPermission === null) return <Text className="text-lg">Requesting camera permission...</Text>;
  if (!hasPermission) return <Text className="text-lg">Camera permission required</Text>;

  return (
    <View className="flex-1 bg-gray-100">
      {/* <Camera
        ref={cameraRef}
        accessibilityLabel="Sign language camera"
      /> */}
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
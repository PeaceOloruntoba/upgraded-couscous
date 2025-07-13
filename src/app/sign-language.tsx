import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { useSignLanguage } from '../hooks/sign-language';
import * as Animatable from 'react-native-animatable';
import { SubtitleDisplay } from '@/components/SubtitleDisplay';
import { Modal } from '@/components/Modal';

export default function SignLanguage() {
  const { paymentStatus } = useStore();
  const { processSignLanguage } = useSignLanguage();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [subtitles, setSubtitles] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const cameraRef = useRef<Camera>(null);

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
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
            const result = await processSignLanguage({ uri: photo.uri });
            if (result.success) setSubtitles(result.text);
          } catch (error) {
            alert(`Error: ${(error as Error).message}`);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasPermission, paymentStatus]);

  if (hasPermission === null) return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-100 to-white">
      <Text className="text-lg text-gray-600">Requesting camera permission...</Text>
    </View>
  );
  if (!hasPermission) return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-100 to-white">
      <Text className="text-lg text-gray-600">Camera permission required</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-black">
      <Animatable.View animation="fadeIn" className="flex-1">
        <Camera
          ref={cameraRef}
          className="flex-1"
          accessibilityLabel="Sign language camera"
        />
        <SubtitleDisplay text={subtitles} className="bg-opacity-70" />
        <Modal
          visible={modalVisible}
          title="Payment Required"
          message="Add a payment method to enable this feature."
          onConfirm={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
          className="shadow-xl"
        />
      </Animatable.View>
    </View>
  );
};
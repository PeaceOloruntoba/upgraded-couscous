import axios from '../utils/api';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';

export const useSignLanguage = () => {
  const processSignLanguage = async (frame: any) => {
    try {
      const { data: text } = await axios.post('', { frame }); // /sign-recognize endpoint
      const { data: audioUrl } = await axios.post(
        Constants.expoConfig?.extra?.TTS_API_URL,
        { text }
      );
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
      return { success: true, text };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { processSignLanguage };
};

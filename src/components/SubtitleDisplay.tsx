import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface SubtitleDisplayProps {
  text: string;
}

export const SubtitleDisplay = ({ text }: SubtitleDisplayProps) => {
  return (
    <View className={`absolute bottom-10 w-full bg-black bg-opacity-50 p-4`}>
      <Animatable.Text
        animation="fadeIn"
        className={`text-white text-lg font-bold text-center`}
        accessibilityLabel="Subtitles"
      >
        {text}
      </Animatable.Text>
    </View>
  );
};

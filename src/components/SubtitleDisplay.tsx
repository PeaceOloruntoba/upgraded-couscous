import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface SubtitleDisplayProps {
  text: string;
  className?: string;
}

export const SubtitleDisplay = ({ text, className = '' }: SubtitleDisplayProps) => {
  return (
    <View className={`absolute bottom-10 w-full bg-black bg-opacity-60 p-4 rounded-t-xl ${className}`}>
      <Animatable.Text
        animation="fadeIn"
        className="text-white text-xl font-semibold text-center"
        accessibilityLabel="Subtitles"
      >
        {text}
      </Animatable.Text>
    </View>
  );
};
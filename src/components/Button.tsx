import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  className?: string;
  textName?: string;
}

export const Button = ({ title, textName= '', className = '', ...props }: ButtonProps) => {
  return (
    <Animatable.View animation="pulse" duration={1000}>
      <TouchableOpacity
        {...props}
        accessibilityRole="button"
        accessibilityLabel={title}
        className={`bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-xl shadow-lg ${className}`}
      >
        <Text className={`"${textName} text-lg font-semibold text-center"`}>{title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};
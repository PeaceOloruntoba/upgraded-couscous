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
        className={`${className}`}
      >
        <Text className={`${textName}`}>{title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};
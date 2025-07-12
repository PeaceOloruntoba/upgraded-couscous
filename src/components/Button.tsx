import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { useTailwind } from 'nativewind';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button = ({ title, ...props }: ButtonProps) => {
  const { tw } = useTailwind();
  return (
    <TouchableOpacity
      {...props}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={tw`bg-blue-600 p-4 rounded-lg`}
    >
      <Text style={tw`text-white text-lg font-bold text-center`}>{title}</Text>
    </TouchableOpacity>
  );
};

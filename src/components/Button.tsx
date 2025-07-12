import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      accessibilityRole="button"
      accessibilityLabel={title}
      className={`bg-blue-600 p-4 rounded-lg`}
    >
      <Text className={`text-white text-lg font-bold text-center`}>{title}</Text>
    </TouchableOpacity>
  );
};

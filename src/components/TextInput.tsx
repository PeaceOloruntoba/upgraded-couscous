import { TextInput as RNTextInput, TextInputProps } from 'react-native';
import { useTailwind } from 'nativewind';

interface InputProps extends TextInputProps {
  accessibilityLabel: string;
}

export const TextInput = ({ accessibilityLabel, ...props }: InputProps) => {
  const { tw } = useTailwind();
  return (
    <RNTextInput
      {...props}
      accessibilityLabel={accessibilityLabel}
      style={tw`border-2 border-gray-300 p-3 rounded-lg text-lg bg-white text-black`}
    />
  );
};

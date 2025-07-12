import { TextInput as RNTextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  accessibilityLabel: string;
}

export const TextInput = ({ accessibilityLabel, ...props }: InputProps) => {
  return (
    <RNTextInput
      {...props}
      accessibilityLabel={accessibilityLabel}
      className={`border-2 border-gray-300 p-3 rounded-lg text-lg bg-white text-black`}
    />
  );
};

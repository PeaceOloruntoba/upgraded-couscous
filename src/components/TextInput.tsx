import { TextInput as RNTextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  accessibilityLabel: string;
  className?: string;
}

export const TextInput = ({ accessibilityLabel, className = '', ...props }: InputProps) => {
  return (
    <RNTextInput
      {...props}
      accessibilityLabel={accessibilityLabel}
      className={`border-2 border-gray-200 p-4 rounded-xl text-lg bg-white text-black shadow-sm ${className}`}
    />
  );
};

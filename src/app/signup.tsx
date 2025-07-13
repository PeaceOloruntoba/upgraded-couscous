import { View, Text } from 'react-native';
import { useAuth } from '../hooks/auth';
import { useState } from 'react';
import { Link } from 'expo-router';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';

export default function Signup() {
  const { signup, googleSignIn, tikTokSignIn } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signup(email, password, firstName, lastName);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-gradient-to-b from-blue-100 to-white">
      <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Your Account</Text>
      <View className="flex flex-col gap-4">
        <TextInput
          accessibilityLabel="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          className="bg-gray-50"
        />
        <TextInput
          accessibilityLabel="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          className="bg-gray-50"
        />
        <TextInput
          accessibilityLabel="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          className="bg-gray-50"
        />
        <TextInput
          accessibilityLabel="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          className="bg-gray-50"
        />
        <Button title="Sign Up" onPress={handleSignup} className="mt-6" />
        <Button title="Sign Up with Google" onPress={googleSignIn} className="bg-red-500" />
        <Button title="Sign Up with TikTok" onPress={tikTokSignIn} className="bg-black" />
        <Link href="/login" asChild>
          <Button title="Already have an account? Log In" className="bg-transparent border-2 border-blue-500 text-blue-500" />
        </Link>
      </View>
    </View>
  );
};
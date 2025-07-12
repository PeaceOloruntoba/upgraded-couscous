import { View, Text } from 'react-native';
import { useAuth } from '../hooks/auth';
import { useState } from 'react';
import { Link } from 'expo-router';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';

export default function Signup() {
  const { signup, googleSignIn, tikTokSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    await signup(email, password);
  };

  return (
    <View className={`flex-1 justify-center p-4 bg-gray-100`}>
      <Text className={`text-2xl font-bold mb-4`}>Sign Up</Text>
      <TextInput
        accessibilityLabel="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        accessibilityLabel="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Sign Up with Google" onPress={googleSignIn} />
      <Button title="Sign Up with TikTok" onPress={tikTokSignIn} />
      <Link href="/login" asChild>
        <Button title="Go to Login" />
      </Link>
    </View>
  );
}

import { View, Text } from 'react-native';
import { useTailwind } from 'nativewind';
import { TextInput, Button } from '../components';
import { useAuth } from '../hooks/auth';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function Login() {
  const { tw } = useTailwind();
  const { login, googleSignIn, tikTokSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <View style={tw`flex-1 justify-center p-4 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Log In</Text>
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
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Log In with Google" onPress={googleSignIn} />
      <Button title="Log In with TikTok" onPress={tikTokSignIn} />
      <Link href="/signup" asChild>
        <Button title="Go to Sign Up" />
      </Link>
    </View>
  );
}

import { View, Text } from 'react-native';
import { useTailwind } from 'nativewind';
import { Button } from '../components/Button';
import { useStore } from '../store';
import { Link } from 'expo-router';

export default function Home() {
  const { tw } = useTailwind();
  const { user } = useStore();

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Accessibility App</Text>
      {user ? (
        <Link href="/dashboard" asChild>
          <Button title="Go to Dashboard" />
        </Link>
      ) : (
        <>
          <Link href="/signup" asChild>
            <Button title="Sign Up" />
          </Link>
          <Link href="/login" asChild>
            <Button title="Log In" />
          </Link>
        </>
      )}
    </View>
  );
}

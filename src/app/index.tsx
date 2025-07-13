import { View, Text } from 'react-native';
import { useStore } from '../store';
import { Link } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Button } from '@/components/Button';

export default function Home() {
  const { user } = useStore();

  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-200 to-blue-50 p-6">
      <Animatable.Text
        animation="fadeInDown"
        className="text-4xl font-extrabold text-gray-800 mb-8 text-center"
        accessibilityLabel="Accessibility App Title"
      >
        Accessibility App
      </Animatable.Text>
      <View className="flex flex-col gap-4 w-full max-w-sm">
        {user ? (
          <Link href="/dashboard" asChild>
            <Button title="Go to Dashboard" className="w-full" />
          </Link>
        ) : (
          <>
            <Link href="/signup" asChild>
              <Button title="Sign Up" className="w-full bg-blue-600" />
            </Link>
            <Link href="/login" asChild>
              <Button title="Log In" className="w-full bg-transparent border-2 border-blue-500 text-blue-500" />
            </Link>
          </>
        )}
      </View>
    </View>
  );
};

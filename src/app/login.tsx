import { View, Text } from "react-native";
import { useAuth } from "../hooks/auth";
import { useState } from "react";
import { Link } from "expo-router";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";

export default function Login() {
  const { login, googleSignIn, tikTokSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-gradient-to-b from-blue-100 to-white">
      <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Welcome Back
      </Text>
      <View className="flex flex-col gap-4">
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
        <Button
          title="Log In"
          onPress={handleLogin}
          className="mt-6 bg-blue-600 flex items-center py-4 rounded-lg"
          textName="text-white font-semibold font-lg"
        />
        <Button
          title="Log In with Google"
          onPress={googleSignIn}
          className="bg-red-500 flex items-center py-4 rounded-lg"
          textName="text-white font-semibold font-lg"
        />
        <Button
          title="Log In with TikTok"
          onPress={tikTokSignIn}
          className="bg-black flex items-center py-4 rounded-lg"
          textName="text-white font-semibold font-lg"
        />
        <View className="w-full flex items-end">
          <Text className="text-lg">
            Don't have an account?{" "}
            <Link href="/signup" asChild className="">
              <Text className="font-semibold text-indigo-600">Sign Up</Text>
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      router.replace("/(tabs)");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
      >
        <View className="items-center">
          <LottieView
            source={require("../assets/animations/Signin.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200, marginBottom: 30 }}
          />
          <Text className="text-2xl font-bold mb-6">Login</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6"
            secureTextEntry
          />

          <TouchableOpacity
            style={{ backgroundColor: "#723FEB" }}
            className="px-6 py-3 rounded-xl w-full items-center"
            onPress={handleLogin}
          >
            <Text className="text-white font-semibold">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/signup")}
            className="mt-4"
          >
            <Text className="text-[#723FEB] font-semibold">
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

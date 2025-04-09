import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPass) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPass) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Add actual signup logic here
    Alert.alert("Success", "Account created!");
    router.replace("/(tabs)");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      <View className="flex-1 items-center justify-center px-6 py-10">
        <LottieView
          source={require("../assets/animations/Signin.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />

        <Text className="text-2xl font-bold text-center mb-6">Sign Up</Text>

        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 w-full mb-4"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 w-full mb-4"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 w-full mb-4"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 w-full mb-6"
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity
          className="bg-[#723FEB] py-4 rounded-xl w-full"
          onPress={handleSignUp}
        >
          <Text className="text-white text-center text-lg font-medium">
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

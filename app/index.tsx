import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-1 justify-between">
        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <LottieView
            source={require("../assets/animations/login.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200, marginBottom: 20, marginTop: 50 }}
          />

          <Text className="text-3xl font-bold text-center mb-2">Welcome</Text>
          <Text className="text-base text-center text-gray-500 italic mb-8 px-4">
            "Small deeds done are better than great deeds planned."
          </Text>
        </ScrollView>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-[#723FEB] w-full py-3 rounded-xl mb-3 items-center justify-center relative"
          onPress={() => router.push("/login")}
        >
          <Text className="text-white text-lg font-semibold">Login</Text>
          <Feather
            name="arrow-right"
            size={20}
            color="#ffffff"
            style={{ position: "absolute", right: 16 }}
          />
        </TouchableOpacity>

        {/* Signup Prompt */}
        <TouchableOpacity
          onPress={() => router.push("/signup")}
          className="mb-8 items-center"
        >
          <Text className="text-[#090611] font-medium">
            Don’t have an account? <Text className="underline">Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

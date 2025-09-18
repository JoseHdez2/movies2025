import { Text, View } from "react-native";
import "./globals.css";

// create a react native component showing a flatlist with static data and show it in index.tsx
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
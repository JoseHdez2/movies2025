import { Text, View } from "react-native";
import TestMovieList from "../components/TestMovieList";
import "../globals.css";

// create a react native component showing a flatlist with static data and show it in index.tsx
export default function App() {
  return (
    <View className="flex-1 bg-white pt-12">
      <Text className="text-xl font-bold text-accent text-center mb-6">
        Welcome to Nativewind!
      </Text>
      <TestMovieList />
    </View>
  );
}
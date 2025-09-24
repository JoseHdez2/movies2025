
import Background from "@/components/Background";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css';

export default function RootLayout() {
  return (
    <Background isSplash>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </Background>
  );
};

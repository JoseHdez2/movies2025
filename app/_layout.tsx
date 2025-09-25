
import Background from "@/components/Background";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css';
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

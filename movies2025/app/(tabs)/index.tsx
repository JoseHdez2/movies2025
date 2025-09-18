import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import "../globals.css";

// create a react native component showing a flatlist with static data and show it in index.tsx
export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} 
        contentContainerStyle={{minHeight: "100%", paddingBottom: 10 }} >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-b mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar onPress={() => router.push('/search')} placeholder="Search"/>
        </View>
      </ScrollView>
    </View>
  );
}
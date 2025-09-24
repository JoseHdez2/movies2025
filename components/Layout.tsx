import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <View className="flex-1 bg-primary">
    <Image source={icons.logo} style={styles.backgroundImage} />
    <LinearGradient colors={["#f905", "#0005"]} style={styles.gradient}>
      {children}
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    width: "100%",
    bottom: 10,
    opacity: 0.3,
    height: 400,
  },
  gradient: {
    flex: 1,
  },
});

export default Layout;

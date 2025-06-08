import { Stack } from "expo-router";
import { View } from "react-native";
import CosmicBackground from "@/components/CosmicBackground";
import colors from "@/constants/colors";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CosmicBackground />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: "fade",
        }}
      />
    </View>
  );
}
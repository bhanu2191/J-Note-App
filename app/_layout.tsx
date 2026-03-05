import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "../src/utils/theme";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: "slide_from_right"
      }} />
    </SafeAreaProvider>
  );
}
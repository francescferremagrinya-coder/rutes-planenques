import { Stack } from "expo-router";
import { AuthProvider } from "../auth-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerStyle: { backgroundColor: "#1A2E1D" }, headerTintColor: "#F5F0E8" }}>
        <Stack.Screen name="index" options={{ title: "Rutes Planenques" }} />
        <Stack.Screen name="ranking" options={{ title: "Rànquing" }} />
      </Stack>
    </AuthProvider>
  );
}

import { Stack } from "expo-router";
import "leaflet/dist/leaflet.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0F172A",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "700",
        },
        contentStyle: {
          backgroundColor: "#F8FAFC",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Movilidad Fácil Bogotá",
        }}
      />

      <Stack.Screen
        name="mapa"
        options={{
          title: "Mapa de Bogotá",
        }}
      />
    </Stack>
  );
}
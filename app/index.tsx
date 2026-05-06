import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import styles from "./styles/styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badge}>Proyecto 7</Text>

        <Text style={styles.title}>Movilidad Fácil Bogotá</Text>

        <Text style={styles.subtitle}>
          Aplicación para consultar rutas, ubicación, estaciones cercanas y
          alternativas de viaje en transporte público.
        </Text>

        <View style={styles.moduleBox}>
          <Text style={styles.moduleTitle}>Módulo inicial</Text>
          <Text style={styles.moduleText}>
            Base limpia del proyecto, nombre oficial de la aplicación y
            navegación inicial validada.
          </Text>
        </View>

        <Pressable style={styles.button} onPress={() => router.push("/mapa")}>
          <Text style={styles.buttonText}>Ingresar al mapa</Text>
        </Pressable>
      </View>
    </View>
  );
}
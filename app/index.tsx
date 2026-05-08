import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import styles from "./styles/styles";

export default function HomeScreen() {
  return (
    <View style={styles.homePage}>
      <View style={styles.homeCard}>
        <Text style={styles.badge}>Proyecto 7</Text>
        <Text style={styles.homeTitle}>Movilidad Fácil Bogotá</Text>
        <Text style={styles.homeSubtitle}>
          Consulta el mapa de Bogotá, paraderos, ubicación actual, búsqueda de
          rutas y alternativas básicas de viaje en transporte público.
        </Text>

        <View style={styles.moduleBox}>
          <Text style={styles.moduleTitle}>Versión funcional web</Text>
          <Text style={styles.moduleText}>
            Incluye mapa interactivo, capa de manzanas, paraderos reales,
            búsqueda de rutas, origen y destino, y generación de dos
            alternativas estimadas.
          </Text>
        </View>

        <Pressable style={styles.button} onPress={() => router.push("/mapa") }>
          <Text style={styles.buttonText}>Ingresar al mapa</Text>
        </Pressable>
      </View>
    </View>
  );
}

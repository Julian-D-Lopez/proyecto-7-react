import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import BogotaMap from "../components/BogotaMap";
import styles from "./styles/styles";

export default function MapaScreen() {
  return (
    <View style={styles.mapPage}>
      <View style={styles.mapHeader}>
        <View>
          <Text style={styles.badge}>Módulo 2</Text>
          <Text style={styles.mapTitle}>Mapa exacto de Bogotá</Text>
          <Text style={styles.mapSubtitle}>
            Visualización del GeoJSON de manzanas de Bogotá, con navegación,
            zoom, desplazamiento e interacción sobre cada polígono.
          </Text>
        </View>

        <Pressable style={styles.smallButton} onPress={() => router.back()}>
          <Text style={styles.smallButtonText}>Volver al inicio</Text>
        </Pressable>
      </View>

      <View style={styles.mapContent}>
        <View style={styles.mapPanel}>
          <Text style={styles.panelTitle}>Capa geográfica cargada</Text>

          <Text style={styles.panelText}>
            Esta vista integra el archivo MANZ.geojson como capa oficial de
            polígonos. Cada elemento representa una manzana de Bogotá.
          </Text>

          <View style={styles.metricGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>44.414</Text>
              <Text style={styles.metricLabel}>Manzanas</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>Polygon</Text>
              <Text style={styles.metricLabel}>Tipo de geometría</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>CRS84</Text>
              <Text style={styles.metricLabel}>Sistema de coordenadas</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Controles disponibles</Text>
            <Text style={styles.infoText}>• Acercar y alejar con zoom.</Text>
            <Text style={styles.infoText}>• Desplazarse por el mapa.</Text>
            <Text style={styles.infoText}>
              • Pasar el mouse sobre una manzana para resaltarla.
            </Text>
            <Text style={styles.infoText}>
              • Hacer clic sobre una manzana para ver su información.
            </Text>
          </View>
        </View>

        <View style={styles.mapCardLarge}>
          <BogotaMap />
        </View>
      </View>
    </View>
  );
}
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import BogotaMap from "../components/BogotaMap";
import useUserLocation from "../hooks/useUserLocation";
import styles from "./styles/styles";
function getStatusLabel(status: string) {
  switch (status) {
    case "idle":
      return "Ubicación inactiva";
    case "requesting":
      return "Solicitando permiso...";
    case "tracking":
      return "Ubicación activa";
    case "denied":
      return "Permiso denegado";
    case "unsupported":
      return "No soportado";
    case "error":
      return "Error de ubicación";
    default:
      return "Ubicación";
  }
}

export default function MapaScreen() {
  const [followUser, setFollowUser] = useState(false);
  const [centerRequestId, setCenterRequestId] = useState(0);

  const {
    location,
    status,
    errorMessage,
    startTracking,
    stopTracking,
    isTracking,
  } = useUserLocation();

const handleStartLocation = () => {
  setFollowUser(true);
  setCenterRequestId((current) => current + 1);
  startTracking();
};

const handleCenterLocation = () => {
  setFollowUser(true);
  setCenterRequestId((current) => current + 1);

  if (!location) {
    startTracking();
  }
};

const handleStopLocation = () => {
  setFollowUser(false);
  stopTracking();
};

  return (
    <View style={styles.mapPage}>
      <View style={styles.mapHeader}>
        <View>
          <Text style={styles.badge}>Módulo 4</Text>
          <Text style={styles.mapTitle}>Mapa exacto de Bogotá</Text>
          <Text style={styles.mapSubtitle}>
            Visualización del GeoJSON de manzanas de Bogotá, con zoom,
            desplazamiento, interacción sobre polígonos y detección de ubicación
            actual del usuario.
          </Text>
        </View>

        <Pressable style={styles.smallButton} onPress={() => router.back()}>
          <Text style={styles.smallButtonText}>Volver al inicio</Text>
        </Pressable>
      </View>

      <View style={styles.mapContent}>
        <View style={styles.mapPanel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.panelTitle}>Capa geográfica cargada</Text>

            <Text style={styles.panelText}>
             Esta vista integra el archivo MANZ.geojson como capa de manzanas y el archivo
  paraderos.json como capa de puntos del sistema de transporte.
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

            <View style={styles.locationPanel}>
              <Text style={styles.locationTitle}>Ubicación actual</Text>

              <Text style={styles.locationStatus}>
                {getStatusLabel(status)}
              </Text>

              {location && (
                <View style={styles.locationDataBox}>
                  <Text style={styles.locationData}>
                    Lat: {location.latitude.toFixed(6)}
                  </Text>
                  <Text style={styles.locationData}>
                    Lng: {location.longitude.toFixed(6)}
                  </Text>
                  <Text style={styles.locationData}>
                    Precisión:{" "}
                    {location.accuracy
                      ? `${Math.round(location.accuracy)} m`
                      : "No disponible"}
                  </Text>
                  <Text style={styles.locationData}>
                    Actualizado:{" "}
                    {new Date(location.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              )}

              {errorMessage !== "" && (
                <Text style={styles.locationError}>{errorMessage}</Text>
              )}

              <View style={styles.locationButtonRow}>
                <Pressable
                  style={styles.locationPrimaryButton}
                  onPress={handleStartLocation}
                >
                  <Text style={styles.locationPrimaryButtonText}>
                    {isTracking ? "Actualizando" : "Activar ubicación"}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.locationSecondaryButton}
                  onPress={handleCenterLocation}
                >
                  <Text style={styles.locationSecondaryButtonText}>
                    Centrar
                  </Text>
                </Pressable>
              </View>

              {isTracking && (
                <Pressable
                  style={styles.locationStopButton}
                  onPress={handleStopLocation}
                >
                  <Text style={styles.locationStopButtonText}>
                    Detener seguimiento
                  </Text>
                </Pressable>
              )}
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Controles disponibles</Text>
              <Text style={styles.infoText}>• Acercar y alejar con zoom.</Text>
              <Text style={styles.infoText}>• Desplazarse por el mapa.</Text>
              <Text style={styles.infoText}>
                • Pasar el mouse sobre una manzana para resaltarla.
              </Text>
              <Text style={styles.infoText}>
                • Activar ubicación actual con permiso del navegador.
              </Text>
              <Text style={styles.infoText}>
                • Centrar el mapa en la posición detectada.
              </Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.mapCardLarge}>
          <BogotaMap
  location={location}
  followUser={followUser}
  centerRequestId={centerRequestId}
  />
  <Text style={styles.infoText}>
  • Visualizar paraderos al acercar el mapa.
</Text>
<Text style={styles.infoText}>
  • Hacer clic sobre un paradero para consultar nombre, código, módulo y dirección.
</Text>
        </View>
      </View>
    </View>
  );
}
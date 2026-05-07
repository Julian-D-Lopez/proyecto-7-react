import { useEffect, useState, type ComponentType } from "react";
import { Text, View } from "react-native";

import styles from "../app/styles/styles";
import type { UserLocation } from "../hooks/useUserLocation";

type BogotaMapProps = {
  location: UserLocation | null;
  followUser: boolean;
  centerRequestId: number;
};

export default function BogotaMap({
  location,
  followUser,
  centerRequestId,
}: BogotaMapProps) {
  const [MapComponent, setMapComponent] =
    useState<ComponentType<BogotaMapProps> | null>(null);

  useEffect(() => {
    let componenteActivo = true;

    async function cargarMapa() {
      try {
        const modulo = await import("./BogotaMapLeaflet");

        if (componenteActivo) {
          setMapComponent(() => modulo.default);
        }
      } catch (error) {
        console.error("Error cargando el mapa:", error);
      }
    }

    cargarMapa();

    return () => {
      componenteActivo = false;
    };
  }, []);

  if (!MapComponent) {
    return (
      <View style={styles.leafletWrapper}>
        <View style={styles.mapLoading}>
          <Text style={styles.mapLoadingText}>
            Preparando mapa interactivo...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <MapComponent
      location={location}
      followUser={followUser}
      centerRequestId={centerRequestId}
    />
  );
}
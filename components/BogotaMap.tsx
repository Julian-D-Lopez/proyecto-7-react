import { useEffect, useState, type ComponentType } from "react";
import { Text, View } from "react-native";

import styles from "../app/styles/styles";
import type { RutaTransporte } from "../constants/rutas";
import type { UserLocation } from "../hooks/useUserLocation";
import type { PuntoMapa } from "../utils/geo";
import type { Paradero } from "../utils/paraderos";

export type SelectionMode = "origin" | "destination" | null;

export type BogotaMapProps = {
  location: UserLocation | null;
  followUser: boolean;
  centerRequestId: number;
  selectedRoute: RutaTransporte | null;
  originPoint: PuntoMapa | null;
  destinationPoint: PuntoMapa | null;
  selectionMode: SelectionMode;
  paraderos: Paradero[];
  onMapPointSelected: (point: PuntoMapa) => void;
};

export default function BogotaMap(props: BogotaMapProps) {
  const [MapComponent, setMapComponent] =
    useState<ComponentType<BogotaMapProps> | null>(null);

  useEffect(() => {
    let active = true;

    async function loadMap() {
      try {
        const module = await import("./BogotaMapLeaflet");
        if (active) setMapComponent(() => module.default);
      } catch (error) {
        console.error("Error cargando Leaflet:", error);
      }
    }

    loadMap();

    return () => {
      active = false;
    };
  }, []);

  if (!MapComponent) {
    return (
      <View style={styles.leafletWrapper}>
        <View style={styles.mapLoading}>
          <Text style={styles.mapLoadingText}>Preparando mapa interactivo...</Text>
        </View>
      </View>
    );
  }

  return <MapComponent {...props} />;
}

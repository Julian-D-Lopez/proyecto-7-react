import { useMemo, useState } from "react";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import BogotaMap, { type SelectionMode } from "../components/BogotaMap";
import { rutasTransporte, type RutaTransporte } from "../constants/rutas";
import useUserLocation from "../hooks/useUserLocation";
import { formatDistance, parseCoordinateText, type PuntoMapa } from "../utils/geo";
import {
  normalizarParaderos,
  obtenerParaderosCercanos,
  type EsriParaderosData,
} from "../utils/paraderos";
import styles from "./styles/styles";

const PARADEROS_DATA = require("../assets/data/paraderos.json");

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

function pointLabel(point: PuntoMapa | null) {
  if (!point) return "No definido";
  return `${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}`;
}

function getAlternativeRoutes(selectedRoute: RutaTransporte | null) {
  const primary = selectedRoute ?? rutasTransporte[0];
  const secondary = rutasTransporte.find((ruta) => ruta.id !== primary.id) ?? rutasTransporte[1];
  const transfer = rutasTransporte.find(
    (ruta) => ruta.id !== primary.id && ruta.id !== secondary.id
  ) ?? rutasTransporte[2];

  return { primary, secondary, transfer };
}

export default function MapaScreen() {
  const [followUser, setFollowUser] = useState(false);
  const [centerRequestId, setCenterRequestId] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<RutaTransporte | null>(null);
  const [originText, setOriginText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [originPoint, setOriginPoint] = useState<PuntoMapa | null>(null);
  const [destinationPoint, setDestinationPoint] = useState<PuntoMapa | null>(null);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(null);

  const paraderos = useMemo(
    () => normalizarParaderos(PARADEROS_DATA as EsriParaderosData),
    []
  );

  const {
    location,
    status,
    errorMessage,
    startTracking,
    stopTracking,
    isTracking,
  } = useUserLocation();

  const routeResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery.length === 0) return [];

    return rutasTransporte
      .filter((ruta) =>
        `${ruta.numero} ${ruta.nombre}`.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 5);
  }, [query]);

  const paraderosOrigen = useMemo(
    () => obtenerParaderosCercanos(paraderos, originPoint, 3),
    [originPoint, paraderos]
  );

  const paraderosDestino = useMemo(
    () => obtenerParaderosCercanos(paraderos, destinationPoint, 3),
    [destinationPoint, paraderos]
  );

  const alternativas = useMemo(() => {
    if (!originPoint || !destinationPoint || paraderosOrigen.length === 0 || paraderosDestino.length === 0) {
      return [];
    }

    const { primary, secondary, transfer } = getAlternativeRoutes(selectedRoute);

    return [
      {
        id: "alt-1",
        nombre: "Alternativa 1",
        tipo: "Ruta principal sugerida",
        rutas: [primary],
        transbordos: 0,
        origen: paraderosOrigen[0],
        destino: paraderosDestino[0],
        descripcion: "Opción directa estimada con el paradero de origen y destino más cercano.",
      },
      {
        id: "alt-2",
        nombre: "Alternativa 2",
        tipo: "Ruta con conexión",
        rutas: [secondary, transfer],
        transbordos: 1,
        origen: paraderosOrigen[1] ?? paraderosOrigen[0],
        destino: paraderosDestino[1] ?? paraderosDestino[0],
        descripcion: "Opción alternativa estimada con un transbordo de referencia.",
      },
    ];
  }, [destinationPoint, originPoint, paraderosDestino, paraderosOrigen, selectedRoute]);

  const handleStartLocation = () => {
    setFollowUser(true);
    setCenterRequestId((current) => current + 1);
    startTracking();
  };

  const handleCenterLocation = () => {
    setFollowUser(true);
    setCenterRequestId((current) => current + 1);
    if (!location) startTracking();
  };

  const handleStopLocation = () => {
    setFollowUser(false);
    stopTracking();
  };

  const handleUseLocationAsOrigin = () => {
    if (!location) {
      handleStartLocation();
      return;
    }

    const point = { latitude: location.latitude, longitude: location.longitude };
    setOriginPoint(point);
    setOriginText(pointLabel(point));
  };

  const handleApplyOriginText = () => {
    const point = parseCoordinateText(originText);
    if (point) setOriginPoint(point);
  };

  const handleApplyDestinationText = () => {
    const point = parseCoordinateText(destinationText);
    if (point) setDestinationPoint(point);
  };

  const handleMapPointSelected = (point: PuntoMapa) => {
    if (selectionMode === "origin") {
      setOriginPoint(point);
      setOriginText(pointLabel(point));
    }

    if (selectionMode === "destination") {
      setDestinationPoint(point);
      setDestinationText(pointLabel(point));
    }

    setSelectionMode(null);
  };

  return (
    <View style={styles.mapPage}>
      <View style={styles.mapHeader}>
        <View style={styles.mapHeaderText}>
          <Text style={styles.badge}>Proyecto 7</Text>
          <Text style={styles.mapTitle}>Movilidad Fácil Bogotá</Text>
          <Text style={styles.mapSubtitle}>
            Mapa exacto de Bogotá con manzanas, paraderos, ubicación actual,
            búsqueda de rutas y alternativas estimadas de viaje.
          </Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable style={styles.headerLocationButton} onPress={handleStartLocation}>
            <Text style={styles.headerLocationButtonText}>
              {isTracking ? "Ubicación activa" : "Activar ubicación"}
            </Text>
          </Pressable>
          <Pressable style={styles.smallButton} onPress={() => router.back()}>
            <Text style={styles.smallButtonText}>Volver al inicio</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.mapContent}>
        <View style={styles.mapPanel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.sectionBox}>
              <Text style={styles.panelTitle}>Buscar rutas</Text>
              <TextInput
                style={styles.input}
                placeholder="Buscar por número o nombre, ej. B14, Usme, Kennedy"
                value={query}
                onChangeText={setQuery}
              />
              {routeResults.length > 0 && (
                <View style={styles.resultList}>
                  {routeResults.map((ruta) => (
                    <Pressable
                      key={ruta.id}
                      style={styles.resultItem}
                      onPress={() => {
                        setSelectedRoute(ruta);
                        setQuery(`${ruta.numero} - ${ruta.nombre}`);
                      }}
                    >
                      <View style={[styles.routeDot, { backgroundColor: ruta.color }]} />
                      <View style={styles.resultTextBox}>
                        <Text style={styles.resultTitle}>{ruta.numero} · {ruta.nombre}</Text>
                        <Text style={styles.resultDescription}>{ruta.descripcion}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
              {selectedRoute && (
                <View style={styles.selectedRouteBox}>
                  <Text style={styles.selectedRouteTitle}>Ruta resaltada</Text>
                  <Text style={styles.selectedRouteText}>{selectedRoute.numero} · {selectedRoute.nombre}</Text>
                </View>
              )}
            </View>

            <View style={styles.sectionBox}>
              <Text style={styles.panelTitle}>Ubicación actual</Text>
              <Text style={styles.locationStatus}>{getStatusLabel(status)}</Text>
              {location && (
                <View style={styles.locationDataBox}>
                  <Text style={styles.locationData}>Lat: {location.latitude.toFixed(6)}</Text>
                  <Text style={styles.locationData}>Lng: {location.longitude.toFixed(6)}</Text>
                  <Text style={styles.locationData}>
                    Precisión: {location.accuracy ? `${Math.round(location.accuracy)} m` : "No disponible"}
                  </Text>
                  <Text style={styles.locationData}>Actualizado: {new Date(location.timestamp).toLocaleTimeString()}</Text>
                </View>
              )}
              {errorMessage !== "" && <Text style={styles.locationError}>{errorMessage}</Text>}
              <View style={styles.locationButtonRow}>
                <Pressable style={styles.locationPrimaryButton} onPress={handleStartLocation}>
                  <Text style={styles.locationPrimaryButtonText}>{isTracking ? "Actualizando" : "Activar"}</Text>
                </Pressable>
                <Pressable style={styles.locationSecondaryButton} onPress={handleCenterLocation}>
                  <Text style={styles.locationSecondaryButtonText}>Centrar</Text>
                </Pressable>
              </View>
              {isTracking && (
                <Pressable style={styles.locationStopButton} onPress={handleStopLocation}>
                  <Text style={styles.locationStopButtonText}>Detener seguimiento</Text>
                </Pressable>
              )}
            </View>

            <View style={styles.sectionBox}>
              <Text style={styles.panelTitle}>Origen y destino</Text>
              <Text style={styles.panelText}>
                Puedes escribir coordenadas en formato latitud,longitud o seleccionar el punto directamente en el mapa.
              </Text>

              <Text style={styles.fieldLabel}>Origen</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 4.626000, -74.136100"
                value={originText}
                onChangeText={setOriginText}
                onBlur={handleApplyOriginText}
              />
              <Text style={styles.pointText}>{pointLabel(originPoint)}</Text>
              <View style={styles.inlineButtonRow}>
                <Pressable style={styles.miniButton} onPress={handleUseLocationAsOrigin}>
                  <Text style={styles.miniButtonText}>Usar mi ubicación</Text>
                </Pressable>
                <Pressable style={styles.miniButtonLight} onPress={() => setSelectionMode("origin")}>
                  <Text style={styles.miniButtonLightText}>Elegir en mapa</Text>
                </Pressable>
              </View>

              <Text style={styles.fieldLabel}>Destino</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 4.650000, -74.060000"
                value={destinationText}
                onChangeText={setDestinationText}
                onBlur={handleApplyDestinationText}
              />
              <Text style={styles.pointText}>{pointLabel(destinationPoint)}</Text>
              <View style={styles.inlineButtonRow}>
                <Pressable style={styles.miniButtonLight} onPress={() => setSelectionMode("destination")}>
                  <Text style={styles.miniButtonLightText}>Elegir destino en mapa</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.sectionBox}>
              <Text style={styles.panelTitle}>Paraderos cercanos</Text>
              <Text style={styles.panelText}>{paraderos.length} paraderos cargados desde el archivo real.</Text>

              <Text style={styles.subsectionTitle}>Cercanos al origen</Text>
              {paraderosOrigen.length === 0 ? (
                <Text style={styles.emptyText}>Define un origen para calcular paraderos cercanos.</Text>
              ) : (
                paraderosOrigen.map((paradero) => (
                  <View key={`origen-${paradero.id}`} style={styles.stopCard}>
                    <Text style={styles.stopTitle}>{paradero.nombre}</Text>
                    <Text style={styles.stopText}>{paradero.codigo} · {paradero.direccion}</Text>
                    <Text style={styles.stopDistance}>{formatDistance(paradero.distanceMeters)} caminando aprox.</Text>
                  </View>
                ))
              )}

              <Text style={styles.subsectionTitle}>Cercanos al destino</Text>
              {paraderosDestino.length === 0 ? (
                <Text style={styles.emptyText}>Define un destino para calcular paraderos cercanos.</Text>
              ) : (
                paraderosDestino.map((paradero) => (
                  <View key={`destino-${paradero.id}`} style={styles.stopCard}>
                    <Text style={styles.stopTitle}>{paradero.nombre}</Text>
                    <Text style={styles.stopText}>{paradero.codigo} · {paradero.direccion}</Text>
                    <Text style={styles.stopDistance}>{formatDistance(paradero.distanceMeters)} caminando aprox.</Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.sectionBox}>
              <Text style={styles.panelTitle}>Alternativas de viaje</Text>
              {alternativas.length === 0 ? (
                <Text style={styles.emptyText}>
                  Selecciona origen y destino para generar máximo dos alternativas estimadas.
                </Text>
              ) : (
                alternativas.map((alternativa) => (
                  <View key={alternativa.id} style={styles.alternativeCard}>
                    <View style={styles.alternativeHeader}>
                      <Text style={styles.alternativeTitle}>{alternativa.nombre}</Text>
                      <Text style={styles.transferBadge}>{alternativa.transbordos} transbordo(s)</Text>
                    </View>
                    <Text style={styles.alternativeType}>{alternativa.tipo}</Text>
                    <Text style={styles.alternativeText}>{alternativa.descripcion}</Text>
                    <Text style={styles.alternativeLabel}>Estación/paradero de origen</Text>
                    <Text style={styles.alternativeText}>{alternativa.origen.nombre} · {formatDistance(alternativa.origen.distanceMeters)}</Text>
                    <Text style={styles.alternativeLabel}>Rutas a abordar</Text>
                    <Text style={styles.alternativeText}>
                      {alternativa.rutas.map((ruta) => `${ruta.numero} ${ruta.nombre}`).join(" → ")}
                    </Text>
                    <Text style={styles.alternativeLabel}>Estación/paradero de destino</Text>
                    <Text style={styles.alternativeText}>{alternativa.destino.nombre} · {formatDistance(alternativa.destino.distanceMeters)}</Text>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>

        <View style={styles.mapCardLarge}>
          <BogotaMap
            location={location}
            followUser={followUser}
            centerRequestId={centerRequestId}
            selectedRoute={selectedRoute}
            originPoint={originPoint}
            destinationPoint={destinationPoint}
            selectionMode={selectionMode}
            paraderos={paraderos}
            onMapPointSelected={handleMapPointSelected}
          />
        </View>
      </View>
    </View>
  );
}

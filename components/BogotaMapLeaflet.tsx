import { Asset } from "expo-asset";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import L, {
  type LatLngBounds,
  type LatLngExpression,
  type LeafletMouseEvent,
  type Layer,
  type PathOptions,
} from "leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Circle,
  CircleMarker,
  GeoJSON,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Text, View } from "react-native";

import styles from "../app/styles/styles";
import type { BogotaMapProps } from "./BogotaMap";

const BOGOTA_CENTER: LatLngExpression = [4.711, -74.0721];
const MANZ_GEOJSON = require("../assets/data/MANZ.geojson");

const estiloBaseManzana: PathOptions = {
  color: "#1D4ED8",
  weight: 0.35,
  fillColor: "#38BDF8",
  fillOpacity: 0.08,
};

const estiloHoverManzana: PathOptions = {
  color: "#DC2626",
  weight: 1.4,
  fillColor: "#F97316",
  fillOpacity: 0.28,
};

const estiloParadero: PathOptions = {
  color: "#FFFFFF",
  fillColor: "#7C3AED",
  fillOpacity: 1,
  weight: 2,
};

function configurarInteraccionManzana(
  feature: Feature<Geometry> | undefined,
  layer: Layer
) {
  const properties = feature?.properties ?? {};
  const mancodigo = properties.MANCODIGO ?? "Sin código";
  const seccodigo = properties.SECCODIGO ?? "Sin sector";
  const area = properties.SHAPE_AREA
    ? Number(properties.SHAPE_AREA).toFixed(2)
    : "No disponible";

  layer.bindPopup(`
    <strong>Manzana Bogotá</strong><br/>
    <b>Código manzana:</b> ${mancodigo}<br/>
    <b>Código sección:</b> ${seccodigo}<br/>
    <b>Área:</b> ${area}
  `);

  const interactiveLayer = layer as Layer & {
    setStyle?: (style: PathOptions) => void;
  };

  layer.on({
    mouseover: () => interactiveLayer.setStyle?.(estiloHoverManzana),
    mouseout: () => interactiveLayer.setStyle?.(estiloBaseManzana),
  });
}

function FitGeoJsonBounds({ data }: { data: FeatureCollection<Geometry> | null }) {
  const map = useMap();

  useEffect(() => {
    if (!data) return;
    const layer = L.geoJSON(data);
    const bounds = layer.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [24, 24] });
  }, [data, map]);

  return null;
}

function CenterOnLocation({
  location,
  followUser,
  centerRequestId,
}: Pick<BogotaMapProps, "location" | "followUser" | "centerRequestId">) {
  const map = useMap();

  useEffect(() => {
    if (!location || !followUser) return;
    map.flyTo([location.latitude, location.longitude], 17, {
      animate: true,
      duration: 1,
    });
  }, [location, followUser, centerRequestId, map]);

  return null;
}

function MapStateTracker({
  onChange,
  onMapClick,
}: {
  onChange: (zoom: number, bounds: LatLngBounds) => void;
  onMapClick: (event: LeafletMouseEvent) => void;
}) {
  const map = useMapEvents({
    zoomend: () => onChange(map.getZoom(), map.getBounds()),
    moveend: () => onChange(map.getZoom(), map.getBounds()),
    click: onMapClick,
  });

  useEffect(() => {
    onChange(map.getZoom(), map.getBounds());
  }, [map, onChange]);

  return null;
}

export default function BogotaMapLeaflet({
  location,
  followUser,
  centerRequestId,
  selectedRoute,
  originPoint,
  destinationPoint,
  selectionMode,
  paraderos,
  onMapPointSelected,
}: BogotaMapProps) {
  const [geojson, setGeojson] = useState<FeatureCollection<Geometry> | null>(null);
  const [estadoManzanas, setEstadoManzanas] = useState<"cargando" | "listo" | "error">("cargando");
  const [zoomActual, setZoomActual] = useState(11);
  const [boundsActuales, setBoundsActuales] = useState<LatLngBounds | null>(null);

  const handleMapStateChange = useCallback((zoom: number, bounds: LatLngBounds) => {
    setZoomActual(zoom);
    setBoundsActuales(bounds);
  }, []);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    if (!selectionMode) return;
    onMapPointSelected({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  }, [onMapPointSelected, selectionMode]);

  useEffect(() => {
    let active = true;

    async function cargarManzanas() {
      try {
        const asset = Asset.fromModule(MANZ_GEOJSON);
        await asset.downloadAsync();
        const uri = asset.localUri ?? asset.uri;
        const response = await fetch(uri);
        if (!response.ok) throw new Error("No se pudo cargar assets/data/MANZ.geojson");
        const data = (await response.json()) as FeatureCollection<Geometry>;
        if (active) {
          setGeojson(data);
          setEstadoManzanas("listo");
        }
      } catch (error) {
        console.warn("No fue posible cargar MANZ.geojson. El mapa continúa sin esa capa.", error);
        if (active) setEstadoManzanas("error");
      }
    }

    cargarManzanas();
    return () => {
      active = false;
    };
  }, []);

  const paraderosVisibles = useMemo(() => {
    if (!boundsActuales || zoomActual < 12) return [];

    return paraderos
      .filter((paradero) => boundsActuales.contains([paradero.latitud, paradero.longitud]))
      .slice(0, 900);
  }, [boundsActuales, paraderos, zoomActual]);

  const showParaderos = zoomActual >= 12;

  return (
    <View style={styles.leafletWrapper}>
      <MapContainer
        center={BOGOTA_CENTER}
        zoom={11}
        minZoom={10}
        maxZoom={18}
        scrollWheelZoom
        preferCanvas
        style={{ height: "100%", width: "100%", borderRadius: 22 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapStateTracker
          onChange={handleMapStateChange}
          onMapClick={handleMapClick}
        />

        {geojson && (
          <>
            <GeoJSON
              data={geojson}
              style={() => estiloBaseManzana}
              onEachFeature={configurarInteraccionManzana}
            />
            <FitGeoJsonBounds data={geojson} />
          </>
        )}

        {selectedRoute && (
          <Polyline
            positions={selectedRoute.coordinates}
            pathOptions={{ color: selectedRoute.color, weight: 6, opacity: 0.9 }}
          >
            <Tooltip sticky>
              {selectedRoute.numero} - {selectedRoute.nombre}
            </Tooltip>
          </Polyline>
        )}

        {showParaderos &&
          paraderosVisibles.map((paradero) => (
            <CircleMarker
              key={paradero.id}
              center={[paradero.latitud, paradero.longitud]}
              radius={7}
              pathOptions={estiloParadero}
            >
              <Popup>
                <strong>{paradero.nombre}</strong>
                <br />
                <b>Código:</b> {paradero.codigo}
                <br />
                <b>Módulo:</b> {paradero.modulo}
                <br />
                <b>Zona:</b> {paradero.zona}
                <br />
                <b>Dirección:</b> {paradero.direccion}
              </Popup>
            </CircleMarker>
          ))}

        {originPoint && (
          <CircleMarker
            center={[originPoint.latitude, originPoint.longitude]}
            radius={9}
            pathOptions={{ color: "#FFFFFF", fillColor: "#16A34A", fillOpacity: 1, weight: 3 }}
          >
            <Popup>
              <strong>Origen seleccionado</strong>
              <br />
              {originPoint.latitude.toFixed(6)}, {originPoint.longitude.toFixed(6)}
            </Popup>
          </CircleMarker>
        )}

        {destinationPoint && (
          <CircleMarker
            center={[destinationPoint.latitude, destinationPoint.longitude]}
            radius={9}
            pathOptions={{ color: "#FFFFFF", fillColor: "#DC2626", fillOpacity: 1, weight: 3 }}
          >
            <Popup>
              <strong>Destino seleccionado</strong>
              <br />
              {destinationPoint.latitude.toFixed(6)}, {destinationPoint.longitude.toFixed(6)}
            </Popup>
          </CircleMarker>
        )}

        {location && (
          <>
            <Circle
              center={[location.latitude, location.longitude]}
              radius={location.accuracy ?? 30}
              pathOptions={{ color: "#2563EB", fillColor: "#3B82F6", fillOpacity: 0.12, weight: 2 }}
            />
            <CircleMarker
              center={[location.latitude, location.longitude]}
              radius={10}
              pathOptions={{ color: "#FFFFFF", fillColor: "#2563EB", fillOpacity: 1, weight: 3 }}
            >
              <Popup>
                <strong>Tu ubicación actual</strong>
                <br />
                Latitud: {location.latitude.toFixed(6)}
                <br />
                Longitud: {location.longitude.toFixed(6)}
                <br />
                Precisión: {location.accuracy ? `${Math.round(location.accuracy)} metros` : "No disponible"}
              </Popup>
            </CircleMarker>
            <CenterOnLocation
              location={location}
              followUser={followUser}
              centerRequestId={centerRequestId}
            />
          </>
        )}
      </MapContainer>

      <View style={styles.mapLayerInfo}>
        <Text style={styles.mapLayerInfoTitle}>Capas del mapa</Text>
        <Text style={styles.mapLayerInfoText}>Manzanas: {estadoManzanas}</Text>
        <Text style={styles.mapLayerInfoText}>
          Paraderos: {showParaderos ? `${paraderosVisibles.length} visibles de ${paraderos.length}` : `acerca el mapa · ${paraderos.length} cargados`}
        </Text>
        {selectionMode && (
          <Text style={styles.mapLayerInfoHint}>
            Haz clic en el mapa para fijar {selectionMode === "origin" ? "el origen" : "el destino"}.
          </Text>
        )}
      </View>

      {estadoManzanas === "cargando" && (
        <View style={styles.mapLoading}>
          <Text style={styles.mapLoadingText}>Cargando manzanas de Bogotá...</Text>
        </View>
      )}
    </View>
  );
}

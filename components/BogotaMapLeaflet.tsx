import { Asset } from "expo-asset";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import L, {
  type LatLngExpression,
  type Layer,
  type PathOptions,
} from "leaflet";
import { useEffect, useMemo, useState } from "react";
import {
  Circle,
  CircleMarker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Text, View } from "react-native";

import styles from "../app/styles/styles";
import { type UserLocation } from "../hooks/useUserLocation";

const BOGOTA_CENTER: LatLngExpression = [4.711, -74.0721];

const MANZ_GEOJSON = require("../assets/data/MANZ.geojson");
const PARADEROS_DATA = require("../assets/data/paraderos.json");

const estiloBaseManzana: PathOptions = {
  color: "#1D4ED8",
  weight: 0.45,
  fillColor: "#38BDF8",
  fillOpacity: 0.12,
};

const estiloHoverManzana: PathOptions = {
  color: "#DC2626",
  weight: 1.6,
  fillColor: "#F97316",
  fillOpacity: 0.35,
};

const estiloParadero: PathOptions = {
  color: "#FFFFFF",
  fillColor: "#7C3AED",
  fillOpacity: 0.95,
  weight: 2,
};

type BogotaMapLeafletProps = {
  location: UserLocation | null;
  followUser: boolean;
  centerRequestId: number;
};

type EsriParaderoFeature = {
  attributes?: {
    FID?: number;
    objectid?: number;
    cenefa_par?: string;
    mdoulo_par?: string;
    zona_parad?: number;
    nombre_par?: string;
    via_parade?: string;
    direccion_?: string;
    localidad_?: number;
    consola_pa?: string;
    panel_para?: string;
    audio_para?: string;
    longitud_p?: number;
    latitud_pa?: number;
    globalid?: string;
  };
  geometry?: {
    x?: number;
    y?: number;
  };
};

type EsriParaderosData = {
  features?: EsriParaderoFeature[];
};

type Paradero = {
  id: string;
  nombre: string;
  direccion: string;
  codigo: string;
  modulo: string;
  zona: string;
  latitud: number;
  longitud: number;
};

function normalizarParaderos(data: EsriParaderosData): Paradero[] {
  const features = data.features ?? [];

  return features
    .map((feature, index) => {
      const attributes = feature.attributes ?? {};
      const geometry = feature.geometry ?? {};

      const longitud = geometry.x ?? attributes.longitud_p;
      const latitud = geometry.y ?? attributes.latitud_pa;

      if (typeof latitud !== "number" || typeof longitud !== "number") {
        return null;
      }

      return {
        id: String(attributes.globalid ?? attributes.objectid ?? index),
        nombre: attributes.nombre_par ?? "Paradero sin nombre",
        direccion:
          attributes.direccion_ ??
          attributes.panel_para ??
          attributes.via_parade ??
          "Dirección no disponible",
        codigo: attributes.cenefa_par ?? "Sin código",
        modulo: attributes.mdoulo_par ?? "Sin módulo",
        zona:
          typeof attributes.zona_parad === "number"
            ? String(attributes.zona_parad)
            : "Sin zona",
        latitud,
        longitud,
      };
    })
    .filter((paradero): paradero is Paradero => paradero !== null);
}

function AjustarVistaGeoJson({
  data,
}: {
  data: FeatureCollection<Geometry> | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!data) return;

    const capaTemporal = L.geoJSON(data);
    const bounds = capaTemporal.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [24, 24],
      });
    }
  }, [data, map]);

  return null;
}

function CentrarEnUbicacion({
  location,
  followUser,
  centerRequestId,
}: {
  location: UserLocation | null;
  followUser: boolean;
  centerRequestId: number;
}) {
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

function ControlZoomActual({
  onZoomChange,
}: {
  onZoomChange: (zoom: number) => void;
}) {
  const map = useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
  });

  useEffect(() => {
    onZoomChange(map.getZoom());
  }, [map, onZoomChange]);

  return null;
}

function CapaParaderos({
  paraderos,
  visible,
}: {
  paraderos: Paradero[];
  visible: boolean;
}) {
  if (!visible) return null;

  return (
    <>
      {paraderos.map((paradero) => (
        <CircleMarker
          key={paradero.id}
          center={[paradero.latitud, paradero.longitud]}
          radius={5}
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
    </>
  );
}

function configurarInteraccion(
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

  const capaInteractiva = layer as Layer & {
    setStyle?: (style: PathOptions) => void;
  };

  layer.on({
    mouseover: () => {
      capaInteractiva.setStyle?.(estiloHoverManzana);
    },
    mouseout: () => {
      capaInteractiva.setStyle?.(estiloBaseManzana);
    },
  });
}

export default function BogotaMapLeaflet({
  location,
  followUser,
  centerRequestId,
}: BogotaMapLeafletProps) {
  const [geojson, setGeojson] = useState<FeatureCollection<Geometry> | null>(
    null
  );

  const [estadoCarga, setEstadoCarga] = useState<
    "cargando" | "listo" | "error"
  >("cargando");

  const [zoomActual, setZoomActual] = useState(11);

  const paraderos = useMemo(
    () => normalizarParaderos(PARADEROS_DATA as EsriParaderosData),
    []
  );

  const mostrarParaderos = zoomActual >= 13;

  useEffect(() => {
    let componenteActivo = true;

    async function cargarGeoJson() {
      try {
        const asset = Asset.fromModule(MANZ_GEOJSON);

        await asset.downloadAsync();

        const uri = asset.localUri ?? asset.uri;

        const respuesta = await fetch(uri);

        if (!respuesta.ok) {
          throw new Error("No se pudo cargar assets/data/MANZ.geojson");
        }

        const data = (await respuesta.json()) as FeatureCollection<Geometry>;

        if (componenteActivo) {
          setGeojson(data);
          setEstadoCarga("listo");
        }
      } catch (error) {
        console.error(error);

        if (componenteActivo) {
          setEstadoCarga("error");
        }
      }
    }

    cargarGeoJson();

    return () => {
      componenteActivo = false;
    };
  }, []);

  return (
    <View style={styles.leafletWrapper}>
      <MapContainer
        center={BOGOTA_CENTER}
        zoom={11}
        minZoom={10}
        maxZoom={18}
        scrollWheelZoom
        preferCanvas
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 22,
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ControlZoomActual onZoomChange={setZoomActual} />

        {geojson && (
          <>
            <GeoJSON
              data={geojson}
              style={() => estiloBaseManzana}
              onEachFeature={configurarInteraccion}
            />

            <AjustarVistaGeoJson data={geojson} />
          </>
        )}

        <CapaParaderos paraderos={paraderos} visible={mostrarParaderos} />

        {location && (
          <>
            <Circle
              center={[location.latitude, location.longitude]}
              radius={location.accuracy ?? 30}
              pathOptions={{
                color: "#2563EB",
                fillColor: "#3B82F6",
                fillOpacity: 0.12,
                weight: 2,
              }}
            />

            <CircleMarker
              center={[location.latitude, location.longitude]}
              radius={10}
              pathOptions={{
                color: "#FFFFFF",
                fillColor: "#2563EB",
                fillOpacity: 1,
                weight: 3,
              }}
            >
              <Popup>
                <strong>Tu ubicación actual</strong>
                <br />
                Latitud: {location.latitude.toFixed(6)}
                <br />
                Longitud: {location.longitude.toFixed(6)}
                <br />
                Precisión:{" "}
                {location.accuracy
                  ? `${Math.round(location.accuracy)} metros`
                  : "No disponible"}
              </Popup>
            </CircleMarker>

            <CentrarEnUbicacion
              location={location}
              followUser={followUser}
              centerRequestId={centerRequestId}
            />
          </>
        )}
      </MapContainer>

      <View style={styles.mapLayerInfo}>
        <Text style={styles.mapLayerInfoTitle}>Paraderos</Text>
        <Text style={styles.mapLayerInfoText}>
          {mostrarParaderos
            ? `${paraderos.length} paraderos visibles en el mapa`
            : "Acerca el mapa para visualizar los paraderos"}
        </Text>
      </View>

      {estadoCarga === "cargando" && (
        <View style={styles.mapLoading}>
          <Text style={styles.mapLoadingText}>
            Cargando mapa exacto de Bogotá...
          </Text>
        </View>
      )}

      {estadoCarga === "error" && (
        <View style={styles.mapLoading}>
          <Text style={styles.mapLoadingText}>
            No se pudo cargar assets/data/MANZ.geojson
          </Text>
        </View>
      )}
    </View>
  );
}
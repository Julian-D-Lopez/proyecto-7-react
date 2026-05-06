import type { Feature, FeatureCollection, Geometry } from "geojson";
import L, {
    type LatLngExpression,
    type Layer,
    type PathOptions,
} from "leaflet";
import { useEffect, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import { Text, View } from "react-native";

import styles from "../app/styles/styles";

const BOGOTA_CENTER: LatLngExpression = [4.711, -74.0721];

const GEOJSON_URL = "/data/MANZ.geojson";

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

export default function BogotaMapLeaflet() {
  const [geojson, setGeojson] = useState<FeatureCollection<Geometry> | null>(
    null
  );

  const [estadoCarga, setEstadoCarga] = useState<
    "cargando" | "listo" | "error"
  >("cargando");

  useEffect(() => {
    let componenteActivo = true;

    async function cargarGeoJson() {
      try {
        const respuesta = await fetch(GEOJSON_URL);

        if (!respuesta.ok) {
          throw new Error("No se pudo cargar public/data/MANZ.geojson");
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

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
      </MapContainer>

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
            No se pudo cargar public/data/MANZ.geojson
          </Text>
        </View>
      )}
    </View>
  );
}
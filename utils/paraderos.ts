import { haversineDistanceMeters, type PuntoMapa } from "./geo";

export type EsriParaderoFeature = {
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

export type EsriParaderosData = {
  features?: EsriParaderoFeature[];
};

export type Paradero = {
  id: string;
  nombre: string;
  direccion: string;
  codigo: string;
  modulo: string;
  zona: string;
  latitud: number;
  longitud: number;
};

export type ParaderoConDistancia = Paradero & {
  distanceMeters: number;
};

export function normalizarParaderos(data: EsriParaderosData): Paradero[] {
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

export function obtenerParaderosCercanos(
  paraderos: Paradero[],
  punto: PuntoMapa | null,
  limite = 5
): ParaderoConDistancia[] {
  if (!punto) return [];

  return paraderos
    .map((paradero) => ({
      ...paradero,
      distanceMeters: haversineDistanceMeters(punto, {
        latitude: paradero.latitud,
        longitude: paradero.longitud,
      }),
    }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .slice(0, limite);
}

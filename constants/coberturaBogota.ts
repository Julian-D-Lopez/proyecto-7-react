import type { LatLngExpression, PathOptions } from "leaflet";

export type ZonaCobertura = {
  id: number;
  nombre: string;
  descripcion: string;
  coordinates: LatLngExpression[];
  pathOptions: PathOptions;
};

export const coberturasBogota: ZonaCobertura[] = [
  {
    id: 1,
    nombre: "Cobertura Norte",
    descripcion: "Zona aproximada de cobertura del sistema en el norte de Bogotá.",
    coordinates: [
      [4.835, -74.075],
      [4.815, -74.025],
      [4.735, -74.035],
      [4.715, -74.105],
      [4.775, -74.135],
    ],
    pathOptions: {
      color: "#2563EB",
      fillColor: "#3B82F6",
      fillOpacity: 0.22,
      weight: 3,
    },
  },
  {
    id: 2,
    nombre: "Cobertura Centro",
    descripcion: "Zona aproximada de cobertura del sistema en el centro de Bogotá.",
    coordinates: [
      [4.715, -74.105],
      [4.735, -74.035],
      [4.655, -74.045],
      [4.610, -74.085],
      [4.635, -74.135],
    ],
    pathOptions: {
      color: "#16A34A",
      fillColor: "#22C55E",
      fillOpacity: 0.22,
      weight: 3,
    },
  },
  {
    id: 3,
    nombre: "Cobertura Occidente",
    descripcion: "Zona aproximada de cobertura del sistema en el occidente de Bogotá.",
    coordinates: [
      [4.775, -74.135],
      [4.715, -74.105],
      [4.635, -74.135],
      [4.610, -74.205],
      [4.700, -74.215],
    ],
    pathOptions: {
      color: "#D97706",
      fillColor: "#F59E0B",
      fillOpacity: 0.24,
      weight: 3,
    },
  },
  {
    id: 4,
    nombre: "Cobertura Sur",
    descripcion: "Zona aproximada de cobertura del sistema en el sur de Bogotá.",
    coordinates: [
      [4.610, -74.085],
      [4.655, -74.045],
      [4.545, -74.055],
      [4.485, -74.130],
      [4.545, -74.195],
      [4.610, -74.205],
    ],
    pathOptions: {
      color: "#DC2626",
      fillColor: "#EF4444",
      fillOpacity: 0.22,
      weight: 3,
    },
  },
];
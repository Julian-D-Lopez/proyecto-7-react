import type { LatLngExpression, PathOptions } from "leaflet";

export type RutaTransporte = {
  id: string;
  numero: string;
  nombre: string;
  descripcion: string;
  color: string;
  coordinates: LatLngExpression[];
};

export const rutasTransporte: RutaTransporte[] = [
  {
    id: "ruta-1",
    numero: "B14",
    nombre: "Portal Norte - Centro",
    descripcion: "Corredor de referencia por Autopista Norte y Avenida Caracas.",
    color: "#2563EB",
    coordinates: [
      [4.781, -74.046],
      [4.735, -74.055],
      [4.702, -74.062],
      [4.661, -74.071],
      [4.615, -74.077],
    ],
  },
  {
    id: "ruta-2",
    numero: "H27",
    nombre: "Suba - Centro Internacional",
    descripcion: "Corredor de referencia desde Suba hacia el centro expandido.",
    color: "#16A34A",
    coordinates: [
      [4.748, -74.094],
      [4.716, -74.083],
      [4.682, -74.076],
      [4.647, -74.071],
      [4.611, -74.071],
    ],
  },
  {
    id: "ruta-3",
    numero: "C31",
    nombre: "Kennedy - Chapinero",
    descripcion: "Corredor de referencia entre Kennedy, Puente Aranda y Chapinero.",
    color: "#DC2626",
    coordinates: [
      [4.626, -74.157],
      [4.633, -74.126],
      [4.642, -74.104],
      [4.659, -74.082],
      [4.648, -74.061],
    ],
  },
  {
    id: "ruta-4",
    numero: "G12",
    nombre: "Usme - Centro",
    descripcion: "Corredor de referencia desde el suroriente hacia el centro.",
    color: "#9333EA",
    coordinates: [
      [4.479, -74.121],
      [4.520, -74.105],
      [4.560, -74.094],
      [4.598, -74.083],
      [4.626, -74.074],
    ],
  },
  {
    id: "ruta-5",
    numero: "K86",
    nombre: "Fontibón - Salitre - Centro",
    descripcion: "Corredor de referencia desde Fontibón hacia Salitre y Centro.",
    color: "#D97706",
    coordinates: [
      [4.683, -74.150],
      [4.673, -74.125],
      [4.667, -74.105],
      [4.654, -74.086],
      [4.620, -74.075],
    ],
  },
  {
    id: "ruta-6",
    numero: "M47",
    nombre: "Bosa - Portal Américas",
    descripcion: "Corredor de referencia para conexión del suroccidente.",
    color: "#0891B2",
    coordinates: [
      [4.594, -74.185],
      [4.614, -74.163],
      [4.628, -74.145],
      [4.635, -74.126],
      [4.641, -74.110],
    ],
  },
];

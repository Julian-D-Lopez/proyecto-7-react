import type { LatLngExpression } from "leaflet";

export type PuntoMapa = {
  latitude: number;
  longitude: number;
};

export function haversineDistanceMeters(a: PuntoMapa, b: PuntoMapa) {
  const earthRadiusMeters = 6371000;
  const toRadians = (value: number) => (value * Math.PI) / 180;

  const deltaLat = toRadians(b.latitude - a.latitude);
  const deltaLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const value =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const centralAngle = 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  return earthRadiusMeters * centralAngle;
}

export function formatDistance(meters: number) {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function toLeafletPoint(point: PuntoMapa): LatLngExpression {
  return [point.latitude, point.longitude];
}

export function parseCoordinateText(value: string): PuntoMapa | null {
  const parts = value
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((part) => !Number.isNaN(part));

  if (parts.length !== 2) return null;

  const [latitude, longitude] = parts;
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return null;
  }

  return { latitude, longitude };
}

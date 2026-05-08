import { useCallback, useEffect, useRef, useState } from "react";

export type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  timestamp: number;
};

export type LocationStatus =
  | "idle"
  | "requesting"
  | "tracking"
  | "denied"
  | "unsupported"
  | "error";

function getLocationErrorMessage(error: GeolocationPositionError) {
  switch (error.code) {
    case 1:
      return "Permiso de ubicación denegado por el usuario.";
    case 2:
      return "No fue posible determinar la ubicación actual.";
    case 3:
      return "La solicitud de ubicación tardó demasiado tiempo.";
    default:
      return "Ocurrió un error al obtener la ubicación.";
  }
}

function useUserLocation() {
  const watchIdRef = useRef<number | null>(null);
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateLocation = useCallback((position: GeolocationPosition) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    });
    setStatus("tracking");
    setErrorMessage("");
  }, []);

  const handleLocationError = useCallback((error: GeolocationPositionError) => {
    setErrorMessage(getLocationErrorMessage(error));
    setStatus(error.code === 1 ? "denied" : "error");
  }, []);

  const stopTracking = useCallback(() => {
    if (
      typeof navigator !== "undefined" &&
      navigator.geolocation &&
      watchIdRef.current !== null
    ) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setStatus((currentStatus) =>
      currentStatus === "tracking" ? "idle" : currentStatus
    );
  }, []);

  const startTracking = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      setErrorMessage("El navegador no soporta geolocalización.");
      return;
    }

    setStatus("requesting");
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      updateLocation,
      handleLocationError,
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 3000,
      }
    );
  }, [handleLocationError, updateLocation]);

  useEffect(() => {
    return () => {
      if (
        typeof navigator !== "undefined" &&
        navigator.geolocation &&
        watchIdRef.current !== null
      ) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    location,
    status,
    errorMessage,
    startTracking,
    stopTracking,
    isTracking: status === "tracking",
  };
}

export { useUserLocation };
export default useUserLocation;

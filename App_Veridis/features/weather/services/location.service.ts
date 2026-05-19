// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import * as Location from 'expo-location';

import type { UserWeatherLocation } from '../types/weather.types';

type WeatherLocationResult = {
  location: UserWeatherLocation | null;
  permissionDenied: boolean;
};

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerParteDireccion(
  address: Location.LocationGeocodedAddress | undefined,
  key: keyof Location.LocationGeocodedAddress,
  fallback = ''
) {
  if (!address) return fallback;

  const value = address[key];

  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}

// Funcion asincrona publica para leer o guardar datos.
export async function solicitarPermisoUbicacion() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  return status === Location.PermissionStatus.GRANTED;
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerCoordenadasActuales() {
  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerUbicacionGeocodificadaInversa(
  latitude: number,
  longitude: number
): Promise<UserWeatherLocation> {
  const [address] = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  return {
    ciudad:
      obtenerParteDireccion(address, 'city') ||
      obtenerParteDireccion(address, 'district') ||
      obtenerParteDireccion(address, 'subregion') ||
      'Ubicación actual',
    provincia: obtenerParteDireccion(address, 'region') || obtenerParteDireccion(address, 'subregion') || '',
    pais: obtenerParteDireccion(address, 'country', 'País no disponible'),
    latitud: latitude,
    longitud: longitude,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerUbicacionClimaUsuario(): Promise<WeatherLocationResult> {
  const hasPermission = await solicitarPermisoUbicacion();

  if (!hasPermission) {
    return {
      location: null,
      permissionDenied: true,
    };
  }

  const coordinates = await obtenerCoordenadasActuales();
  const location = await obtenerUbicacionGeocodificadaInversa(coordinates.latitude, coordinates.longitude);

  return {
    location,
    permissionDenied: false,
  };
}

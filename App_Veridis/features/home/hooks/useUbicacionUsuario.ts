// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';

type LocationStatus = 'loading' | 'granted' | 'denied' | 'unavailable';

type UserLocationState = {
  locationLabel: string;
  status: LocationStatus;
  refreshLocation: () => Promise<void>;
};

// Hook publico que devuelve estado y acciones listas para usar.
export function useUbicacionUsuario(): UserLocationState {
  const [locationLabel, setLocationLabel] = useState<string>('Buscando ubicación...');
  const [status, setStatus] = useState<LocationStatus>('loading');

  const loadLocation = useCallback(async () => {
    try {
      setStatus('loading');

      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        setStatus('denied');
        setLocationLabel('Ubicación no activada');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const geocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const place = geocode[0];

      if (!place) {
        setStatus('unavailable');
        setLocationLabel('Ubicación no disponible');
        return;
      }

      const city =
        place.city ||
        place.district ||
        place.subregion ||
        place.region ||
        'Tu ubicación';

      const region =
        place.subregion ||
        place.region ||
        place.country ||
        '';

      const formattedLocation = region && region !== city
        ? `${city}, ${region}`
        : city;

      setLocationLabel(formattedLocation);
      setStatus('granted');
    } catch (error) {
      console.log('Location error:', error);
      setStatus('unavailable');
      setLocationLabel('Ubicación no disponible');
    }
  }, []);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    loadLocation();
  }, [loadLocation]);

  return {
    locationLabel,
    status,
    refreshLocation: loadLocation,
  };
}
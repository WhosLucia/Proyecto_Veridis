// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useCallback, useEffect, useState } from 'react';

import type { Localizacion } from '@/types/user.types';
import { obtenerPronosticoClima } from '../services/weather.service';
import type { UserWeatherLocation, WeatherForecast } from '../types/weather.types';

type UseWeatherState = {
  location: UserWeatherLocation | null;
  forecast: WeatherForecast | null;
  loading: boolean;
  permissionDenied: boolean;
  error: string | null;
};

// Adapta datos de la API al formato que espera la app.
function mapearLocalizacionAUbicacionClima(localizacion: Localizacion): UserWeatherLocation {
  return {
    ciudad: localizacion.ciudad,
    provincia: localizacion.provincia,
    pais: localizacion.pais,
    latitud: localizacion.latitud,
    longitud: localizacion.longitud,
  };
}

// Hook publico que devuelve estado y acciones listas para usar.
export function useClima(localizacionPrincipal?: Localizacion | null) {
  const [state, setState] = useState<UseWeatherState>({
    location: null,
    forecast: null,
    loading: Boolean(localizacionPrincipal),
    permissionDenied: false,
    error: null,
  });

  const reloadWeather = useCallback(async () => {
    if (!localizacionPrincipal) {
      setState({
        location: null,
        forecast: null,
        loading: false,
        permissionDenied: false,
        error: 'Selecciona una ciudad principal para ver la previsión de tus plantas.',
      });
      return;
    }

    const location = mapearLocalizacionAUbicacionClima(localizacionPrincipal);

    setState((current) => ({
      ...current,
      location,
      loading: true,
      permissionDenied: false,
      error: null,
    }));

    try {
      const forecast = await obtenerPronosticoClima(
        localizacionPrincipal.latitud,
        localizacionPrincipal.longitud
      );

      setState({
        location,
        forecast,
        loading: false,
        permissionDenied: false,
        error: null,
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        forecast: null,
        loading: false,
        permissionDenied: false,
        error: error instanceof Error ? error.message : 'No se pudo cargar el tiempo.',
      }));
    }
  }, [localizacionPrincipal]);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    reloadWeather();
  }, [reloadWeather]);

  return {
    ...state,
    reloadWeather,
  };
}

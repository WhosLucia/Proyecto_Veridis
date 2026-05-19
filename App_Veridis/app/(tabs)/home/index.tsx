// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroMarca } from '@/features/home/components/HeroMarca';
import { CabeceraInicio } from '@/features/home/components/CabeceraInicio';
import { SeccionUltimasPlantas } from '@/features/home/components/SeccionUltimasPlantas';
import { BloqueCuidadosHoy } from '@/features/home/components/BloqueCuidadosHoy';
import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import {
  TarjetaRecomendacionClima,
  type WeatherRecommendationData,
} from '@/features/home/components/TarjetaRecomendacionClima';
import { useUsuario } from '@/features/user/context/UserContext';
import { useClima } from '@/features/weather/hooks/useClima';
import type { WeatherForecast } from '@/features/weather/types/weather.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaInicio() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { localizacionPrincipal } = useUsuario();
  const { reloadMyPlantsData } = useMisPlantas();
  const { location, forecast, loading, permissionDenied, error, reloadWeather } =
    useClima(localizacionPrincipal);

  useFocusEffect(
    useCallback(() => {
      reloadMyPlantsData();
    }, [reloadMyPlantsData])
  );

  const locationLabel = localizacionPrincipal
    ? `${localizacionPrincipal.ciudad}, ${localizacionPrincipal.provincia}`
    : 'Ciudad principal pendiente';
  const locationStatus = localizacionPrincipal ? (loading ? 'loading' : 'granted') : 'unavailable';
  const weatherForRecommendations = obtenerDatosRecomendacionClima(forecast);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <CabeceraInicio
          locationLabel={locationLabel}
          locationStatus={locationStatus}
          onRefreshLocation={reloadWeather}
        />

        <HeroMarca
          location={location}
          forecast={forecast}
          loading={loading}
          permissionDenied={permissionDenied}
          error={error}
          onReloadWeather={reloadWeather}
        />

        <BloqueCuidadosHoy />

        <SeccionUltimasPlantas />

        <TarjetaRecomendacionClima
          locationLabel={locationLabel}
          isLoading={loading}
          weather={weatherForRecommendations}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerDatosRecomendacionClima(
  forecast: WeatherForecast | null
): WeatherRecommendationData | undefined {
  if (!forecast) {
    return undefined;
  }

  return {
    temperature: forecast.current.temperature,
    windSpeed: forecast.today.windSpeedMax,
    precipitationProbability: forecast.today.precipitationProbabilityMax,
    minTemperature: forecast.today.temperatureMin,
    maxTemperature: forecast.today.temperatureMax,
  };
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    scrollContent: {
      paddingHorizontal: 22,
      paddingTop: 8,
      paddingBottom: 130,
    },
  });
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { UserWeatherLocation, WeatherForecast } from '../types/weather.types';

type WeatherSummaryCardProps = {
  location: UserWeatherLocation | null;
  forecast: WeatherForecast | null;
  loading: boolean;
  permissionDenied: boolean;
  error: string | null;
  onRetry: () => void;
};

// Convierte un valor interno en texto legible para la interfaz.
function formatearTemperatura(value: number) {
  return `${Math.round(value)} °C`;
}

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaResumenClima({
  location,
  forecast,
  loading,
  permissionDenied,
  error,
  onRetry,
}: WeatherSummaryCardProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const title = location ? `${location.ciudad}, ${location.pais}` : 'Tiempo local';

  if (loading) {
    return (
      <View style={styles.card}>
        <View style={styles.stateRow}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.stateText}>Cargando el tiempo local...</Text>
        </View>
      </View>
    );
  }

  if (permissionDenied) {
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Meteorología</Text>
            <Text style={styles.title}>Ubicación desactivada</Text>
          </View>
          <MaterialCommunityIcons name="map-marker-off" size={26} color={colors.accent} />
        </View>

        <Text style={styles.description}>
          Activa el permiso de ubicación para adaptar los cuidados al clima de tu zona.
        </Text>

        <Pressable onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (error || !forecast) {
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Meteorología</Text>
            <Text style={styles.title}>No se pudo cargar</Text>
          </View>
          <MaterialCommunityIcons name="cloud-alert" size={26} color={colors.danger} />
        </View>

        <Text style={styles.description}>{error ?? 'Vuelve a intentarlo en unos segundos.'}</Text>

        <Pressable onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>Meteorología</Text>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>

        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="weather-partly-cloudy" size={25} color={colors.primary} />
        </View>
      </View>

      <View style={styles.mainRow}>
        <Text style={styles.temperature}>{formatearTemperatura(forecast.current.temperature)}</Text>

        <View style={styles.detailColumn}>
          <Text style={styles.detailText}>
            Lluvia {forecast.today.precipitationProbabilityMax} %
          </Text>
          <Text style={styles.detailText}>
            {formatearTemperatura(forecast.today.temperatureMax)} /{' '}
            {formatearTemperatura(forecast.today.temperatureMin)}
          </Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <MaterialCommunityIcons name="weather-rainy" size={17} color={colors.primary} />
          <Text style={styles.metricText}>{forecast.today.rainSum} mm</Text>
        </View>

        <View style={styles.metric}>
          <MaterialCommunityIcons name="weather-windy" size={17} color={colors.accent} />
          <Text style={styles.metricText}>{Math.round(forecast.today.windSpeedMax)} km/h</Text>
        </View>
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  card: {
    borderRadius: 26,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 28,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },

  titleBlock: {
    flex: 1,
  },

  eyebrow: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },

  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
    marginBottom: 16,
  },

  temperature: {
    color: colors.text,
    fontSize: 42,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },

  detailColumn: {
    flex: 1,
    gap: 5,
  },

  detailText: {
    color: colors.textSoft,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },

  metricsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  metric: {
    flex: 1,
    minHeight: 38,
    borderRadius: 16,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  metricText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },

  stateRow: {
    minHeight: 84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  stateText: {
    color: colors.textSoft,
    fontSize: 13,
    fontWeight: '700',
  },

  description: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },

  retryButton: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  retryText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '900',
  },
  });
}

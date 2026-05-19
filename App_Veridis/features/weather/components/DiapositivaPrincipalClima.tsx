// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { UserWeatherLocation, WeatherForecast } from '../types/weather.types';

type WeatherHeroSlideProps = {
  location: UserWeatherLocation | null;
  forecast: WeatherForecast | null;
  loading: boolean;
  permissionDenied: boolean;
  error: string | null;
  onReload: () => void;
};

// Convierte un valor interno en texto legible para la interfaz.
function formatearTemperatura(value: number) {
  return `${Math.round(value)} °C`;
}

function BotonAccionClima({ label, onPress }: { label: string; onPress: () => void }) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <Pressable onPress={onPress} style={styles.actionButton}>
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

// Componente publico que renderiza una parte de la interfaz.
export function DiapositivaPrincipalClima({
  location,
  forecast,
  loading,
  permissionDenied,
  error,
  onReload,
}: WeatherHeroSlideProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  if (loading) {
    return (
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Clima local</Text>
          <ActivityIndicator color={colors.accent} />
        </View>

        <Text style={styles.title}>Preparando el tiempo de tu zona</Text>
        <Text style={styles.description}>
          En unos segundos Véridis podrá adaptar los cuidados al clima de hoy.
        </Text>
      </View>
    );
  }

  if (permissionDenied) {
    return (
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Clima local</Text>
          <MaterialCommunityIcons name="map-marker-off" size={24} color={colors.accent} />
        </View>

        <Text style={styles.title}>Activa la ubicación para consejos más precisos</Text>
        <Text style={styles.description}>
          Usaremos solo tu zona aproximada para ajustar riegos, frío, calor y viento.
        </Text>

        <BotonAccionClima label="Reintentar" onPress={onReload} />
      </View>
    );
  }

  if (error || !forecast) {
    return (
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Clima local</Text>
          <MaterialCommunityIcons name="cloud-alert" size={24} color={colors.accent} />
        </View>

        <Text style={styles.title}>No se pudo cargar el tiempo</Text>
        <Text style={styles.description}>
          {error ?? 'Vuelve a intentarlo para recuperar la previsión actual.'}
        </Text>

        <BotonAccionClima label="Reintentar" onPress={onReload} />
      </View>
    );
  }

  const locationLabel = location ? `${location.ciudad}, ${location.pais}` : 'Tu zona';

  return (
    <View style={styles.content}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.eyebrow}>Clima local</Text>
          <Text numberOfLines={1} style={styles.location}>
            {locationLabel}
          </Text>
        </View>

        <View style={styles.temperatureBadge}>
          <MaterialCommunityIcons
            name="weather-partly-cloudy"
            size={19}
            color={colors.primaryDark}
          />
          <Text style={styles.temperatureText}>
            {formatearTemperatura(forecast.current.temperature)}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Recomendaciones según el tiempo de hoy</Text>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Lluvia</Text>
          <Text style={styles.metricValue}>{forecast.today.precipitationProbabilityMax} %</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Máx / mín</Text>
          <Text style={styles.metricValue}>
            {Math.round(forecast.today.temperatureMax)}° /{' '}
            {Math.round(forecast.today.temperatureMin)}°
          </Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Viento</Text>
          <Text style={styles.metricValue}>{Math.round(forecast.today.windSpeedMax)} km/h</Text>
        </View>
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    content: {
      flex: 1,
      minHeight: 158,
      padding: 20,
      justifyContent: 'space-between',
    },

    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
    },

    eyebrow: {
      color: 'rgba(255,255,255,0.72)',
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },

    location: {
      color: 'rgba(255,255,255,0.86)',
      fontSize: 12,
      fontWeight: '700',
      marginTop: 4,
      maxWidth: 180,
    },

    temperatureBadge: {
      borderRadius: 999,
      backgroundColor: colors.accentSoft,
      paddingHorizontal: 10,
      paddingVertical: 6,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    temperatureText: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '900',
      fontVariant: ['tabular-nums'],
    },

    title: {
      color: colors.whiteSoft,
      fontSize: 21,
      lineHeight: 26,
      fontWeight: '900',
      maxWidth: 280,
    },

    description: {
      color: 'rgba(255,255,255,0.78)',
      fontSize: 13,
      lineHeight: 19,
      maxWidth: 295,
    },

    actionButton: {
      alignSelf: 'flex-start',
      borderRadius: 999,
      backgroundColor: colors.accent,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },

    actionText: {
      color: colors.whiteSoft,
      fontSize: 11,
      fontWeight: '900',
    },

    metricsRow: {
      flexDirection: 'row',
      gap: 8,
    },

    metric: {
      flex: 1,
      minHeight: 48,
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.12)',
      paddingHorizontal: 10,
      paddingVertical: 8,
      justifyContent: 'center',
    },

    metricLabel: {
      color: 'rgba(255,255,255,0.66)',
      fontSize: 10,
      fontWeight: '700',
      marginBottom: 3,
    },

    metricValue: {
      color: colors.whiteSoft,
      fontSize: 12,
      fontWeight: '900',
      fontVariant: ['tabular-nums'],
    },
  });
}

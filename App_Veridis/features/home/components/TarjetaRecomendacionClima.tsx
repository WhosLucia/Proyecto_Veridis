// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import { CabeceraSeccion } from './CabeceraSeccion';

export type WeatherRecommendationData = {
  temperature?: number;
  minTemperature?: number;
  maxTemperature?: number;
  humidity?: number;
  precipitationProbability?: number;
  windSpeed?: number;
  uvIndex?: number;
};

type WeatherRecommendationCardProps = {
  locationLabel: string;
  weather?: WeatherRecommendationData;
  isLoading?: boolean;
};

type Recommendation = {
  icon: string;
  title: string;
  description: string;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaRecomendacionClima({
  locationLabel,
  weather,
  isLoading = false,
}: WeatherRecommendationCardProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  const recommendations = obtenerRecomendacionesClima(weather, isLoading);

  return (
    <View style={styles.container}>
      <CabeceraSeccion title="Recomendación local" />

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>{obtenerIconoPrincipalClima(weather)}</Text>
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title}>Clima en {locationLabel}</Text>

            <Text style={styles.description}>
              Consejos generados según las condiciones actuales de tu ubicación.
            </Text>
          </View>
        </View>

        <View style={styles.recommendationsList}>
          {recommendations.map((item, index) => (
            <View key={`${item.title}-${index}`} style={styles.recommendationItem}>
              <Text style={styles.recommendationIcon}>{item.icon}</Text>

              <View style={styles.recommendationTextBlock}>
                <Text style={styles.recommendationTitle}>{item.title}</Text>
                <Text style={styles.recommendationDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerRecomendacionesClima(
  weather?: WeatherRecommendationData,
  isLoading?: boolean
): Recommendation[] {
  if (isLoading) {
    return [
      {
        icon: '⏳',
        title: 'Analizando clima local',
        description: 'Estamos cargando la previsión para mostrar recomendaciones adaptadas.',
      },
    ];
  }

  if (!weather) {
    return [
      {
        icon: '🌿',
        title: 'Sin datos climáticos',
        description:
          'No se ha podido obtener el clima actual. Mantén los cuidados habituales y revisa el sustrato antes de regar.',
      },
    ];
  }

  const recommendations: Recommendation[] = [];

  const {
    temperature,
    minTemperature,
    maxTemperature,
    humidity,
    precipitationProbability,
    windSpeed,
    uvIndex,
  } = weather;

  if ((maxTemperature !== undefined && maxTemperature >= 32) || (temperature !== undefined && temperature >= 32)) {
    recommendations.push({
      icon: '🔥',
      title: 'Calor elevado',
      description:
        'Evita el sol directo en las horas centrales y revisa la humedad del sustrato antes de regar.',
    });
  }

  if ((minTemperature !== undefined && minTemperature <= 8) || (temperature !== undefined && temperature <= 8)) {
    recommendations.push({
      icon: '❄️',
      title: 'Temperatura baja',
      description:
        'Protege las plantas sensibles y evita dejarlas en exterior durante la noche.',
    });
  }

  if (humidity !== undefined && humidity <= 35) {
    recommendations.push({
      icon: '💧',
      title: 'Ambiente seco',
      description:
        'Las plantas tropicales pueden necesitar más humedad ambiental. Revisa hojas y sustrato.',
    });
  }

  if (humidity !== undefined && humidity >= 80) {
    recommendations.push({
      icon: '🍃',
      title: 'Humedad alta',
      description:
        'Ventila bien las zonas interiores y evita regar en exceso para reducir riesgo de hongos.',
    });
  }

  if (precipitationProbability !== undefined && precipitationProbability >= 60) {
    recommendations.push({
      icon: '🌧️',
      title: 'Lluvia probable',
      description:
        'Si tienes plantas en exterior, revisa el drenaje y evita regar hasta comprobar el sustrato.',
    });
  }

  if (windSpeed !== undefined && windSpeed >= 30) {
    recommendations.push({
      icon: '🌬️',
      title: 'Viento fuerte',
      description:
        'Protege macetas ligeras o plantas altas en balcones, terrazas y ventanas.',
    });
  }

  if (uvIndex !== undefined && uvIndex >= 7) {
    recommendations.push({
      icon: '☀️',
      title: 'Radiación solar alta',
      description:
        'Evita mover plantas delicadas al sol directo. Prioriza luz indirecta o semisombra.',
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      icon: '✓',
      title: 'Condiciones estables',
      description:
        'No hay alertas climáticas destacadas. Mantén los cuidados habituales.',
    });
  }

  return recommendations.slice(0, 3);
}

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerIconoPrincipalClima(weather?: WeatherRecommendationData) {
  if (!weather) return '🌿';

  if (weather.precipitationProbability !== undefined && weather.precipitationProbability >= 60) {
    return '🌧️';
  }

  if (
    (weather.maxTemperature !== undefined && weather.maxTemperature >= 32) ||
    (weather.temperature !== undefined && weather.temperature >= 32)
  ) {
    return '☀️';
  }

  if (
    (weather.minTemperature !== undefined && weather.minTemperature <= 8) ||
    (weather.temperature !== undefined && weather.temperature <= 8)
  ) {
    return '❄️';
  }

  if (weather.windSpeed !== undefined && weather.windSpeed >= 30) {
    return '🌬️';
  }

  return '🌿';
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 34,
    },

    card: {
      borderRadius: 26,
      backgroundColor: colors.primarySoft,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
    },

    headerRow: {
      flexDirection: 'row',
      marginBottom: 16,
    },

    iconCircle: {
      width: 46,
      height: 46,
      borderRadius: 18,
      backgroundColor: colors.accentSoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },

    icon: {
      color: colors.accent,
      fontSize: 24,
      fontWeight: '900',
    },

    textBlock: {
      flex: 1,
    },

    title: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
      marginBottom: 6,
    },

    description: {
      color: colors.textSoft,
      fontSize: 12,
      lineHeight: 18,
    },

    recommendationsList: {
      gap: 12,
    },

    recommendationItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.background,
      borderRadius: 18,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },

    recommendationIcon: {
      width: 28,
      fontSize: 17,
      marginTop: 1,
      color: colors.text,
    },

    recommendationTextBlock: {
      flex: 1,
    },

    recommendationTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '800',
      marginBottom: 3,
    },

    recommendationDescription: {
      color: colors.textSoft,
      fontSize: 12,
      lineHeight: 17,
    },
  });
}

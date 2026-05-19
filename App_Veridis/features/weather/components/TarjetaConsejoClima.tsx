// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { WeatherAdvice } from '../types/weather.types';

type WeatherAdviceCardProps = {
  advice: WeatherAdvice;
};

const adviceIcons = {
  skip_watering: 'water-off',
  water_needed: 'watering-can',
  protect_from_sun: 'white-balance-sunny',
  protect_from_wind: 'weather-windy',
  bring_inside: 'home-import-outline',
  normal: 'leaf',
} as const;

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaConsejoClima({ advice }: WeatherAdviceCardProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const severityStyles = {
    info: {
      background: colors.primarySoft,
      iconBackground: colors.surface,
      iconColor: colors.primary,
    },
    success: {
      background: colors.surfaceSoft,
      iconBackground: colors.primarySoft,
      iconColor: colors.success,
    },
    warning: {
      background: colors.accentSoft,
      iconBackground: colors.surface,
      iconColor: colors.warning,
    },
    danger: {
      background: colors.accentSoft,
      iconBackground: colors.surface,
      iconColor: colors.danger,
    },
  } as const;
  const currentSeverity = severityStyles[advice.severity];

  return (
    <View style={[styles.card, { backgroundColor: currentSeverity.background }]}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: currentSeverity.iconBackground },
        ]}
      >
        <MaterialCommunityIcons
          name={adviceIcons[advice.type]}
          size={22}
          color={currentSeverity.iconColor}
        />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>{advice.title}</Text>
        <Text style={styles.message}>{advice.message}</Text>
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      borderRadius: 22,
      borderCurve: 'continuous',
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      flexDirection: 'row',
      gap: 12,
    },

    iconCircle: {
      width: 42,
      height: 42,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textBlock: {
      flex: 1,
      gap: 4,
    },

    title: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '900',
    },

    message: {
      color: colors.textSoft,
      fontSize: 12,
      lineHeight: 17,
    },
  });
}

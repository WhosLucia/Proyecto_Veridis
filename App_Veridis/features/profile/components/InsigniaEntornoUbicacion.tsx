// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

type LocationEnvironmentBadgeProps = {
  isExterior: boolean;
  compact?: boolean;
};

// Componente publico que renderiza una parte de la interfaz.
export function InsigniaEntornoUbicacion({
  isExterior,
  compact = false,
}: LocationEnvironmentBadgeProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View
      style={[
        styles.badge,
        isExterior ? styles.exteriorBadge : styles.interiorBadge,
        compact && styles.compactBadge,
      ]}
    >
      <MaterialCommunityIcons
        name={isExterior ? 'weather-partly-rainy' : 'home-outline'}
        size={compact ? 12 : 14}
        color={isExterior ? colors.accent : colors.primaryDark}
      />
      <Text
        numberOfLines={1}
        style={[
          styles.text,
          isExterior ? styles.exteriorText : styles.interiorText,
          compact && styles.compactText,
        ]}
      >
        {isExterior ? 'Clima' : 'Interior'}
      </Text>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    badge: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      minHeight: 26,
      borderRadius: 999,
      paddingHorizontal: 9,
      borderWidth: 1,
    },

    compactBadge: {
      minHeight: 22,
      paddingHorizontal: 7,
    },

    exteriorBadge: {
      backgroundColor: colors.accentSoft,
      borderColor: colors.accent,
    },

    interiorBadge: {
      backgroundColor: colors.surfaceSoft,
      borderColor: colors.border,
    },

    text: {
      fontSize: 11,
      fontWeight: '900',
    },

    compactText: {
      fontSize: 10,
    },

    exteriorText: {
      color: colors.accent,
    },

    interiorText: {
      color: colors.text,
    },
  });
}

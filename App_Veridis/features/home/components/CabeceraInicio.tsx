// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

type HomeHeaderProps = {
  locationLabel: string;
  locationStatus: 'loading' | 'granted' | 'denied' | 'unavailable';
  onRefreshLocation: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function CabeceraInicio({ locationLabel, locationStatus, onRefreshLocation }: HomeHeaderProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      <Pressable onPress={onRefreshLocation} style={styles.locationBlock}>

        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text numberOfLines={1} style={styles.locationText}>
            {locationLabel}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      paddingTop: 8,
      marginBottom: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    locationBlock: {
      flex: 1,
      marginRight: 16,
    },

    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    locationIcon: {
      fontSize: 13,
      marginRight: 5,
    },

    locationText: {
      color: colors.textMuted,
      fontSize: 14,
      fontWeight: '700',
      maxWidth: 230,
    },

  });
}

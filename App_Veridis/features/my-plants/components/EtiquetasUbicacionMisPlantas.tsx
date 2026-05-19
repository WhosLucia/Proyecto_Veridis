// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { MyPlantsLocationFilter } from '../types/myPlants.types';

type MyPlantsLocationChipsProps = {
  locations: string[];
  activeLocation: MyPlantsLocationFilter;
  onChangeLocation: (location: MyPlantsLocationFilter) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function EtiquetasUbicacionMisPlantas({
  locations,
  activeLocation,
  onChangeLocation,
}: MyPlantsLocationChipsProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}>
      <Pressable
        style={[styles.chip, activeLocation === 'all' && styles.chipActive]}
        onPress={() => onChangeLocation('all')}>
        <Text style={[styles.chipText, activeLocation === 'all' && styles.chipTextActive]}>
          Todas
        </Text>
      </Pressable>

      {locations.map((location) => {
        const active = activeLocation === location;

        return (
          <Pressable
            key={location}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onChangeLocation(location)}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{location}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 16,
    },

    content: {
      gap: 8,
      paddingRight: 4,
    },

    chip: {
      height: 34,
      paddingHorizontal: 14,
      borderRadius: 999,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },

    chipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    chipText: {
      color: colors.textSoft,
      fontSize: 12,
      fontWeight: '800',
    },

    chipTextActive: {
      color: colors.textInverse,
    },
  });
}

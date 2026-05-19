// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { CatalogPlantType } from '../types/catalog.types';
import { formatearTipoPlantaCatalogo } from '../utils/formateadoresCatalogo';

type Props = {
  activeType: CatalogPlantType;
  onChangeType: (type: CatalogPlantType) => void;
  availableTypes: CatalogPlantType[];
};

// Componente publico que renderiza una parte de la interfaz.
export function EtiquetasTipoCatalogo({ activeType, onChangeType, availableTypes }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const plantTypes: CatalogPlantType[] = ['all', ...availableTypes];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {plantTypes.map((type) => {
        const active = activeType === type;

        return (
          <Pressable
            key={type}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onChangeType(type)}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {formatearTipoPlantaCatalogo(type)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    content: {
      gap: 8,
      paddingBottom: 16,
    },

    chip: {
      minHeight: 34,
      borderRadius: 999,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
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
      fontWeight: '900',
    },

    chipTextActive: {
      color: colors.textInverse,
    },
  });
}

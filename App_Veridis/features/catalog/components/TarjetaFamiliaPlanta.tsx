// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { CatalogPlant, PlantFamily } from '../types/catalog.types';
import { FilaPlantaCatalogo } from './FilaPlantaCatalogo';

type Props = {
  family: PlantFamily;
  plants: CatalogPlant[];
  expanded: boolean;
  onToggle: () => void;
  onPressPlant: (plant: CatalogPlant) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaFamiliaPlanta({ family, plants, expanded, onToggle, onPressPlant }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.card}>
      <Pressable style={styles.header} onPress={onToggle}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name="sprout-outline" size={30} color={colors.primaryDark} />
        </View>

        <View style={styles.textBlock}>
          <Text numberOfLines={1} style={styles.title}>
            {family.nombre}
          </Text>

          {family.descripcion ? (
            <Text numberOfLines={2} style={styles.description}>
              {family.descripcion}
            </Text>
          ) : null}

          <Text style={styles.count}>
            {plants.length} planta{plants.length !== 1 ? 's' : ''} registradas
          </Text>
        </View>

        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={28}
          color={colors.primaryDark}
        />
      </Pressable>

      {expanded ? (
        <View style={styles.plantsContainer}>
          {plants.map((plant) => (
            <FilaPlantaCatalogo
              key={plant.id_planta}
              plant={plant}
              onPress={() => onPressPlant(plant)}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 15,
      marginBottom: 18,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    iconBox: {
      width: 46,
      height: 46,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceSoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },

    textBlock: {
      flex: 1,
      paddingRight: 10,
    },

    title: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
      marginBottom: 6,
    },

    description: {
      color: colors.textSoft,
      fontSize: 13,
      lineHeight: 20,
    },

    count: {
      color: colors.accent,
      fontSize: 12,
      fontWeight: '800',
      marginTop: 8,
    },

    plantsContainer: {
      marginTop: 16,
      gap: 10,
    },
  });
}

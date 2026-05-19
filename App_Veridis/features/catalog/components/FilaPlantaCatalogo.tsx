// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { CatalogPlant } from '../types/catalog.types';
import { formatearTipoPlantaCatalogo } from '../utils/formateadoresCatalogo';

type Props = {
  plant: CatalogPlant;
  onPress: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function FilaPlantaCatalogo({ plant, onPress }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}>
      {plant.url_img_default ? (
        <Image source={{ uri: plant.url_img_default }} style={styles.image} />
      ) : (
        <View style={styles.emptyImage}>
          <MaterialCommunityIcons name="leaf" size={24} color={colors.primaryDark} />
        </View>
      )}

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text numberOfLines={1} style={styles.name}>
            {plant.nombre_comun}
          </Text>

          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{formatearTipoPlantaCatalogo(plant.tipo)}</Text>
          </View>
        </View>

        <Text numberOfLines={1} style={styles.scientificName}>
          {plant.nombre_cientifico ?? 'Sin nombre científico'}
        </Text>
      </View>
    </Pressable>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1.2,
      borderColor: colors.primary,
      borderRadius: 20,
      padding: 10,
    },

    pressed: {
      opacity: 0.84,
      transform: [{ scale: 0.99 }],
    },

    image: {
      width: 64,
      height: 64,
      borderRadius: 16,
      marginRight: 12,
    },

    emptyImage: {
      width: 64,
      height: 64,
      borderRadius: 16,
      marginRight: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.border,
    },

    info: {
      flex: 1,
      justifyContent: 'center',
      marginRight: 10,
    },

    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },

    name: {
      flex: 1,
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
    },

    typeBadge: {
      borderRadius: 999,
      backgroundColor: colors.primarySoft,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },

    typeBadgeText: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '800',
    },

    scientificName: {
      color: colors.textSoft,
      fontSize: 10,
      fontStyle: 'italic',
      marginTop: 4,
    },
  });
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, StyleSheet, Text, View } from 'react-native';

import type { MyPlant } from '@/features/my-plants/types/myPlants.types';
import { obtenerImagenPortadaPlanta } from '@/features/my-plants/utils/obtenerImagenPortadaPlanta';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

type PlantMiniCardProps = {
  plant: MyPlant;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaMiniPlanta({ plant }: PlantMiniCardProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const coverImage = obtenerImagenPortadaPlanta(plant);

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.image} />
        ) : (
          <View style={styles.emptyImage}>
            <MaterialCommunityIcons name="leaf" size={28} color={colors.primaryDark} />
          </View>
        )}
      </View>

      <Text numberOfLines={1} style={styles.name}>
        {plant.nombre_personalizado || plant.planta.nombre_comun}
      </Text>

      <Text numberOfLines={1} style={styles.scientificName}>
        {plant.planta.nombre_cientifico ?? 'Sin nombre cientifico'}
      </Text>

      <Text style={styles.location}>{plant.ubicacion_nombre}</Text>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      width: 154,
      borderRadius: 24,
      backgroundColor: colors.surface,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },

    imageWrapper: {
      height: 118,
      borderRadius: 20,
      backgroundColor: colors.surfaceSoft,
      overflow: 'hidden',
      marginBottom: 12,
    },

    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },

    emptyImage: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    name: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '900',
    },

    scientificName: {
      color: colors.textSoft,
      fontSize: 11,
      fontStyle: 'italic',
      marginTop: 2,
    },

    location: {
      color: colors.accent,
      fontSize: 11,
      fontWeight: '800',
      marginTop: 8,
    },
  });
}

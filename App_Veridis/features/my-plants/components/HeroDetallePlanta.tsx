// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { obtenerImagenPortadaPlanta } from '../utils/obtenerImagenPortadaPlanta';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { MyPlant } from '../types/myPlants.types';

type PlantDetailHeroProps = {
  plant: MyPlant;
};

// Componente publico que renderiza una parte de la interfaz.
export function HeroDetallePlanta({ plant }: PlantDetailHeroProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
    const coverImage = obtenerImagenPortadaPlanta(plant);
  return (
    <View style={styles.container}>
       {coverImage ? (
        <Image
          source={{ uri: coverImage }}
          style={styles.image}
        />
      ) : (
        <View style={styles.emptyImage}>
          <MaterialCommunityIcons
            name="camera-outline"
            size={54}
            color={colors.textMuted}
          />
        </View>
      )}

      <View style={styles.topActions}>
        <Pressable style={styles.actionButton} onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={26}
            color={colors.primaryDark}
          />
        </Pressable>

        <Pressable style={styles.actionButton}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            color={colors.primaryDark}
          />
        </Pressable>
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    height: 285,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    overflow: 'hidden',
    backgroundColor: colors.surfaceSoft ?? '#F1F7EA',
    zIndex: 2,
    elevation: 1,
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

  topActions: {
    position: 'absolute',
    top: 52,
    left: 18,
    right: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 17,
    backgroundColor: 'rgba(255,253,247,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  });
}

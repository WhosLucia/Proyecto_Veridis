// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { CatalogPlant, PlantFamily } from '../types/catalog.types';
import { formatearTipoPlantaCatalogo } from '../utils/formateadoresCatalogo';

type Props = {
  plant: CatalogPlant;
  family?: PlantFamily;
};

// Componente publico que renderiza una parte de la interfaz.
export function HeroInfoPlanta({ plant, family }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      {plant.url_img_default ? (
        <Image source={{ uri: plant.url_img_default }} style={styles.image} />
      ) : (
        <View style={styles.emptyImage}>
          <MaterialCommunityIcons name="leaf" size={50} color={colors.primaryDark} />
        </View>
      )}

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="chevron-left" size={26} color={colors.primaryDark} />
      </Pressable>

      <View style={styles.infoCard}>
        <Text style={styles.name}>{plant.nombre_comun}</Text>

        <Text style={styles.scientificName}>
          {plant.nombre_cientifico ?? 'Sin nombre científico'}
        </Text>

        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{formatearTipoPlantaCatalogo(plant.tipo)}</Text>
          </View>

          {family ? (
            <View style={styles.chipSoft}>
              <Text style={styles.chipSoftText}>{family.nombre}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    minHeight: 330,
    backgroundColor: colors.surfaceSoft,
  },

  image: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
  },

  emptyImage: {
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 52,
    left: 18,
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: 'rgba(255,253,247,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoCard: {
    marginHorizontal: 20,
    marginTop: -42,
    backgroundColor: colors.surface,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },

  name: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '900',
  },

  scientificName: {
    color: colors.textSoft,
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 3,
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 13,
  },

  chip: {
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  chipText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
  },

  chipSoft: {
    borderRadius: 999,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  chipSoftText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '900',
  },
  });
}

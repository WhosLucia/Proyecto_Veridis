// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { MyPlant } from '../types/myPlants.types';
import { obtenerImagenPortadaPlanta } from '../utils/obtenerImagenPortadaPlanta';
import { formatearFrecuencia, formatearLuz, obtenerConfigSalud } from '../utils/formateadoresPlanta';

type MyPlantCardProps = {
  plant: MyPlant;
  onPress: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaMiPlanta({ plant, onPress }: MyPlantCardProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const health = obtenerConfigSalud(plant.estado_salud, colors);
  const coverImage = obtenerImagenPortadaPlanta(plant);

  const visibleName = plant.nombre_personalizado || plant.planta.nombre_comun;
  const scientificName = plant.planta.nombre_cientifico ?? plant.planta.nombre_comun;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}>
      <View style={styles.imageWrapper}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.image} />
        ) : (
          <View style={styles.emptyImage}>
            <MaterialCommunityIcons name="camera-outline" size={34} color={colors.textMuted} />
          </View>
        )}

        <View style={[styles.statusDot, { backgroundColor: health.color }]} />
      </View>

      <Text numberOfLines={1} style={styles.name}>
        {visibleName}
      </Text>

      <Text numberOfLines={1} style={styles.scientificName}>
        {scientificName}
      </Text>

      <View style={styles.locationRow}>
        <MaterialCommunityIcons name="map-marker-outline" size={13} color={colors.accent} />

        <Text numberOfLines={1} style={styles.location}>
          {plant.ubicacion_nombre}
        </Text>
      </View>

      <View style={[styles.statusBadge, { backgroundColor: health.background }]}>
        <Text style={[styles.statusText, { color: health.color }]}>{health.label}</Text>
      </View>

      <View style={styles.careGrid}>
        <PildoraMiniCuidado
          icon="white-balance-sunny"
          value={formatearLuz(plant.planta.luz_recomendada)}
        />
        <PildoraMiniCuidado icon="water-outline" value={formatearFrecuencia(plant.planta.frecuencia_riego)} />
        <PildoraMiniCuidado
          icon="flower-tulip-outline"
          value={formatearFrecuencia(plant.planta.frecuencia_abono)}
        />
        <PildoraMiniCuidado icon="heart-pulse" value={health.label} />
      </View>

      <View style={styles.separator} />
    </Pressable>
  );
}

type CareMiniPillProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value: string;
};

function PildoraMiniCuidado({ icon, value }: CareMiniPillProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.carePill}>
      <MaterialCommunityIcons name={icon} size={15} color={colors.primaryDark} />

      <Text numberOfLines={1} style={styles.careValue}>
        {value}
      </Text>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      width: '100%',
      minHeight: 245,
      backgroundColor: colors.surfaceSoft,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 10,
      marginBottom: 14,
    },

    cardPressed: {
      opacity: 0.84,
      transform: [{ scale: 0.98 }],
    },

    imageWrapper: {
      height: 155,
      borderRadius: 19,
      overflow: 'hidden',
      backgroundColor: colors.surfaceSoft,
      marginBottom: 10,
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

    statusDot: {
      position: 'absolute',
      top: 9,
      left: 9,
      width: 11,
      height: 11,
      borderRadius: 99,
      borderWidth: 2,
      borderColor: colors.whiteSoft,
    },

    name: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '900',
      marginHorizontal: 3,
    },

    scientificName: {
      color: colors.textSoft,
      fontSize: 10.5,
      fontStyle: 'italic',
      marginTop: 2,
      marginHorizontal: 3,
    },

    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
      marginHorizontal: 3,
    },

    location: {
      color: colors.accent,
      fontSize: 11,
      fontWeight: '900',
      marginLeft: 3,
    },

    statusBadge: {
      alignSelf: 'flex-start',
      borderRadius: 999,
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginTop: 7,
      marginHorizontal: 3,
    },

    statusText: {
      fontSize: 9.5,
      fontWeight: '900',
    },

    careGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 5,
      marginTop: 9,
    },

    carePill: {
      width: '48%',
      minHeight: 34,
      borderRadius: 12,
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 6,
    },

    careValue: {
      flex: 1,
      color: colors.text,
      fontSize: 9.6,
      fontWeight: '900',
      marginLeft: 4,
    },

    separator: {
      height: 1.5,
      backgroundColor: colors.border,
      marginVertical: 16,
    },
  });
}

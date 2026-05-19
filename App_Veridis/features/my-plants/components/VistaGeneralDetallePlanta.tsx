// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { MyPlant } from '../types/myPlants.types';
import {
  formatearTipoPlanta,
  obtenerConfigSalud,
} from '../utils/formateadoresPlanta';

type PlantDetailOverviewProps = {
  plant: MyPlant;
};

// Componente publico que renderiza una parte de la interfaz.
export function VistaGeneralDetallePlanta({ plant }: PlantDetailOverviewProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const visibleName =
    plant.nombre_personalizado || plant.planta.nombre_comun;

  const health = obtenerConfigSalud(plant.estado_salud, colors);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.name}>{visibleName}</Text>
          <Text style={styles.scientificName}>
            {plant.planta.nombre_cientifico ?? plant.planta.nombre_comun}
          </Text>
        </View>

        <View style={styles.infoIcon}>
          <MaterialCommunityIcons
            name="information-outline"
            size={22}
            color={colors.primaryDark}
          />
        </View>
      </View>

      <View style={styles.chipsRow}>
        <View style={styles.chip}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={13}
            color={colors.accent}
          />
          <Text style={styles.chipText}>{plant.ubicacion_nombre}</Text>
        </View>

        <View style={[styles.chip, { backgroundColor: health.background }]}>
          <Text style={[styles.chipText, { color: health.color }]}>
            {health.label}
          </Text>
        </View>

        <View style={styles.chip}>
          <Text style={styles.chipText}>
            {formatearTipoPlanta(plant.planta.tipo)}
          </Text>
        </View>
      </View>

      {plant.planta.descripcion ? (
        <Text style={styles.description}>{plant.planta.descripcion}</Text>
      ) : null}
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 18,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  titleBlock: {
    flex: 1,
    marginRight: 12,
  },

  name: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },

  scientificName: {
    color: colors.textSoft,
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 3,
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 13,
  },

  chip: {
    minHeight: 28,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  chipText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 3,
  },

  description: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 16,
  },
  });
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { MyPlant } from '../types/myPlants.types';
import { formatearFecha, obtenerConfigSalud } from '../utils/formateadoresPlanta';

type UserPlantInfoCardProps = {
  plant: MyPlant;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaInfoPlantaUsuario({ plant }: UserPlantInfoCardProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const health = obtenerConfigSalud(plant.estado_salud, colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de mi planta</Text>

      <FilaInfo
        icon="map-marker-outline"
        label="Ubicación"
        value={plant.ubicacion_nombre}
      />

      <FilaInfo
        icon="calendar-plus"
        label="Fecha de adquisición"
        value={formatearFecha(plant.fecha_adquisicion)}
      />

      <View style={styles.healthBox}>
        <View>
          <Text style={styles.healthLabel}>Estado de salud</Text>
          <Text style={[styles.healthValue, { color: health.color }]}>
            {health.label}
          </Text>
        </View>

        <View style={[styles.healthBadge, { backgroundColor: health.background }]}>
          <MaterialCommunityIcons
            name="heart-pulse"
            size={20}
            color={health.color}
          />
        </View>
      </View>

      <View style={styles.notesBox}>
        <Text style={styles.notesLabel}>Notas</Text>
        <Text style={styles.notesText}>
          {plant.notas || 'Esta planta todavía no tiene notas.'}
        </Text>
      </View>
    </View>
  );
}

type InfoRowProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
};

function FilaInfo({ icon, label, value }: InfoRowProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.primaryDark}
        />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginTop: 24,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },

  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  textBlock: {
    flex: 1,
  },

  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },

  value: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 2,
  },

  healthBox: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: colors.whiteSoft,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  healthLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },

  healthValue: {
    fontSize: 16,
    fontWeight: '900',
    marginTop: 3,
  },

  healthBadge: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notesBox: {
    marginTop: 14,
    borderRadius: 20,
    backgroundColor: colors.surfaceSoft,
    padding: 14,
  },

  notesLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 5,
  },

  notesText: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
  },
  });
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { CatalogPlant } from '../types/catalog.types';
import {
  formatearFrecuencia,
  formatearHumedad,
  formatearLuz,
  formatearToleranciaSol,
  formatearRangoTemperatura,
} from '../utils/formateadoresCatalogo';

type Props = {
  plant: CatalogPlant;
};

// Componente publico que renderiza una parte de la interfaz.
export function DetallesInfoPlanta({ plant }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      {plant.descripcion ? (
        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{plant.descripcion}</Text>
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Cuidados recomendados</Text>

      <View style={styles.grid}>
        <ElementoInfo
          icon="white-balance-sunny"
          label="Luz"
          value={formatearLuz(plant.luz_recomendada)}
        />

        <ElementoInfo
          icon="water-percent"
          label="Humedad"
          value={formatearHumedad(plant.humedad_recomendada)}
        />

        <ElementoInfo
          icon="thermometer"
          label="Temperatura"
          value={formatearRangoTemperatura(plant.temp_minima, plant.temp_maxima)}
        />

        <ElementoInfo
          icon="weather-sunny-alert"
          label="Sol"
          value={formatearToleranciaSol(plant.tolerancia_sol)}
        />

        <ElementoInfo
          icon="water-outline"
          label="Riego"
          value={formatearFrecuencia(plant.frecuencia_riego)}
        />

        <ElementoInfo
          icon="flower-tulip-outline"
          label="Abono"
          value={formatearFrecuencia(plant.frecuencia_abono)}
        />
      </View>
    </View>
  );
}

type InfoItemProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
};

function ElementoInfo({ icon, label, value }: InfoItemProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.item}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={icon} size={22} color={colors.primaryDark} />
      </View>

      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 130,
  },

  descriptionCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 22,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },

  description: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  item: {
    width: '48%',
    minHeight: 120,
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  itemLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
  },

  itemValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 4,
  },
  });
}

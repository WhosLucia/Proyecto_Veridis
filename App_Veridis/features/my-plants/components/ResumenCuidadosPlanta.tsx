// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { MyPlant } from '../types/myPlants.types';
import {
  formatearFrecuencia,
  formatearHumedad,
  formatearLuz,
  formatearRangoTemperatura,
} from '../utils/formateadoresPlanta';

type PlantCareSummaryProps = {
  plant: MyPlant;
};

// Componente publico que renderiza una parte de la interfaz.
export function ResumenCuidadosPlanta({ plant }: PlantCareSummaryProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  return (
    <View style={styles.container}>
      <CabeceraSeccion title="Cuidados" action="Ver historial" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <CirculoCuidado
          icon="water-outline"
          title="Riego"
          value={formatearFrecuencia(plant.planta.frecuencia_riego)}
          helper="Frecuencia recomendada"
          accent="green"
        />

        <CirculoCuidado
          icon="flower-tulip-outline"
          title="Abono"
          value={formatearFrecuencia(plant.planta.frecuencia_abono)}
          helper="Frecuencia recomendada"
          accent="orange"
        />

        <CirculoCuidado
          icon="white-balance-sunny"
          title="Luz"
          value={formatearLuz(plant.planta.luz_recomendada)}
          helper="Condición ideal"
          accent="orange"
        />

        <CirculoCuidado
          icon="water-percent"
          title="Humedad"
          value={formatearHumedad(plant.planta.humedad_recomendada)}
          helper="Ambiente ideal"
          accent="green"
        />

        <CirculoCuidado
          icon="thermometer"
          title="Temp."
          value={formatearRangoTemperatura(
            plant.planta.temp_minima,
            plant.planta.temp_maxima
          )}
          helper="Rango recomendado"
          accent="green"
        />
      </ScrollView>
    </View>
  );
}

type SectionHeaderProps = {
  title: string;
  action?: string;
};

function CabeceraSeccion({ title, action }: SectionHeaderProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.header}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

type CareCircleProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  value: string;
  helper: string;
  accent: 'green' | 'orange';
};

function CirculoCuidado({
  icon,
  title,
  value,
  helper,
  accent,
}: CareCircleProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const color = accent === 'green' ? colors.primary : colors.accent;
  const background = accent === 'green' ? colors.primarySoft : colors.accentSoft;

  return (
    <View style={styles.careCard}>
      <View style={[styles.circle, { borderColor: background }]}>
        <MaterialCommunityIcons name={icon} size={27} color={color} />
      </View>

      <Text style={styles.careTitle}>{title}</Text>
      <Text numberOfLines={1} style={styles.careValue}>
        {value}
      </Text>
      <Text numberOfLines={2} style={styles.careHelper}>
        {helper}
      </Text>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    marginTop: 24,
  },

  header: {
    paddingHorizontal: 22,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },

  sectionAction: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
  },

  content: {
    paddingHorizontal: 22,
    gap: 12,
  },

  careCard: {
    width: 118,
    minHeight: 158,
    borderRadius: 26,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 13,
    alignItems: 'center',
  },

  circle: {
    width: 62,
    height: 62,
    borderRadius: 999,
    borderWidth: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteSoft,
  },

  careTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 10,
  },

  careValue: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 3,
    maxWidth: 96,
  },

  careHelper: {
    color: colors.textSoft,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 14,
    marginTop: 4,
  },
  });
}

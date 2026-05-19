// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { MyPlant } from '../types/myPlants.types';
import { formatearFrecuencia } from '../utils/formateadoresPlanta';

type PlantRemindersSectionProps = {
  plant: MyPlant;
};

// Componente publico que renderiza una parte de la interfaz.
export function SeccionRecordatoriosPlanta({ plant }: PlantRemindersSectionProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const [wateringEnabled, setWateringEnabled] = useState(true);
  const [fertilizerEnabled, setFertilizerEnabled] = useState(false);
  const [healthCheckEnabled, setHealthCheckEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordatorios</Text>

      <FilaRecordatorio
        icon="water-outline"
        title="Riego"
        subtitle={formatearFrecuencia(plant.planta.frecuencia_riego)}
        value={wateringEnabled}
        onValueChange={setWateringEnabled}
      />

      <FilaRecordatorio
        icon="flower-tulip-outline"
        title="Abono"
        subtitle={formatearFrecuencia(plant.planta.frecuencia_abono)}
        value={fertilizerEnabled}
        onValueChange={setFertilizerEnabled}
      />

      <FilaRecordatorio
        icon="leaf-circle-outline"
        title="Revisión general"
        subtitle="Control visual de hojas y sustrato"
        value={healthCheckEnabled}
        onValueChange={setHealthCheckEnabled}
      />
    </View>
  );
}

type ReminderRowProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function FilaRecordatorio({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}: ReminderRowProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons
          name={icon}
          size={21}
          color={colors.primaryDark}
        />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? colors.primary : colors.whiteSoft}
        trackColor={{
          false: colors.border,
          true: colors.primarySoft,
        }}
      />
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
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  textBlock: {
    flex: 1,
  },

  rowTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },

  rowSubtitle: {
    color: colors.textSoft,
    fontSize: 12,
    marginTop: 2,
  },
  });
}

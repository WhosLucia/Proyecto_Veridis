// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type {
  HealthPriority,
  RecomendacionSintoma,
} from '../types/plantHealth.types';

type Props = {
  recommendation: RecomendacionSintoma;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaRecomendacionSalud({ recommendation }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const priority = obtenerConfigPrioridad(recommendation.prioridad, colors);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.priorityBadge, { backgroundColor: priority.bg }]}>
          <Text style={[styles.priorityText, { color: priority.color }]}>
            {priority.label}
          </Text>
        </View>

        <MaterialCommunityIcons
          name="leaf-circle-outline"
          size={22}
          color={colors.primaryDark}
        />
      </View>

      {recommendation.posible_causa ? (
        <>
          <Text style={styles.label}>Posible causa</Text>
          <Text style={styles.text}>{recommendation.posible_causa}</Text>
        </>
      ) : null}

      <Text style={styles.label}>Recomendación</Text>
      <Text style={styles.text}>{recommendation.recomendacion}</Text>

      {recommendation.observaciones ? (
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>{recommendation.observaciones}</Text>
        </View>
      ) : null}
    </View>
  );
}

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerConfigPrioridad(priority: HealthPriority, colors: ThemeColors) {
  switch (priority) {
    case 'urgente':
      return {
        label: 'Urgente',
        color: colors.danger,
        bg: colors.accentSoft,
      };
    case 'alta':
      return {
        label: 'Alta',
        color: colors.danger,
        bg: colors.accentSoft,
      };
    case 'media':
      return {
        label: 'Media',
        color: colors.accent,
        bg: colors.accentSoft,
      };
    default:
      return {
        label: 'Baja',
        color: colors.primary,
        bg: colors.primarySoft,
      };
  }
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  priorityBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: '900',
  },

  label: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 4,
  },

  text: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
  },

  noteBox: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 16,
    padding: 12,
    marginTop: 12,
  },

  noteText: {
    color: colors.textSoft,
    fontSize: 12,
    lineHeight: 17,
  },
  });
}

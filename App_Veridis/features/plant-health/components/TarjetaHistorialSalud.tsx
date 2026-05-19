// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Pressable, StyleSheet, Text } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { HealthConsultation } from '../types/plantHealth.types';

type Props = {
  consultation: HealthConsultation;
  onPress: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaHistorialSalud({ consultation, onPress }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const date = new Date(consultation.cuestionario.fecha).toLocaleDateString(
    'es-ES',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.date}>{date}</Text>

      <Text style={styles.title}>
        {consultation.sintomas_detectados.length} síntomas detectados
      </Text>

      <Text style={styles.subtitle}>
        Prioridad: {consultation.prioridad_calculada}
      </Text>
    </Pressable>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    marginBottom: 12,
  },

  date: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 5,
  },

  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },

  subtitle: {
    color: colors.textSoft,
    fontSize: 13,
    marginTop: 4,
  },
  });
}

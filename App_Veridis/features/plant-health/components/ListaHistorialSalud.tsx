// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { HealthConsultation } from '../types/plantHealth.types';
import { TarjetaHistorialSalud } from './TarjetaHistorialSalud';

type Props = {
  consultations: HealthConsultation[];
  onPressConsultation: (consultation: HealthConsultation) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function ListaHistorialSalud({  consultations,
  onPressConsultation,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  if (consultations.length === 0) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>Sin revisiones todavía</Text>
        <Text style={styles.emptyText}>
          Cuando completes una revisión de salud, aparecerá aquí para que puedas hacer seguimiento.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {consultations.map((consultation) => (
        <TarjetaHistorialSalud
          key={consultation.cuestionario.id_cuestionario}
          consultation={consultation}
          onPress={() => onPressConsultation(consultation)}
        />
      ))}
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },

  emptyText: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  });
}

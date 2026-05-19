// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { TarjetaResultadoSalud } from '@/features/plant-health/components/TarjetaResultadoSalud';
import { useSaludPlanta } from '@/features/plant-health/context/PlantHealthContext';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaDetalleConsulta() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { consultationId } = useLocalSearchParams<{
    id: string;
    consultationId: string;
  }>();

  const { obtenerConsultaPorId } = useSaludPlanta();

  const consultation = obtenerConsultaPorId(Number(consultationId));

  if (!consultation) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundTitle}>Consulta no encontrada</Text>
        <Text style={styles.backText} onPress={() => router.back()}>
          Volver atrás
        </Text>
      </View>
    );
  }

  const date = new Date(
    consultation.cuestionario.fecha
  ).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.eyebrow}>Consulta guardada</Text>
        <Text style={styles.title}>{date}</Text>

        {consultation.cuestionario.observaciones_usuario ? (
          <View style={styles.observationsCard}>
            <Text style={styles.observationsTitle}>
              Observaciones del usuario
            </Text>
            <Text style={styles.observationsText}>
              {consultation.cuestionario.observaciones_usuario}
            </Text>
          </View>
        ) : null}

        <TarjetaResultadoSalud consultation={consultation} />
      </ScrollView>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 22,
    paddingBottom: 130,
  },

  eyebrow: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 5,
  },

  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 18,
  },

  observationsCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 18,
  },

  observationsTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 6,
  },

  observationsText: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
  },

  centered: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  notFoundTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },

  backText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 18,
  },
  });
}

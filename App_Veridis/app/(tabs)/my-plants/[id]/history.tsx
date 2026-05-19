// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import { ListaHistorialSalud } from '@/features/plant-health/components/ListaHistorialSalud';
import { useSaludPlanta } from '@/features/plant-health/context/PlantHealthContext';
import type { HealthConsultation } from '@/features/plant-health/types/plantHealth.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaHistorialSaludPlanta() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { obtenerPlantaPorId } = useMisPlantas();
  const { obtenerConsultasPorIdPlanta } = useSaludPlanta();

  const plant = obtenerPlantaPorId(Number(id));

  const consultations = obtenerConsultasPorIdPlanta(Number(id));

  function handleOpenConsultation(consultation: HealthConsultation) {
    router.push({
      pathname: '/my-plants/[id]/consultation/[consultationId]',
      params: {
        id,
        consultationId: consultation.cuestionario.id_cuestionario.toString(),
      },
    });
  }

  if (!plant) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundTitle}>Planta no encontrada</Text>
        <Text style={styles.backText} onPress={() => router.back()}>
          Volver atrás
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>Historial de salud</Text>
        <Text style={styles.title}>{plant.nombre_personalizado || plant.planta.nombre_comun}</Text>

        <Text style={styles.subtitle}>Consulta las revisiones anteriores de esta planta.</Text>

        <Pressable
          style={styles.backToPlantButton}
          onPress={() =>
            router.replace({
              pathname: '/my-plants/[id]',
              params: { id },
            })
          }>
          <Text style={styles.backToPlantButtonText}>Volver a la planta</Text>
        </Pressable>

        <ListaHistorialSalud
          consultations={consultations}
          onPressConsultation={handleOpenConsultation}
        />
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
    paddingTop: 50,
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
  },

  subtitle: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 22,
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

  backToPlantButton: {
  height: 46,
  borderRadius: 17,
  backgroundColor: colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 18,
},

backToPlantButtonText: {
  color: colors.whiteSoft,
  fontSize: 14,
  fontWeight: '900',
},
  });
}

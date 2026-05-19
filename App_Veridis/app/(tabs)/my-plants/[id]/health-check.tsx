// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router, useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import { BarraProgresoSalud } from '@/features/plant-health/components/BarraProgresoSalud';
import { PasoPreguntaSalud } from '@/features/plant-health/components/PasoPreguntaSalud';
import { useSaludPlanta } from '@/features/plant-health/context/PlantHealthContext';
import { useCuestionarioSalud } from '@/features/plant-health/hooks/useCuestionarioSalud';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaRevisionSalud() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { obtenerPlantaPorId } = useMisPlantas();
  const { crearConsulta } = useSaludPlanta();

  const plant = obtenerPlantaPorId(Number(id));

  const questionnaire = useCuestionarioSalud();

  const isLastStep = questionnaire.step === questionnaire.totalSteps - 1;

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

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarSiguiente() {
    if (!plant) return;

    if (!isLastStep) {
      questionnaire.irSiguiente();
      return;
    }

    const consultation = await crearConsulta({
      plant,
      answers: questionnaire.answers,
      observaciones_usuario:
        questionnaire.observacionesUsuario.trim() || null,
    });

    router.replace({
      pathname: '/my-plants/[id]/health-result',
      params: {
        id: plant.id_usuario_planta.toString(),
        consultationId:
          consultation.cuestionario.id_cuestionario.toString(),
      },
    });
  }

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarAtras() {
    if (!plant) return;

    if (questionnaire.step > 0) {
      questionnaire.irAtras();
      return;
    }

    router.replace({
      pathname: '/my-plants/[id]',
      params: {
        id: plant.id_usuario_planta.toString(),
      },
    });
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.eyebrow}>Revisión de salud</Text>
        <Text style={styles.title}>
          {plant.nombre_personalizado || plant.planta.nombre_comun}
        </Text>

        <Text style={styles.subtitle}>
          Responde unas preguntas rápidas para detectar posibles síntomas.
        </Text>

        {questionnaire.loading ? <Text style={styles.subtitle}>Cargando sintomas...</Text> : null}
        {questionnaire.error ? <Text style={styles.errorText}>{questionnaire.error}</Text> : null}

        {questionnaire.currentQuestion ? (
          <>
            <BarraProgresoSalud
              step={questionnaire.step}
              totalSteps={questionnaire.totalSteps}
            />

            <PasoPreguntaSalud
              question={questionnaire.currentQuestion}
              selectedOptions={questionnaire.selectedOptions}
              onToggleOption={questionnaire.alternarOpcion}
            />
          </>
        ) : null}

        {isLastStep ? (
          <View style={styles.observationsBox}>
            <Text style={styles.observationsLabel}>
              Observaciones adicionales
            </Text>

            <TextInput
              value={questionnaire.observacionesUsuario}
              onChangeText={questionnaire.setObservacionesUsuario}
              placeholder="Ej: empezó hace dos días, después de cambiarla de sitio..."
              placeholderTextColor={colors.textMuted}
              style={styles.observationsInput}
              multiline
            />
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.secondaryButton}
          onPress={manejarAtras}
        >
          <Text style={styles.secondaryButtonText}>Atrás</Text>
        </Pressable>

        <Pressable
          style={[
            styles.primaryButton,
            !questionnaire.canGoNext && styles.disabledButton,
          ]}
          disabled={!questionnaire.canGoNext}
          onPress={manejarSiguiente}
        >
          <Text style={styles.primaryButtonText}>
            {isLastStep ? 'Ver resultado' : 'Siguiente'}
          </Text>
        </Pressable>
      </View>
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
    paddingBottom: 24,
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

  observationsBox: {
    marginTop: 20,
  },

  observationsLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 8,
  },

  observationsInput: {
    minHeight: 110,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    color: colors.text,
    fontSize: 14,
    textAlignVertical: 'top',
  },

  footer: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 110,
    backgroundColor: colors.background,
    flexDirection: 'row',
    gap: 10,
  },

  secondaryButton: {
    flex: 1,
    height: 50,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButton: {
    flex: 1.4,
    height: 50,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.45,
  },

  secondaryButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },

  primaryButtonText: {
    color: colors.whiteSoft,
    fontSize: 14,
    fontWeight: '900',
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

  errorText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
    marginBottom: 16,
  },
  });
}

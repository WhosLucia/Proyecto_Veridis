// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { HealthConsultation } from '../types/plantHealth.types';
import { TarjetaRecomendacionSalud } from './TarjetaRecomendacionSalud';

type Props = {
  consultation: HealthConsultation;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaResultadoSalud({ consultation }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const priority = obtenerEtiquetaPrioridad(consultation.prioridad_calculada, colors);

  return (
    <View>
      <View style={styles.summaryCard}>
        <Text style={styles.eyebrow}>Resultado de la revisión</Text>

        <Text style={[styles.priority, { color: priority.color }]}>
          Prioridad {priority.label}
        </Text>

        <Text style={styles.description}>
          Este resultado se basa en las respuestas del cuestionario. No es un diagnóstico exacto, sino una ayuda orientativa para cuidar mejor la planta.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Síntomas detectados</Text>

        {consultation.sintomas_detectados.length > 0 ? (
          consultation.sintomas_detectados.map((symptom) => (
            <View key={symptom.id_sintoma} style={styles.symptomCard}>
              <Text style={styles.symptomName}>{symptom.nombre}</Text>
              {symptom.descripcion ? (
                <Text style={styles.symptomDescription}>
                  {symptom.descripcion}
                </Text>
              ) : null}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            No se han detectado síntomas relevantes.
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recomendaciones</Text>

        {consultation.recomendaciones.length > 0 ? (
          consultation.recomendaciones.map((recommendation) => (
            <TarjetaRecomendacionSalud
              key={recommendation.id_recomendacion}
              recommendation={recommendation}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            No hay recomendaciones específicas para esta revisión.
          </Text>
        )}
      </View>
    </View>
  );
}

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerEtiquetaPrioridad(priority: string, colors: ThemeColors) {
  switch (priority) {
    case 'urgente':
      return {
        label: 'urgente',
        color: colors.danger,
      };
    case 'alta':
      return {
        label: 'alta',
        color: colors.danger,
      };
    case 'media':
      return {
        label: 'media',
        color: colors.accent,
      };
    default:
      return {
        label: 'baja',
        color: colors.primary,
      };
  }
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 18,
  },

  eyebrow: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 5,
  },

  priority: {
    fontSize: 24,
    fontWeight: '900',
  },

  description: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },

  symptomCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },

  symptomName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },

  symptomDescription: {
    color: colors.textSoft,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
  },

  emptyText: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
  },
  });
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import type { MyPlant } from '@/features/my-plants/types/myPlants.types';
import {
  crearCuestionario,
  crearRespuestaCuestionario,
} from '../services/cuestionarioService';
import { obtenerRecomendacionesPorSintoma, obtenerSintomas } from '../services/sintomaService';
import type {
  Cuestionario,
  HealthAnswerMap,
  HealthConsultation,
  HealthPriority,
  RespuestaCuestionario,
} from '../types/plantHealth.types';

type CreateConsultationParams = {
  plant: MyPlant;
  answers: HealthAnswerMap;
  observaciones_usuario: string | null;
};

type PlantHealthContextValue = {
  consultations: HealthConsultation[];
  crearConsulta: (params: CreateConsultationParams) => Promise<HealthConsultation>;
  obtenerConsultaPorId: (id_cuestionario: number) => HealthConsultation | undefined;
  obtenerConsultasPorIdPlanta: (id_usuario_planta: number) => HealthConsultation[];
};

// Contexto interno que guarda el contrato compartido de esta funcionalidad.
const PlantHealthContext = createContext<PlantHealthContextValue | null>(null);

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerPuntuacionPrioridad(priorities: HealthPriority[]): HealthPriority {
  if (priorities.includes('urgente')) return 'urgente';
  if (priorities.includes('alta')) return 'alta';
  if (priorities.includes('media')) return 'media';
  return 'baja';
}

// Componente publico que renderiza una parte de la interfaz.
export function ProveedorSaludPlanta({ children }: PropsWithChildren) {
  const [consultations, setConsultations] = useState<HealthConsultation[]>([]);

  const value = useMemo<PlantHealthContextValue>(() => {
    async function crearConsulta({
      plant,
      answers,
      observaciones_usuario,
    }: CreateConsultationParams) {
      const selectedSymptomIds = Object.values(answers)
        .flat()
        .map((value) => Number(value))
        .filter((value) => Number.isFinite(value));

      const allSymptoms = await obtenerSintomas();
      const sintomas_detectados = allSymptoms.filter((symptom) =>
        selectedSymptomIds.includes(symptom.id_sintoma)
      );
      const recomendaciones = (
        await Promise.all(
          selectedSymptomIds.map((idSintoma) => obtenerRecomendacionesPorSintoma(idSintoma))
        )
      ).flat();

      const cuestionario: Cuestionario = await crearCuestionario(
        plant.id_usuario_planta,
        observaciones_usuario
      );
      const respuestas: RespuestaCuestionario[] = await Promise.all(
        selectedSymptomIds.map((idSintoma) =>
          crearRespuestaCuestionario(cuestionario.id_cuestionario, idSintoma)
        )
      );

      const consultation: HealthConsultation = {
        cuestionario,
        respuestas,
        plant,
        sintomas_detectados,
        recomendaciones,
        prioridad_calculada: obtenerPuntuacionPrioridad(
          recomendaciones.map((recommendation) => recommendation.prioridad)
        ),
        answers,
      };

      setConsultations((prev) => [consultation, ...prev]);

      return consultation;
    }

    function obtenerConsultaPorId(id_cuestionario: number) {
      return consultations.find(
        (consultation) => consultation.cuestionario.id_cuestionario === id_cuestionario
      );
    }

    function obtenerConsultasPorIdPlanta(id_usuario_planta: number) {
      return consultations.filter(
        (consultation) => consultation.cuestionario.id_usuario_planta === id_usuario_planta
      );
    }

    return {
      consultations,
      crearConsulta,
      obtenerConsultaPorId,
      obtenerConsultasPorIdPlanta,
    };
  }, [consultations]);

  return <PlantHealthContext.Provider value={value}>{children}</PlantHealthContext.Provider>;
}

// Hook publico que devuelve estado y acciones listas para usar.
export function useSaludPlanta() {
  const context = useContext(PlantHealthContext);

  if (!context) {
    throw new Error('useSaludPlanta debe usarse dentro de ProveedorSaludPlanta');
  }

  return context;
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { MyPlant } from '@/features/my-plants/types/myPlants.types';

export type HealthPriority = 'baja' | 'media' | 'alta' | 'urgente';

export type Sintoma = {
  id_sintoma: number;
  nombre: string;
  descripcion: string | null;
};

export type RecomendacionSintoma = {
  id_recomendacion: number;
  id_sintoma: number;
  id_planta: number | null;
  posible_causa: string | null;
  recomendacion: string;
  observaciones: string | null;
  prioridad: HealthPriority;
};

export type Cuestionario = {
  id_cuestionario: number;
  id_usuario_planta: number;
  fecha: string;
  observaciones_usuario: string | null;
};

export type RespuestaCuestionario = {
  id_respuesta: number;
  id_cuestionario: number;
  id_sintoma: number;
};

export type HealthQuestionOption = {
  id: string;
  label: string;
  description?: string;
  symptomIds: number[];
  priorityWeight: number;
};

export type HealthQuestion = {
  id: string;
  title: string;
  description: string;
  multiple: boolean;
  options: HealthQuestionOption[];
};

export type HealthAnswerMap = Record<string, string[]>;

export type HealthConsultation = {
  cuestionario: Cuestionario;
  respuestas: RespuestaCuestionario[];
  plant: MyPlant;
  sintomas_detectados: Sintoma[];
  recomendaciones: RecomendacionSintoma[];
  prioridad_calculada: HealthPriority;
  answers: HealthAnswerMap;
};
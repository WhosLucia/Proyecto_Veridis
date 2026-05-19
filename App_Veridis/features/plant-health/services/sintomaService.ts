// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';
import type { RecomendacionSintoma, Sintoma } from '../types/plantHealth.types';

type ApiSintoma = {
  idSintoma: number;
  nombre: string;
  descripcion?: string | null;
};

type ApiRecomendacion = {
  idRecomendacion: number;
  sintoma?: ApiSintoma | null;
  planta?: {
    idPlanta: number;
  } | null;
  posibleCausa: string | null;
  recomendacion: string;
  observaciones: string | null;
  prioridad: RecomendacionSintoma['prioridad'];
};

// Adapta datos de la API al formato que espera la app.
function mapearSintoma(sintoma: ApiSintoma): Sintoma {
  return {
    id_sintoma: sintoma.idSintoma,
    nombre: sintoma.nombre,
    descripcion: sintoma.descripcion ?? null,
  };
}

// Adapta datos de la API al formato que espera la app.
function mapearRecomendacion(recomendacion: ApiRecomendacion): RecomendacionSintoma {
  return {
    id_recomendacion: recomendacion.idRecomendacion,
    id_sintoma: recomendacion.sintoma?.idSintoma ?? 0,
    id_planta: recomendacion.planta?.idPlanta ?? null,
    posible_causa: recomendacion.posibleCausa,
    recomendacion: recomendacion.recomendacion,
    observaciones: recomendacion.observaciones,
    prioridad: recomendacion.prioridad,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerSintomas() {
  const sintomas = await apiClient.get<ApiSintoma[]>(endpoints.sintomas.all);
  return sintomas.map(mapearSintoma);
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerSintomaPorId(idSintoma: number) {
  const sintoma = await apiClient.get<ApiSintoma>(endpoints.sintomas.byId(idSintoma));
  return mapearSintoma(sintoma);
}

// Funcion asincrona publica para leer o guardar datos.
export async function buscarSintomas(texto: string) {
  const sintomas = await apiClient.get<ApiSintoma[]>(endpoints.sintomas.buscar(texto));
  return sintomas.map(mapearSintoma);
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerRecomendacionesPorSintoma(idSintoma: number) {
  const recomendaciones = await apiClient.get<ApiRecomendacion[]>(
    endpoints.recomendaciones.bySintoma(idSintoma)
  );

  return recomendaciones.map(mapearRecomendacion);
}

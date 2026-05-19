// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';
import type { Cuestionario, RespuestaCuestionario } from '../types/plantHealth.types';

type ApiCuestionario = {
  idCuestionario: number;
  fecha: string;
  observacionesUsuario: string | null;
};

type ApiRespuestaCuestionario = {
  idRespuesta: number;
  idCuestionario?: number;
  idSintoma?: number;
};

// Adapta datos de la API al formato que espera la app.
function mapearCuestionario(cuestionario: ApiCuestionario, idUsuarioPlanta: number): Cuestionario {
  return {
    id_cuestionario: cuestionario.idCuestionario,
    id_usuario_planta: idUsuarioPlanta,
    fecha: cuestionario.fecha,
    observaciones_usuario: cuestionario.observacionesUsuario,
  };
}

// Adapta datos de la API al formato que espera la app.
function mapearRespuesta(
  respuesta: ApiRespuestaCuestionario,
  idCuestionario: number,
  idSintoma: number
): RespuestaCuestionario {
  return {
    id_respuesta: respuesta.idRespuesta,
    id_cuestionario: respuesta.idCuestionario ?? idCuestionario,
    id_sintoma: respuesta.idSintoma ?? idSintoma,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function crearCuestionario(
  idUsuarioPlanta: number,
  observacionesUsuario: string | null
) {
  const response = await apiClient.post<ApiCuestionario>(endpoints.cuestionarios.all, {
    idUsuarioPlanta,
    fecha: new Date().toISOString(),
    observacionesUsuario,
  });

  return mapearCuestionario(response, idUsuarioPlanta);
}

// Funcion asincrona publica para leer o guardar datos.
export async function crearRespuestaCuestionario(idCuestionario: number, idSintoma: number) {
  const response = await apiClient.post<ApiRespuestaCuestionario>(
    endpoints.respuestasCuestionario.all,
    {
      idCuestionario,
      idSintoma,
    }
  );

  return mapearRespuesta(response, idCuestionario, idSintoma);
}

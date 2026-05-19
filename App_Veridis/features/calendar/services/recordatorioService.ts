// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';

export type ApiRecordatorio = {
  idRecordatorio: number;
  tipo: string;
  frecuencia: number | null;
  activo: boolean;
  fechaProximo: string | null;
  notificationId: string | null;
};

export type CrearRecordatorioRequest = {
  idUsuarioPlanta: number;
  tipo: string;
  frecuencia: number | null;
  activo: boolean;
  fechaProximo: string;
  notificationId?: string | null;
};

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerRecordatoriosActivos() {
  return apiClient.get<ApiRecordatorio[]>(endpoints.recordatorios.activos);
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerRecordatoriosPlantaUsuario(idPlantaUsuario: number) {
  return apiClient.get<ApiRecordatorio[]>(
    endpoints.recordatorios.byPlantaUsuario(idPlantaUsuario)
  );
}

// Funcion asincrona publica para leer o guardar datos.
export async function crearRecordatorio(datos: CrearRecordatorioRequest) {
  return apiClient.post<ApiRecordatorio>(endpoints.recordatorios.all, datos);
}

// Funcion asincrona publica para leer o guardar datos.
export async function actualizarRecordatorio(
  idRecordatorio: number,
  datos: CrearRecordatorioRequest
) {
  return apiClient.put<ApiRecordatorio>(endpoints.recordatorios.byId(idRecordatorio), datos);
}

// Funcion asincrona publica para leer o guardar datos.
export async function eliminarRecordatorio(idRecordatorio: number) {
  return apiClient.delete<void>(endpoints.recordatorios.byId(idRecordatorio));
}

// Funcion asincrona publica para leer o guardar datos.
export async function actualizarNotificationIdRecordatorio(
  recordatorio: ApiRecordatorio,
  idUsuarioPlanta: number,
  notificationId: string
) {
  return apiClient.put<ApiRecordatorio>(endpoints.recordatorios.byId(recordatorio.idRecordatorio), {
    idUsuarioPlanta,
    tipo: recordatorio.tipo,
    frecuencia: recordatorio.frecuencia,
    activo: recordatorio.activo,
    fechaProximo: recordatorio.fechaProximo,
    notificationId,
  });
}

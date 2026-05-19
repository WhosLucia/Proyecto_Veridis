// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';

type CrearHistorialCuidadoRequest = {
  idUsuarioPlanta: number;
  tipoCuidado: string;
  fecha: string;
  notas?: string | null;
};

// Funcion asincrona publica para leer o guardar datos.
export async function crearHistorialCuidado(datos: CrearHistorialCuidadoRequest) {
  return apiClient.post(endpoints.historialCuidados.all, datos);
}

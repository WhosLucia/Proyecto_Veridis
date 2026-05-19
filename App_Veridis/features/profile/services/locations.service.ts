// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';
import type { Ubicacion, UbicacionFormValues } from '../types/profile.types';

type ApiUbicacion = {
  idUbicacion: number;
  usuario?: {
    idUsuario: number;
  };
  localizacion?: {
    idLocalizacion: number;
  } | null;
  nombre: string;
  descripcion: string | null;
  luz: Ubicacion['luz'];
  humedad: Ubicacion['humedad'];
  esExterior: boolean;
};

// Adapta datos de la API al formato que espera la app.
function mapearUbicacionApi(ubicacion: ApiUbicacion): Ubicacion {
  return {
    id_ubicacion: ubicacion.idUbicacion,
    id_usuario: ubicacion.usuario?.idUsuario ?? 0,
    id_localizacion: ubicacion.localizacion?.idLocalizacion ?? null,
    nombre: ubicacion.nombre,
    descripcion: ubicacion.descripcion,
    luz: ubicacion.luz,
    humedad: ubicacion.humedad,
    es_exterior: ubicacion.esExterior ? 1 : 0,
  };
}

// Adapta datos de la API al formato que espera la app.
function mapearValoresFormularioAApi(values: UbicacionFormValues, idUsuario: number) {
  return {
    usuario: {
      idUsuario,
    },
    localizacion: null,
    nombre: values.nombre.trim(),
    descripcion: values.descripcion.trim() || null,
    luz: values.luz,
    humedad: values.humedad,
    esExterior: values.es_exterior,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerUbicacionesUsuario(idUsuario: number): Promise<Ubicacion[]> {
  const response = await apiClient.get<ApiUbicacion[]>(endpoints.usuarios.ubicaciones(idUsuario));
  return response.map(mapearUbicacionApi);
}

// Funcion asincrona publica para leer o guardar datos.
export async function crearUbicacionUsuario(idUsuario: number, values: UbicacionFormValues) {
  const response = await apiClient.post<ApiUbicacion>(
    endpoints.ubicaciones.all,
    mapearValoresFormularioAApi(values, idUsuario)
  );

  return mapearUbicacionApi(response);
}

// Funcion asincrona publica para leer o guardar datos.
export async function actualizarUbicacionUsuario(
  idUsuario: number,
  idUbicacion: number,
  values: UbicacionFormValues
) {
  const response = await apiClient.put<ApiUbicacion>(
    endpoints.ubicaciones.byId(idUbicacion),
    mapearValoresFormularioAApi(values, idUsuario)
  );

  return mapearUbicacionApi(response);
}

// Funcion asincrona publica para leer o guardar datos.
export async function eliminarUbicacionUsuario(idUbicacion: number) {
  await apiClient.delete<void>(endpoints.ubicaciones.byId(idUbicacion));
  return { success: true };
}

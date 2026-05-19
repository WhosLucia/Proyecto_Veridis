// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';
import type { Localizacion } from '@/types/user.types';
import { mockLocalizaciones } from '../data/mockLocalizaciones';

function filtrarUbicaciones(localizaciones: Localizacion[], texto: string) {
  const normalizedText = texto.trim().toLowerCase();

  if (!normalizedText) {
    return localizaciones;
  }

  return localizaciones.filter((localizacion) => {
    const searchableText = [localizacion.ciudad, localizacion.provincia, localizacion.pais]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedText);
  });
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerLocalizaciones() {
  try {
    return await apiClient.get<Localizacion[]>(endpoints.localizaciones.all);
  } catch (error) {
    console.warn('No se han podido cargar las localizaciones desde la API:', error);
    return mockLocalizaciones;
  }
}

// Funcion asincrona publica para leer o guardar datos.
export async function buscarLocalizacionesPorTexto(texto: string) {
  const localizaciones = await obtenerLocalizaciones();
  return filtrarUbicaciones(localizaciones, texto);
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerLocalizacionPorId(idLocalizacion: number) {
  try {
    return await apiClient.get<Localizacion>(endpoints.localizaciones.byId(idLocalizacion));
  } catch {
    return (
      mockLocalizaciones.find((localizacion) => localizacion.idLocalizacion === idLocalizacion) ??
      null
    );
  }
}

// Funcion asincrona publica para leer o guardar datos.
export async function guardarLocalizacionPrincipalUsuario(
  idUsuario: number,
  idLocalizacion: number
) {
  return {
    idUsuario,
    idLocalizacion,
    success: true,
  };
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { API_BASE_URL } from '@/config/api';
import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';
import type { CatalogPlant, PlantFamily } from '@/features/catalog/types/catalog.types';

function aUrlAbsoluta(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('file://') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${API_BASE_URL}${url}`;
  return url;
}

type ApiFamilia = {
  idFamilia: number;
  nombre: string;
  descripcion: string | null;
};

type ApiPlanta = {
  idPlanta: number;
  familia?: ApiFamilia | null;
  nombreComun: string;
  nombreCientifico: string | null;
  tipo: string;
  descripcion: string | null;
  urlImgDefault: string | null;
  aptaExteriorTemp: boolean | null;
  luzRecomendada: string | null;
  humedadRecomendada: string | null;
  tempMinima: number | null;
  tempMaxima: number | null;
  toleranciaSol: string | null;
  frecuenciaRiego: number | null;
  frecuenciaAbono: number | null;
};

function normalizarOpcion(value: string | null | undefined, fallback: string) {
  return (value ?? fallback).toLowerCase().replaceAll(' ', '_');
}

// Adapta datos de la API al formato que espera la app.
function mapearFamilia(familia: ApiFamilia): PlantFamily {
  return {
    id_familia: familia.idFamilia,
    nombre: familia.nombre,
    descripcion: familia.descripcion ?? '',
  };
}

// Adapta datos de la API al formato que espera la app.
function mapearPlanta(planta: ApiPlanta): CatalogPlant {
  const familia = planta.familia ? mapearFamilia(planta.familia) : null;

  return {
    id_planta: planta.idPlanta,
    id_familia: familia?.id_familia ?? null,
    familia,
    nombre_comun: planta.nombreComun,
    nombre_cientifico: planta.nombreCientifico,
    tipo: normalizarOpcion(planta.tipo, 'interior') as CatalogPlant['tipo'],
    descripcion: planta.descripcion,
    url_img_default: aUrlAbsoluta(planta.urlImgDefault),
    apta_exterior_temp: planta.aptaExteriorTemp ? 1 : 0,
    luz_recomendada: normalizarOpcion(planta.luzRecomendada, 'luz_indirecta') as CatalogPlant['luz_recomendada'],
    humedad_recomendada: normalizarOpcion(planta.humedadRecomendada, 'media') as CatalogPlant['humedad_recomendada'],
    temp_minima: planta.tempMinima,
    temp_maxima: planta.tempMaxima,
    tolerancia_sol: normalizarOpcion(planta.toleranciaSol, 'media') as CatalogPlant['tolerancia_sol'],
    frecuencia_riego: planta.frecuenciaRiego,
    frecuencia_abono: planta.frecuenciaAbono,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerFamilias() {
  const familias = await apiClient.get<ApiFamilia[]>(endpoints.familias.all);
  return familias.map(mapearFamilia);
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerPlantas() {
  const plantas = await apiClient.get<ApiPlanta[]>(endpoints.plantas.all);
  return plantas.map(mapearPlanta);
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerPlantaPorId(idPlanta: number) {
  const planta = await apiClient.get<ApiPlanta>(endpoints.plantas.byId(idPlanta));
  return mapearPlanta(planta);
}

// Funcion asincrona publica para leer o guardar datos.
export async function buscarPlantas(texto: string) {
  const plantas = await apiClient.get<ApiPlanta[]>(endpoints.plantas.buscar(texto));
  return plantas.map(mapearPlanta);
}

// Funcion asincrona publica para leer o guardar datos.
export async function buscarFamilias(texto: string) {
  const familias = await apiClient.get<ApiFamilia[]>(endpoints.familias.buscar(texto));
  return familias.map(mapearFamilia);
}

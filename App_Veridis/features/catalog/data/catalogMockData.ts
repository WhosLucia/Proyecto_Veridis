// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { CatalogPlant, PlantFamily } from '../types/catalog.types';

// Constante publica usada por otras partes de la app.
export const plantFamiliesMock: PlantFamily[] = [
  {
    id_familia: 1,
    nombre: 'Araceas',
    descripcion: 'Familia de plantas tropicales muy comunes en interior.',
  },
  {
    id_familia: 2,
    nombre: 'Asparagaceas',
    descripcion: 'Familia resistente y de bajo mantenimiento.',
  },
  {
    id_familia: 3,
    nombre: 'Crasulaceas',
    descripcion: 'Familia de suculentas capaces de almacenar agua.',
  },
];

// Constante publica usada por otras partes de la app.
export const catalogPlantsMock: CatalogPlant[] = [
  {
    id_planta: 1,
    id_familia: 1,
    nombre_comun: 'Monstera',
    nombre_cientifico: 'Monstera deliciosa',
    tipo: 'interior',
    descripcion: 'Planta tropical de hojas grandes y perforadas.',
    url_img_default: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=900',
    apta_exterior_temp: 0,
    luz_recomendada: 'luz_indirecta',
    humedad_recomendada: 'alta',
    temp_minima: 18,
    temp_maxima: 27,
    tolerancia_sol: 'baja',
    frecuencia_riego: 7,
    frecuencia_abono: 30,
  },
  {
    id_planta: 2,
    id_familia: 1,
    nombre_comun: 'Pothos',
    nombre_cientifico: 'Epipremnum aureum',
    tipo: 'interior',
    descripcion: 'Planta colgante muy resistente.',
    url_img_default: 'https://images.unsplash.com/photo-1620127682229-33388276e540?w=900',
    apta_exterior_temp: 0,
    luz_recomendada: 'sombra_parcial',
    humedad_recomendada: 'media',
    temp_minima: 17,
    temp_maxima: 30,
    tolerancia_sol: 'media',
    frecuencia_riego: 6,
    frecuencia_abono: 35,
  },
  {
    id_planta: 3,
    id_familia: 2,
    nombre_comun: 'Sansevieria',
    nombre_cientifico: 'Dracaena trifasciata',
    tipo: 'interior',
    descripcion: 'Planta muy resistente, ideal para principiantes.',
    url_img_default: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b3f?w=900',
    apta_exterior_temp: 1,
    luz_recomendada: 'sombra_parcial',
    humedad_recomendada: 'baja',
    temp_minima: 15,
    temp_maxima: 30,
    tolerancia_sol: 'media',
    frecuencia_riego: 15,
    frecuencia_abono: 45,
  },
];

// Componente publico que renderiza una parte de la interfaz.
export function obtenerPlantaPorId(id: number) {
  return catalogPlantsMock.find((plant) => plant.id_planta === id);
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerFamiliaPorId(id: number | null) {
  if (id === null) return undefined;
  return plantFamiliesMock.find((family) => family.id_familia === id);
}

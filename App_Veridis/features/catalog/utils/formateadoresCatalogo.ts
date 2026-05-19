// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type {
  CatalogPlantType,
  HumedadRecomendada,
  LuzRecomendada,
  ToleranciaSol,
} from '../types/catalog.types';

// Componente publico que renderiza una parte de la interfaz.
export function formatearTipoPlantaCatalogo(type: CatalogPlantType) {
  switch (type) {
    case 'all':
      return 'Todos';
    case 'interior':
      return 'Interior';
    case 'exterior':
      return 'Exterior';
    case 'acuatica':
      return 'Acuaticas';
    case 'suculenta':
      return 'Suculentas';
    case 'aromatica':
      return 'Aromaticas';
    case 'frutal':
      return 'Frutales';
    case 'ornamental':
      return 'Ornamentales';
    case 'trepadora':
      return 'Trepadoras';
    case 'otro':
      return 'Otros';
    default:
      return type;
  }
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearLuz(value: LuzRecomendada) {
  switch (value) {
    case 'plena_sombra':
      return 'Plena sombra';
    case 'sombra_parcial':
      return 'Sombra parcial';
    case 'luz_indirecta':
      return 'Luz indirecta';
    case 'luz_directa':
      return 'Luz directa';
    default:
      return value;
  }
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearHumedad(value: HumedadRecomendada) {
  switch (value) {
    case 'baja':
      return 'Baja';
    case 'media':
      return 'Media';
    case 'alta':
      return 'Alta';
    default:
      return value;
  }
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearToleranciaSol(value: ToleranciaSol) {
  switch (value) {
    case 'baja':
      return 'Baja';
    case 'media':
      return 'Media';
    case 'alta':
      return 'Alta';
    default:
      return value;
  }
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearFrecuencia(days: number | null) {
  if (!days) return 'Sin datos';
  if (days === 1) return 'Cada dia';

  return `Cada ${days} dias`;
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearRangoTemperatura(min: number | null, max: number | null) {
  if (min !== null && max !== null) return `${min} C - ${max} C`;
  if (min !== null) return `Desde ${min} C`;
  if (max !== null) return `Hasta ${max} C`;

  return 'Sin datos';
}

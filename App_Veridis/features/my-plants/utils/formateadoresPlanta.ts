// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { ThemeColors } from '@/theme/themeColors';
import type {
  EstadoSalud,
  HumedadRecomendada,
  LuzRecomendada,
  PlantType,
  ToleranciaSol,
} from '../types/myPlants.types';

// Componente publico que renderiza una parte de la interfaz.
export function formatearTipoPlanta(type: PlantType) {
  switch (type) {
    case 'interior':
      return 'Interior';
    case 'exterior':
      return 'Exterior';
    case 'acuatica':
      return 'Acuática';
    case 'suculenta':
      return 'Suculenta';
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
export function formatearBooleano(value: 0 | 1) {
  return value === 1 ? 'Sí' : 'No';
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearRangoTemperatura(min: number | null, max: number | null) {
  if (min !== null && max !== null) {
    return `${min}ºC - ${max}ºC`;
  }

  if (min !== null) {
    return `Desde ${min}ºC`;
  }

  if (max !== null) {
    return `Hasta ${max}ºC`;
  }

  return 'Sin datos';
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearFrecuencia(days: number | null) {
  if (!days) return 'Sin frecuencia';

  if (days === 1) return 'Cada día';

  return `Cada ${days} días`;
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearFecha(date: string | null) {
  if (!date) return 'Sin fecha';

  const [year, month, day] = date.split('-').map(Number);
  const parsedDate = new Date(year, month - 1, day);

  return parsedDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerConfigSalud(status: EstadoSalud, colors: ThemeColors) {
  switch (status) {
    case 'excelente':
      return {
        label: 'Excelente',
        color: colors.primary,
        background: colors.primarySoft,
      };

    case 'bueno':
      return {
        label: 'Bueno',
        color: colors.primary,
        background: colors.primarySoft,
      };

    case 'regular':
      return {
        label: 'Regular',
        color: colors.accent,
        background: colors.accentSoft,
      };

    case 'malo':
      return {
        label: 'Malo',
        color: colors.danger,
        background: colors.accentSoft,
      };

    case 'critico':
      return {
        label: 'Crítico',
        color: colors.danger,
        background: colors.accentSoft,
      };

    default:
      return {
        label: 'Sin estado',
        color: colors.textSoft,
        background: colors.surfaceSoft,
      };
  }
}

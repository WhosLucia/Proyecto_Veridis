// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { ProfileIconName } from '../types/profile.types';

// Componente publico que renderiza una parte de la interfaz.
export function obtenerIconoUbicacion(nombre: string): ProfileIconName {
  const normalized = nombre.toLowerCase();

  if (
    normalized.includes('salon') ||
    normalized.includes('salÃ³n') ||
    normalized.includes('sala')
  ) {
    return 'sofa-outline';
  }

  if (normalized.includes('cocina')) {
    return 'silverware-fork-knife';
  }

  if (
    normalized.includes('dormitorio') ||
    normalized.includes('habitacion') ||
    normalized.includes('habitaciÃ³n')
  ) {
    return 'bed-outline';
  }

  if (
    normalized.includes('balcon') ||
    normalized.includes('balcÃ³n') ||
    normalized.includes('terraza') ||
    normalized.includes('patio') ||
    normalized.includes('jardin') ||
    normalized.includes('jardÃ­n')
  ) {
    return 'weather-sunny';
  }

  if (normalized.includes('bano') || normalized.includes('baÃ±o')) {
    return 'shower';
  }

  if (normalized.includes('oficina') || normalized.includes('estudio')) {
    return 'desk';
  }

  return 'home-outline';
}

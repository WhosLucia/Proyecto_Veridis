// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { HumidityLevel, LightLevel, Ubicacion } from '../types/profile.types';

// Componente publico que renderiza una parte de la interfaz.
export function formatearNivelLuz(value: LightLevel) {
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
export function formatearNivelHumedad(value: HumidityLevel) {
  switch (value) {
    case 'baja':
      return 'Humedad baja';
    case 'media':
      return 'Humedad media';
    case 'alta':
      return 'Humedad alta';
    default:
      return value;
  }
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearEntorno(value: 0 | 1) {
  return value === 1 ? 'Exterior' : 'Interior';
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerDescripcionEntorno(location: Ubicacion) {
  if (location.es_exterior === 1) {
    return 'Afectada por el clima';
  }

  return 'Ubicacion interior';
}

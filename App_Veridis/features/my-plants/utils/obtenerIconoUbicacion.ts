// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Componente publico que renderiza una parte de la interfaz.
export function obtenerIconoUbicacion(
  name: string
): keyof typeof MaterialCommunityIcons.glyphMap {
  const normalized = name.toLowerCase();

  if (normalized.includes('salón')) return 'sofa-outline';
  if (normalized.includes('dormitorio')) return 'bed-king-outline';
  if (normalized.includes('cocina')) return 'silverware-fork-knife';
  if (normalized.includes('entrada')) return 'door-open';

  if (normalized.includes('balcón') || normalized.includes('terraza')) {
    return 'weather-sunny';
  }

  return 'home-outline';
}
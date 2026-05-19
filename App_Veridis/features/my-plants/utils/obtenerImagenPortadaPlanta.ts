// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { API_BASE_URL } from '@/config/api';
import type { MyPlant } from '../types/myPlants.types';

function resolverUrlImagen(url: string | null | undefined) {
  if (!url) {
    return null;
  }

  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('file://') ||
    url.startsWith('content://') ||
    url.startsWith('data:')
  ) {
    return url;
  }

  // Rutas servidas por la API
  if (url.startsWith('/')) {
    return `${API_BASE_URL}${url}`;
  }

  return url;
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerImagenPortadaPlanta(plant: MyPlant) {
  return resolverUrlImagen(
    plant.fotos[0]?.url_imagen ?? plant.foto_portada_url ?? plant.planta.url_img_default
  );
}

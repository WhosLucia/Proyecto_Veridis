// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';
import { API_BASE_URL } from '@/config/api';
import type { FotoPlanta } from '../types/myPlants.types';

type ApiFotoPlanta = {
  idFoto: number;
  urlImagen: string;
  descripcion: string | null;
  fecha: string;
};

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerNombreArchivoImagen(uri: string) {
  const name = uri.split('/').pop();
  return name && name.includes('.') ? name : `planta-${Date.now()}.jpg`;
}

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerTipoMimeImagen(fileName: string) {
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith('.png')) {
    return 'image/png';
  }

  if (lowerName.endsWith('.webp')) {
    return 'image/webp';
  }

  return 'image/jpeg';
}

async function publicarFotoMultipart(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}${endpoints.fotos.all}`, {
    method: 'POST',
    body: formData,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.mensaje ?? data?.message ?? 'No se ha podido subir la foto.');
  }

  return data as ApiFotoPlanta;
}

function aUrlAbsoluta(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('file://') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${API_BASE_URL}${url}`;
  return url;
}

// Adapta datos de la API al formato que espera la app.
function mapearFotoPlanta(foto: ApiFotoPlanta): FotoPlanta {
  return {
    id_foto: foto.idFoto,
    id_usuario_planta: 0,
    url_imagen: aUrlAbsoluta(foto.urlImagen) ?? foto.urlImagen,
    fecha: foto.fecha,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerFotosPlantaUsuario(idPlantaUsuario: number) {
  const fotos = await apiClient.get<ApiFotoPlanta[]>(
    endpoints.fotos.byPlantaUsuario(idPlantaUsuario)
  );

  return fotos.map((foto) => ({
    ...mapearFotoPlanta(foto),
    id_usuario_planta: idPlantaUsuario,
  }));
}

// Funcion asincrona publica para leer o guardar datos.
export async function crearFotoPlanta(idPlantaUsuario: number, imageUri: string) {
  const fileName = obtenerNombreArchivoImagen(imageUri);
  const formData = new FormData();

  // Datos que espera la API
  formData.append('idUsuarioPlanta', String(idPlantaUsuario));
  formData.append('descripcion', 'Foto de portada');
  formData.append('imagen', {
    uri: imageUri,
    name: fileName,
    type: obtenerTipoMimeImagen(fileName),
  } as unknown as Blob);

  const foto = await publicarFotoMultipart(formData);

  return {
    ...mapearFotoPlanta(foto),
    id_usuario_planta: idPlantaUsuario,
  };
}

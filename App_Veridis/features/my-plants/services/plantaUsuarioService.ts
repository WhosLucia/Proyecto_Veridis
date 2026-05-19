// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { API_BASE_URL } from '@/config/api';
import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';

function aUrlAbsoluta(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('file://') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${API_BASE_URL}${url}`;
  return url;
}
import {
  actualizarNotificationIdRecordatorio,
  type ApiRecordatorio,
  crearRecordatorio,
} from '@/features/calendar/services/recordatorioService';
import { obtenerConfiguracionUsuario } from '@/features/settings/services/settingsService';
import { sumarDiasAFechaISO } from '@/features/calendar/utils/reminderSchedule';
import type {
  FotoPlanta,
  MyPlant,
  Planta,
  UsuarioPlantaFormValues,
} from '@/features/my-plants/types/myPlants.types';
import { crearFotoPlanta, obtenerFotosPlantaUsuario } from './fotoPlantaService';
import { crearHistorialCuidado } from './historialCuidadoService';

type ApiPlantaUsuario = {
  idUsuarioPlanta: number;
  usuario?: {
    idUsuario: number;
  };
  planta: {
    idPlanta: number;
    familia?: {
      idFamilia: number;
    } | null;
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
  ubicacion?: {
    idUbicacion: number;
    nombre: string;
  } | null;
  nombrePersonalizado: string | null;
  notas: string | null;
  fechaAdquisicion: string | null;
  estadoSalud: string | null;
};

function normalizarOpcion(value: string | null | undefined, fallback: string) {
  return (value ?? fallback).toLowerCase().replaceAll(' ', '_');
}

// Adapta datos de la API al formato que espera la app.
function mapearPlanta(planta: ApiPlantaUsuario['planta']): Planta {
  return {
    id_planta: planta.idPlanta,
    id_familia: planta.familia?.idFamilia ?? null,
    nombre_comun: planta.nombreComun,
    nombre_cientifico: planta.nombreCientifico,
    tipo: normalizarOpcion(planta.tipo, 'interior') as Planta['tipo'],
    descripcion: planta.descripcion,
    url_img_default: aUrlAbsoluta(planta.urlImgDefault),
    apta_exterior_temp: planta.aptaExteriorTemp ? 1 : 0,
    luz_recomendada: normalizarOpcion(planta.luzRecomendada, 'luz_indirecta') as Planta['luz_recomendada'],
    humedad_recomendada: normalizarOpcion(planta.humedadRecomendada, 'media') as Planta['humedad_recomendada'],
    temp_minima: planta.tempMinima,
    temp_maxima: planta.tempMaxima,
    tolerancia_sol: normalizarOpcion(planta.toleranciaSol, 'media') as Planta['tolerancia_sol'],
    frecuencia_riego: planta.frecuenciaRiego,
    frecuencia_abono: planta.frecuenciaAbono,
  };
}

// Adapta datos de la API al formato que espera la app.
function mapearPlantaUsuario(item: ApiPlantaUsuario, fotos: FotoPlanta[] = []): MyPlant {
  const planta = mapearPlanta(item.planta);

  return {
    id_usuario_planta: item.idUsuarioPlanta,
    id_usuario: item.usuario?.idUsuario ?? 0,
    id_planta: planta.id_planta,
    id_ubicacion: item.ubicacion?.idUbicacion ?? null,
    nombre_personalizado: item.nombrePersonalizado,
    notas: item.notas,
    fecha_adquisicion: item.fechaAdquisicion,
    estado_salud: normalizarOpcion(item.estadoSalud, 'bueno') as MyPlant['estado_salud'],
    planta,
    ubicacion_nombre: item.ubicacion?.nombre ?? 'Sin ubicación',
    fotos,
    foto_portada_url: fotos[0]?.url_imagen ?? planta.url_img_default,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerPlantasUsuario(idUsuario: number) {
  const plantas = await apiClient.get<ApiPlantaUsuario[]>(endpoints.usuarios.plantas(idUsuario));
  const fotosPorPlanta = await Promise.all(
    plantas.map(async (plantaUsuario) => {
      try {
        return await obtenerFotosPlantaUsuario(plantaUsuario.idUsuarioPlanta);
      } catch {
        return [];
      }
    })
  );

  return plantas.map((plantaUsuario, index) => mapearPlantaUsuario(plantaUsuario, fotosPorPlanta[index]));
}

// Adapta datos de la API al formato que espera la app.
function mapearValoresFormulario(values: UsuarioPlantaFormValues, idUsuario: number) {
  return {
    idUsuario,
    idPlanta: values.id_planta,
    idUbicacion: values.id_ubicacion ?? null,
    nombrePersonalizado: values.nombre_personalizado,
    notas: values.notas,
    fechaAdquisicion: values.fecha_adquisicion,
    estadoSalud: values.estado_salud,
  };
}

// Programa una accion del sistema relacionada con recordatorios.
async function programarNotificacionRecordatorio(
  idUsuario: number,
  plant: MyPlant,
  reminder: ApiRecordatorio
) {
  const config = await obtenerConfiguracionUsuario(idUsuario);

  if (!config.notificaciones || !reminder.fechaProximo) {
    return;
  }

  try {
    const { crearFechaNotificacion, programarNotificacionRecordatorio } = await import(
      '@/features/notifications/services/reminderNotifications.service'
    );
    const notificationId = await programarNotificacionRecordatorio({
      idRecordatorio: reminder.idRecordatorio,
      idUsuarioPlanta: plant.id_usuario_planta,
      type: reminder.tipo,
      date: crearFechaNotificacion(reminder.fechaProximo),
      frequencyInDays: reminder.frecuencia,
      plantName: plant.nombre_personalizado || plant.planta.nombre_comun,
      locationName: plant.ubicacion_nombre,
      scientificName: plant.planta.nombre_cientifico,
      humidity: plant.planta.humedad_recomendada,
      light: plant.planta.luz_recomendada,
      healthStatus: plant.estado_salud,
    });

    if (notificationId) {
      await actualizarNotificationIdRecordatorio(reminder, plant.id_usuario_planta, notificationId);
    }
  } catch {
    // La planta y el recordatorio quedan guardados aunque falle la notificacion local.
  }
}

async function crearDatosRiegoInicial(
  idUsuario: number,
  plant: MyPlant,
  values: UsuarioPlantaFormValues
) {
  if (!values.fecha_ultimo_riego || !plant.planta.frecuencia_riego) {
    return;
  }

  const nextWateringDate = sumarDiasAFechaISO(
    values.fecha_ultimo_riego,
    plant.planta.frecuencia_riego
  );

  await crearHistorialCuidado({
    idUsuarioPlanta: plant.id_usuario_planta,
    tipoCuidado: 'RIEGO',
    fecha: `${values.fecha_ultimo_riego}T10:00:00`,
    notas: 'Ultimo riego indicado al registrar la planta.',
  });

  const reminder = await crearRecordatorio({
    idUsuarioPlanta: plant.id_usuario_planta,
    tipo: 'RIEGO',
    frecuencia: plant.planta.frecuencia_riego,
    activo: true,
    fechaProximo: nextWateringDate,
    notificationId: null,
  });

  await programarNotificacionRecordatorio(idUsuario, plant, reminder);
}

async function crearRecordatorioAbonoInicial(
  idUsuario: number,
  plant: MyPlant,
  values: UsuarioPlantaFormValues
) {
  if (!plant.planta.frecuencia_abono) {
    return;
  }

  const baseDate = values.fecha_adquisicion || values.fecha_ultimo_riego || new Date().toISOString().split('T')[0];
  const nextFertilizingDate = sumarDiasAFechaISO(baseDate, plant.planta.frecuencia_abono);

  const reminder = await crearRecordatorio({
    idUsuarioPlanta: plant.id_usuario_planta,
    tipo: 'ABONO',
    frecuencia: plant.planta.frecuencia_abono,
    activo: true,
    fechaProximo: nextFertilizingDate,
    notificationId: null,
  });

  await programarNotificacionRecordatorio(idUsuario, plant, reminder);
}

async function crearDatosCuidadoInicial(
  idUsuario: number,
  plant: MyPlant,
  values: UsuarioPlantaFormValues
) {
  await Promise.all([
    crearDatosRiegoInicial(idUsuario, plant, values),
    crearRecordatorioAbonoInicial(idUsuario, plant, values),
  ]);
}

// Funcion asincrona publica para leer o guardar datos.
export async function crearPlantaUsuario(idUsuario: number, values: UsuarioPlantaFormValues) {
  const response = await apiClient.post<ApiPlantaUsuario>(
    endpoints.plantasUsuario.all,
    mapearValoresFormulario(values, idUsuario)
  );
  let createdPlant = mapearPlantaUsuario(response);

  if (!values.foto_portada_uri) {
    try {
      await crearDatosCuidadoInicial(idUsuario, createdPlant, values);
    } catch {
      // La planta queda registrada aunque falle algun recordatorio inicial.
    }
    return createdPlant;
  }

  // Foto de portada subida a la API
  const foto = await crearFotoPlanta(createdPlant.id_usuario_planta, values.foto_portada_uri);
  createdPlant = {
    ...createdPlant,
    fotos: [foto],
    foto_portada_url: foto.url_imagen,
  };

  try {
    await crearDatosCuidadoInicial(idUsuario, createdPlant, values);
  } catch {
    // La planta queda registrada aunque falle algun recordatorio inicial.
  }
  return createdPlant;
}

// Funcion asincrona publica para leer o guardar datos.
export async function actualizarPlantaUsuario(
  idUsuario: number,
  idPlantaUsuario: number,
  values: UsuarioPlantaFormValues
) {
  const response = await apiClient.put<ApiPlantaUsuario>(
    endpoints.plantasUsuario.byId(idPlantaUsuario),
    mapearValoresFormulario(values, idUsuario)
  );
  const updatedPlant = mapearPlantaUsuario(response);

  if (!values.foto_portada_uri) {
    return updatedPlant;
  }

  // Nueva foto de portada subida a la API
  const foto = await crearFotoPlanta(updatedPlant.id_usuario_planta, values.foto_portada_uri);
  return {
    ...updatedPlant,
    fotos: [foto],
    foto_portada_url: foto.url_imagen,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function eliminarPlantaUsuario(idPlantaUsuario: number) {
  await apiClient.delete<void>(endpoints.plantasUsuario.byId(idPlantaUsuario));
}

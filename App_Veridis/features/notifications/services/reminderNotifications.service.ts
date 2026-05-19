// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

import type { PlantTaskType } from '@/features/calendar/types/calendar.types';
import { normalizarTipoRecordatorio } from '@/features/calendar/utils/reminderSchedule';
import { obtenerMensajeNotificacion } from '../utils/notificationMessages';

type NotificationsModule = typeof import('expo-notifications');

type ReminderNotificationType =
  | 'riego'
  | 'abono'
  | 'revision'
  | 'pulverizar'
  | 'rotar_maceta';

type ScheduleReminderParams = {
  idRecordatorio: number;
  idUsuarioPlanta: number;
  type: string | PlantTaskType;
  date: Date;
  frequencyInDays?: number | null;
  plantName: string;
  locationName?: string | null;
  scientificName?: string | null;
  humidity?: 'baja' | 'media' | 'alta';
  light?: string | null;
  healthStatus?: string | null;
};

let notificationsModule: NotificationsModule | null = null;
let handlerConfigurado = false;

function esExpoGoAndroid() {
  return Platform.OS === 'android' && Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
}

async function obtenerModuloNotificaciones() {
  if (Platform.OS === 'web' || esExpoGoAndroid()) {
    return null;
  }

  notificationsModule ??= await import('expo-notifications');

  if (!handlerConfigurado) {
    notificationsModule.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    handlerConfigurado = true;
  }

  return notificationsModule;
}

function normalizarTipoNotificacion(type: string | PlantTaskType): ReminderNotificationType {
  const normalizedType = normalizarTipoRecordatorio(type);

  if (normalizedType === 'watering') return 'riego';
  if (normalizedType === 'fertilizing') return 'abono';
  if (normalizedType === 'spraying') return 'pulverizar';
  if (normalizedType === 'rotation') return 'rotar_maceta';
  return 'revision';
}

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerProximaFechaNotificacion(date: Date, frequencyInDays?: number | null) {
  const nextDate = new Date(date);
  const now = new Date();

  if (!frequencyInDays || frequencyInDays <= 0) {
    return nextDate > now ? nextDate : null;
  }

  while (nextDate <= now) {
    nextDate.setDate(nextDate.getDate() + frequencyInDays);
  }

  return nextDate;
}

// Funcion asincrona publica para leer o guardar datos.
export async function configurarCanalNotificacionesPlantas() {
  const Notifications = await obtenerModuloNotificaciones();

  if (!Notifications) {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('plant-reminders', {
      name: 'Recordatorios de plantas',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#2F6F45',
    });
  }

  const currentPermission = await Notifications.getPermissionsAsync();

  if (currentPermission.status === 'granted') {
    return true;
  }

  const requestedPermission = await Notifications.requestPermissionsAsync();

  return requestedPermission.status === 'granted';
}

// Funcion asincrona publica para leer o guardar datos.
export async function programarNotificacionRecordatorio({
  idRecordatorio,
  idUsuarioPlanta,
  type,
  date,
  frequencyInDays,
  plantName,
  locationName,
  scientificName,
  humidity,
  light,
  healthStatus,
}: ScheduleReminderParams) {
  const Notifications = await obtenerModuloNotificaciones();

  if (!Notifications) {
    return null;
  }

  const notificationDate = obtenerProximaFechaNotificacion(date, frequencyInDays);

  if (!notificationDate) {
    return null;
  }

  const hasPermission = await configurarCanalNotificacionesPlantas();

  if (!hasPermission) {
    return null;
  }

  const notificationType = normalizarTipoNotificacion(type);
  const message = obtenerMensajeNotificacion(notificationType, {
    plantName,
    locationName,
    scientificName,
    humidity,
    light,
    healthStatus,
  });

  return Notifications.scheduleNotificationAsync({
    content: {
      title: message.title,
      body: message.body,
      sound: 'default',
      data: {
        idRecordatorio,
        idUsuarioPlanta,
        type: notificationType,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: notificationDate,
      channelId: Platform.OS === 'android' ? 'plant-reminders' : undefined,
    },
  });
}

// Funcion asincrona publica para leer o guardar datos.
export async function cancelarNotificacionRecordatorio(notificationId: string | null | undefined) {
  if (!notificationId) return;

  const Notifications = await obtenerModuloNotificaciones();

  if (!Notifications) return;

  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

// Funcion asincrona publica para leer o guardar datos.
export async function cancelarTodasNotificacionesRecordatorio() {
  const Notifications = await obtenerModuloNotificaciones();

  if (!Notifications) return;

  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Componente publico que renderiza una parte de la interfaz.
export function crearFechaNotificacion(date: string, hour = 10) {
  const notificationDate = new Date(`${date}T${hour.toString().padStart(2, '0')}:00:00`);
  return notificationDate;
}

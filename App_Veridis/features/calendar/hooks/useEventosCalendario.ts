// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useEffect, useMemo, useState } from 'react';

import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import { obtenerConfiguracionUsuario } from '@/features/settings/services/settingsService';
import { useUsuario } from '@/features/user/context/UserContext';
import {
  actualizarRecordatorio,
  crearRecordatorio,
  eliminarRecordatorio,
  obtenerRecordatoriosPlantaUsuario,
} from '../services/recordatorioService';
import { PlantTask, PlantTaskDraft } from '../types/calendar.types';
import { obtenerHoyISO } from '../utils/calendar.utils';
import {
  sumarDiasAFechaISO,
  obtenerTipoRecordatorioApi,
  obtenerNotasRecordatorio,
  obtenerOcurrenciasRecordatorio,
  normalizarTipoRecordatorio,
} from '../utils/reminderSchedule';

const CALENDAR_LOOKBACK_DAYS = 30;
const CALENDAR_LOOKAHEAD_DAYS = 180;

// Hook publico que devuelve estado y acciones listas para usar.
export function useEventosCalendario() {
  const { plants } = useMisPlantas();
  const { user } = useUsuario();
  const [selectedDate, setSelectedDate] = useState<string>(obtenerHoyISO());
  const [tasks, setTasks] = useState<PlantTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarTareas() {
      if (plants.length === 0) {
        setTasks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fromDate = sumarDiasAFechaISO(obtenerHoyISO(), -CALENDAR_LOOKBACK_DAYS);
        const toDate = sumarDiasAFechaISO(obtenerHoyISO(), CALENDAR_LOOKAHEAD_DAYS);

        const remindersByPlant = await Promise.all(
          plants.map(async (plant) => ({
            plant,
            reminders: await obtenerRecordatoriosPlantaUsuario(plant.id_usuario_planta),
          }))
        );

        if (active) {
          const nextTasks = remindersByPlant.flatMap(({ plant, reminders }) =>
            reminders.flatMap((reminder) =>
              obtenerOcurrenciasRecordatorio(reminder, { fromDate, toDate }).map((date) => ({
                id: `${reminder.idRecordatorio}-${date}`,
                reminderId: reminder.idRecordatorio,
                idUsuarioPlanta: plant.id_usuario_planta,
                plantName: plant.nombre_personalizado || plant.planta.nombre_comun,
                room: plant.ubicacion_nombre,
                type: normalizarTipoRecordatorio(reminder.tipo),
                status: 'pending' as const,
                date,
                frequency: reminder.frecuencia,
                notificationId: reminder.notificationId,
                notes: obtenerNotasRecordatorio(reminder),
              }))
            )
          );

          setTasks(nextTasks);
        }
      } catch (requestError) {
        if (active) {
          setTasks([]);
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se han podido cargar los recordatorios.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    cargarTareas();

    return () => {
      active = false;
    };
  }, [plants]);

  const selectedTasks = useMemo(() => {
    return tasks.filter((task) => task.date === selectedDate);
  }, [tasks, selectedDate]);

  // Programa una accion del sistema relacionada con recordatorios.
  async function programarNotificacionTarea(task: PlantTaskDraft, reminderId: number) {
    if (!user) {
      return null;
    }

    const config = await obtenerConfiguracionUsuario(user.idUsuario);

    if (!config.notificaciones) {
      return null;
    }

    const plant = plants.find((currentPlant) => currentPlant.id_usuario_planta === task.idUsuarioPlanta);

    try {
      const { crearFechaNotificacion, programarNotificacionRecordatorio } = await import(
        '@/features/notifications/services/reminderNotifications.service'
      );

      return await programarNotificacionRecordatorio({
        idRecordatorio: reminderId,
        idUsuarioPlanta: task.idUsuarioPlanta,
        type: task.type,
        date: crearFechaNotificacion(task.date),
        frequencyInDays: task.frequency,
        plantName: task.plantName,
        locationName: task.room,
        scientificName: plant?.planta.nombre_cientifico,
        humidity: plant?.planta.humedad_recomendada,
        light: plant?.planta.luz_recomendada,
        healthStatus: plant?.estado_salud,
      });
    } catch {
      return null;
    }
  }

  async function cancelarNotificacionTarea(notificationId: string | null | undefined) {
    try {
      const { cancelarNotificacionRecordatorio } = await import(
        '@/features/notifications/services/reminderNotifications.service'
      );
      await cancelarNotificacionRecordatorio(notificationId);
    } catch {
      // El recordatorio de la API no depende de que la notificacion local pueda cancelarse.
    }
  }

  function alternarEstadoTarea(taskId: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'done' ? 'pending' : 'done',
            }
          : task
      )
    );
  }

  async function recargarTareas() {
    if (plants.length === 0) {
      setTasks([]);
      return;
    }

    const fromDate = sumarDiasAFechaISO(obtenerHoyISO(), -CALENDAR_LOOKBACK_DAYS);
    const toDate = sumarDiasAFechaISO(obtenerHoyISO(), CALENDAR_LOOKAHEAD_DAYS);
    const remindersByPlant = await Promise.all(
      plants.map(async (plant) => ({
        plant,
        reminders: await obtenerRecordatoriosPlantaUsuario(plant.id_usuario_planta),
      }))
    );

    const nextTasks = remindersByPlant.flatMap(({ plant, reminders }) =>
      reminders.flatMap((reminder) =>
        obtenerOcurrenciasRecordatorio(reminder, { fromDate, toDate }).map((date) => ({
          id: `${reminder.idRecordatorio}-${date}`,
          reminderId: reminder.idRecordatorio,
          idUsuarioPlanta: plant.id_usuario_planta,
          plantName: plant.nombre_personalizado || plant.planta.nombre_comun,
          room: plant.ubicacion_nombre,
          type: normalizarTipoRecordatorio(reminder.tipo),
          status: 'pending' as const,
          date,
          frequency: reminder.frecuencia,
          notificationId: reminder.notificationId,
          notes: obtenerNotasRecordatorio(reminder),
        }))
      )
    );

    setTasks(nextTasks);
  }

  async function agregarTarea(task: PlantTaskDraft) {
    setError(null);

    const reminder = await crearRecordatorio({
      idUsuarioPlanta: task.idUsuarioPlanta,
      tipo: obtenerTipoRecordatorioApi(task.type),
      frecuencia: task.frequency,
      activo: true,
      fechaProximo: task.date,
      notificationId: null,
    });

    const notificationId = await programarNotificacionTarea(task, reminder.idRecordatorio);

    if (notificationId) {
      await actualizarRecordatorio(reminder.idRecordatorio, {
        idUsuarioPlanta: task.idUsuarioPlanta,
        tipo: obtenerTipoRecordatorioApi(task.type),
        frecuencia: task.frequency,
        activo: true,
        fechaProximo: task.date,
        notificationId,
      });
    }

    await recargarTareas();
  }

  async function actualizarTarea(updatedTask: PlantTask) {
    setError(null);

    await cancelarNotificacionTarea(updatedTask.notificationId);
    const notificationId = await programarNotificacionTarea(updatedTask, updatedTask.reminderId);

    await actualizarRecordatorio(updatedTask.reminderId, {
      idUsuarioPlanta: updatedTask.idUsuarioPlanta,
      tipo: obtenerTipoRecordatorioApi(updatedTask.type),
      frecuencia: updatedTask.frequency,
      activo: true,
      fechaProximo: updatedTask.date,
      notificationId,
    });

    await recargarTareas();
  }

  async function eliminarTarea(taskId: string) {
    setError(null);
    const task = tasks.find((currentTask) => currentTask.id === taskId);

    if (!task) return;

    await cancelarNotificacionTarea(task.notificationId);
    await eliminarRecordatorio(task.reminderId);
    await recargarTareas();
  }

  return {
    selectedDate,
    setSelectedDate,
    tasks,
    selectedTasks,
    loading,
    error,
    alternarEstadoTarea,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
  };
}

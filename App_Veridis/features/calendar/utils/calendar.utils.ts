// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { ThemeColors } from '@/theme/themeColors';
import { PlantTask, PlantTaskType } from '../types/calendar.types';
import { obtenerEtiquetaTipoCuidado } from './reminderSchedule';

// Componente publico que renderiza una parte de la interfaz.
export function obtenerHoyISO() {
  return new Date().toISOString().split('T')[0];
}

// Componente publico que renderiza una parte de la interfaz.
export function formatearFechaLegible(date: string) {
  const parsed = new Date(date);
  return parsed.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerEtiquetaTipoTarea(type: PlantTaskType) {
  return obtenerEtiquetaTipoCuidado(type);
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerFechasMarcadasDeTareas(
  tasks: PlantTask[],
  selectedDate: string,
  colors: ThemeColors
) {
  const marks: Record<string, any> = {};

  tasks.forEach((task) => {
    if (!marks[task.date]) {
      marks[task.date] = {
        marked: true,
        dots: [{ key: task.id, color: colors.success }],
      };
    }
  });

  marks[selectedDate] = {
    ...(marks[selectedDate] || {}),
    selected: true,
    selectedColor: colors.primary,
    selectedTextColor: colors.textInverse,
  };

  return marks;
}

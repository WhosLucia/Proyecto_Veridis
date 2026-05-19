// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { ApiRecordatorio } from '../services/recordatorioService';
import type { PlantTaskType } from '../types/calendar.types';

// Constante publica usada por otras partes de la app.
export const CARE_TYPE_OPTIONS: PlantTaskType[] = [
  'watering',
  'fertilizing',
  'spraying',
  'rotation',
  'check',
];

// Componente publico que renderiza una parte de la interfaz.
export function normalizarFecha(date: string | null | undefined) {
  return date?.split('T')[0] ?? null;
}

// Componente publico que renderiza una parte de la interfaz.
export function sumarDiasAFechaISO(date: string, days: number) {
  const parsedDate = new Date(`${date}T00:00:00`);
  parsedDate.setDate(parsedDate.getDate() + days);
  return parsedDate.toISOString().split('T')[0];
}

// Componente publico que renderiza una parte de la interfaz.
export function normalizarTipoRecordatorio(type: string): PlantTaskType {
  const normalizedType = type.toLowerCase();

  if (normalizedType === 'riego' || normalizedType === 'watering') {
    return 'watering';
  }

  if (normalizedType === 'abono' || normalizedType === 'fertilizing') {
    return 'fertilizing';
  }

  if (normalizedType === 'pulverizar' || normalizedType === 'spraying') {
    return 'spraying';
  }

  if (normalizedType === 'rotacion' || normalizedType === 'rotation') {
    return 'rotation';
  }

  return 'check';
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerTipoRecordatorioApi(type: PlantTaskType) {
  if (type === 'watering') return 'RIEGO';
  if (type === 'fertilizing') return 'ABONO';
  if (type === 'spraying') return 'PULVERIZAR';
  if (type === 'rotation') return 'ROTACION';
  return 'REVISION';
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerEtiquetaTipoCuidado(type: PlantTaskType) {
  if (type === 'watering') return 'Riego';
  if (type === 'fertilizing') return 'Abono';
  if (type === 'spraying') return 'Pulverizar';
  if (type === 'rotation') return 'Rotación';
  return 'Revisión';
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerTituloRecordatorio(type: string) {
  const normalizedType = normalizarTipoRecordatorio(type);

  if (normalizedType === 'watering') {
    return 'Riego pendiente';
  }

  if (normalizedType === 'fertilizing') {
    return 'Abono pendiente';
  }

  if (normalizedType === 'spraying') {
    return 'Pulverizacion pendiente';
  }

  if (normalizedType === 'rotation') {
    return 'Rotacion pendiente';
  }

  return 'Revision pendiente';
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerNotasRecordatorio(reminder: ApiRecordatorio) {
  return reminder.frecuencia ? `Cada ${reminder.frecuencia} dias` : 'Recordatorio activo';
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerOcurrenciasRecordatorio(
  reminder: ApiRecordatorio,
  options: {
    fromDate: string;
    toDate: string;
  }
) {
  const firstDate = normalizarFecha(reminder.fechaProximo);

  if (!reminder.activo || !firstDate) {
    return [];
  }

  const frequency = reminder.frecuencia && reminder.frecuencia > 0 ? reminder.frecuencia : null;

  if (!frequency) {
    return firstDate >= options.fromDate && firstDate <= options.toDate ? [firstDate] : [];
  }

  const dates: string[] = [];
  let currentDate = firstDate;

  while (currentDate < options.fromDate) {
    currentDate = sumarDiasAFechaISO(currentDate, frequency);
  }

  while (currentDate <= options.toDate) {
    dates.push(currentDate);
    currentDate = sumarDiasAFechaISO(currentDate, frequency);
  }

  return dates;
}

// Componente publico que renderiza una parte de la interfaz.
export function recordatorioOcurreEnFecha(reminder: ApiRecordatorio, date: string) {
  return obtenerOcurrenciasRecordatorio(reminder, { fromDate: date, toDate: date }).length > 0;
}

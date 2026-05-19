// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export type PlantTaskType = 'watering' | 'fertilizing' | 'spraying' | 'rotation' | 'check';

export type PlantTaskStatus = 'pending' | 'done';

export type PlantTask = {
  id: string;
  reminderId: number;
  idUsuarioPlanta: number;
  plantName: string;
  room: string;
  type: PlantTaskType;
  status: PlantTaskStatus;
  date: string;
  frequency: number | null;
  notificationId?: string | null;
  notes?: string;
};

export type PlantTaskDraft = Omit<PlantTask, 'id' | 'reminderId'>;

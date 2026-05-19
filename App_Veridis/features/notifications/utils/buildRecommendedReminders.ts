// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

type ReminderType =
  | 'riego'
  | 'abono'
  | 'revision'
  | 'pulverizar'
  | 'limpiar_hojas'
  | 'rotar_maceta'
  | 'trasplante';

type PlantCareData = {
  id_usuario_planta: number;
  nombre: string;
  frecuencia_riego: number | null;
  frecuencia_abono: number | null;
  humedad_recomendada: 'baja' | 'media' | 'alta';
  luz_recomendada: string;
  tipo: string;
};

type RecommendedReminder = {
  tipo: ReminderType;
  frecuencia: number;
  motivo: string;
};

// Componente publico que renderiza una parte de la interfaz.
export function crearRecordatoriosRecomendados(
  plant: PlantCareData
): RecommendedReminder[] {
  const reminders: RecommendedReminder[] = [];

  if (plant.frecuencia_riego) {
    reminders.push({
      tipo: 'riego',
      frecuencia: plant.frecuencia_riego,
      motivo: `Riego recomendado cada ${plant.frecuencia_riego} días.`,
    });
  }

  if (plant.frecuencia_abono) {
    reminders.push({
      tipo: 'abono',
      frecuencia: plant.frecuencia_abono,
      motivo: `Abono recomendado cada ${plant.frecuencia_abono} días.`,
    });
  }

  reminders.push({
    tipo: 'revision',
    frecuencia: 7,
    motivo: 'Revisión semanal para detectar cambios en hojas, sustrato o plagas.',
  });

  if (plant.humedad_recomendada === 'alta') {
    reminders.push({
      tipo: 'pulverizar',
      frecuencia: 3,
      motivo: 'Esta planta agradece humedad ambiental alta.',
    });
  }

  if (plant.luz_recomendada === 'luz_indirecta') {
    reminders.push({
      tipo: 'rotar_maceta',
      frecuencia: 10,
      motivo: 'Rotar la maceta ayuda a repartir mejor la luz.',
    });
  }

  if (plant.tipo === 'interior') {
    reminders.push({
      tipo: 'limpiar_hojas',
      frecuencia: 14,
      motivo: 'Las plantas de interior acumulan polvo en las hojas.',
    });
  }

  return reminders;
}
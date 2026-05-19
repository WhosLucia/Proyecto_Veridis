// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

type ReminderType =
  | 'riego'
  | 'abono'
  | 'revision'
  | 'pulverizar'
  | 'limpiar_hojas'
  | 'rotar_maceta'
  | 'trasplante';

type PlantNotificationContext = {
  plantName: string;
  scientificName?: string | null;
  locationName?: string | null;
  humidity?: 'baja' | 'media' | 'alta';
  light?: string | null;
  healthStatus?: string | null;
};

const notificationMessages: Record<
  ReminderType,
  Array<(context: PlantNotificationContext) => { title: string; body: string }>
> = {
  riego: [
    ({ plantName }) => ({
      title: `Hora de regar ${plantName}`,
      body: 'Revisa el sustrato antes de regar para evitar exceso de humedad.',
    }),
    ({ plantName, locationName }) => ({
      title: `${plantName} puede necesitar agua`,
      body: locationName
        ? `Está en ${locationName}. Comprueba si la tierra está seca antes de regar.`
        : 'Comprueba si la tierra está seca antes de regar.',
    }),
    ({ plantName }) => ({
      title: `Cuidado rápido para ${plantName}`,
      body: 'Toca revisar el riego. Un minuto hoy puede evitar problemas mañana.',
    }),
  ],

  abono: [
    ({ plantName }) => ({
      title: `Toca abonar ${plantName}`,
      body: 'Añade abono solo si la planta está en buen estado y en época de crecimiento.',
    }),
    ({ plantName }) => ({
      title: `${plantName} necesita nutrientes`,
      body: 'Revisa si es buen momento para abonar según su frecuencia recomendada.',
    }),
    ({ plantName }) => ({
      title: `Refuerzo para ${plantName}`,
      body: 'Hoy toca revisar el abonado. Evita excederte con la cantidad.',
    }),
  ],

  revision: [
    ({ plantName }) => ({
      title: `Revisión de salud de ${plantName}`,
      body: 'Mira hojas, tallos y sustrato para detectar cambios a tiempo.',
    }),
    ({ plantName }) => ({
      title: `Comprueba cómo va ${plantName}`,
      body: 'Una revisión rápida puede ayudarte a detectar plagas, manchas o falta de agua.',
    }),
    ({ plantName }) => ({
      title: `${plantName} necesita una mirada`,
      body: 'Revisa su color, firmeza y humedad del sustrato.',
    }),
  ],

  pulverizar: [
    ({ plantName }) => ({
      title: `Pulveriza ${plantName}`,
      body: 'Aumenta la humedad ambiental si la planta lo necesita, evitando mojar flores sensibles.',
    }),
    ({ plantName }) => ({
      title: `${plantName} agradece humedad`,
      body: 'Pulveriza ligeramente si el ambiente está seco y hay buena ventilación.',
    }),
  ],

  limpiar_hojas: [
    ({ plantName }) => ({
      title: `Limpieza de hojas`,
      body: `Limpia suavemente las hojas de ${plantName} para que pueda captar mejor la luz.`,
    }),
    ({ plantName }) => ({
      title: `${plantName} necesita hojas limpias`,
      body: 'Retira polvo con un paño suave y evita productos agresivos.',
    }),
  ],

  rotar_maceta: [
    ({ plantName }) => ({
      title: `Gira un poco ${plantName}`,
      body: 'Rota la maceta para que reciba la luz de forma equilibrada.',
    }),
    ({ plantName }) => ({
      title: `Equilibra el crecimiento de ${plantName}`,
      body: 'Un pequeño giro ayuda a que no crezca inclinada hacia la luz.',
    }),
  ],

  trasplante: [
    ({ plantName }) => ({
      title: `Revisa si ${plantName} necesita trasplante`,
      body: 'Comprueba raíces, tamaño de la maceta y estado del sustrato.',
    }),
    ({ plantName }) => ({
      title: `Posible trasplante pendiente`,
      body: `${plantName} podría necesitar más espacio si las raíces están muy apretadas.`,
    }),
  ],
};

// Componente publico que renderiza una parte de la interfaz.
export function obtenerMensajeNotificacion(
  type: ReminderType,
  context: PlantNotificationContext
) {
  const messages = notificationMessages[type];

  const randomIndex = Math.floor(Math.random() * messages.length);

  return messages[randomIndex](context);
}
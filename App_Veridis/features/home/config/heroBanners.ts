// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { HeroBanner } from '../types/home.types';

// Constante publica usada por otras partes de la app.
export const heroBanners: HeroBanner[] = [
  {
    id: 'care',
    eyebrow: 'Cuidado inteligente',
    title: 'Tus plantas, cuidadas con calma',
    description: 'Organiza rutinas, revisa cuidados y manten cada planta en su mejor momento.',
    highlight: 'Rutina diaria',
  },
  {
    id: 'weather-info',
    eyebrow: 'Clima local',
    title: 'Recomendaciones segun tu entorno',
    description: 'La ubicacion ayuda a adaptar consejos de cuidado a la prevision meteorologica.',
    highlight: 'Tiempo real',
  },
];

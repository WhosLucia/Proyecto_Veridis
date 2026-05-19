// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { ProfileMenuItem } from '../types/profile.types';

// Constante publica usada por otras partes de la app.
export const profileMenuItems: ProfileMenuItem[] = [
  {
    id: 'settings',
    title: 'Ajustes',
    subtitle: 'Cuenta, seguridad y localizacion',
    icon: 'cog-outline',
    action: 'settings',
  },
  {
    id: 'help',
    title: 'Ayuda',
    subtitle: 'Soporte y preguntas frecuentes',
    icon: 'help-circle-outline',
    action: 'help',
  },
];

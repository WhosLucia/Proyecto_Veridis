// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useTemaApp } from '@/features/theme/context/AppThemeContext';

// Hook publico que devuelve estado y acciones listas para usar.
export function useColoresTema() {
  return useTemaApp().colors;
}

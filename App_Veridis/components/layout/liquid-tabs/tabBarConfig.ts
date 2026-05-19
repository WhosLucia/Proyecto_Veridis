// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type TabIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export type TabBarItemConfig = {
  icon: TabIconName;
  label: string;
};

// Componente publico que renderiza una parte de la interfaz.
export function obtenerConfigElementoPestana(routeName: string): TabBarItemConfig {
  const cleanName = routeName.replace('/index', '');

  switch (cleanName) {
    case 'catalog':
      return {
        icon: 'flower',
        label: 'Catálogo',
      };

    case 'my-plants':
      return {
        icon: 'leaf',
        label: 'Mis plantas',
      };

    case 'home':
      return {
        icon: 'home-variant',
        label: 'Inicio',
      };

    case 'calendar':
      return {
        icon: 'calendar-month',
        label: 'Calendario',
      };

    case 'profile':
      return {
        icon: 'account',
        label: 'Perfil',
      };

    default:
      return {
        icon: 'circle',
        label: cleanName,
      };
  }
}

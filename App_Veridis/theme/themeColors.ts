// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export const lightThemeColors= {
  background: '#F2F0E9',
  surface: '#FFFCF4',
  surfaceSoft: '#F1F7EA',

  primary: '#97B07F',
  primaryDark: '#40613A',
  primarySoft: '#D5E0BA',

  accent: '#E6983C',
  accentSoft: '#FFE6C9',

  text: '#1E2A22',
  textSoft: '#6E776F',
  textMuted: '#9AA19A',
  textInverse: '#3B4233',

  border: '#E5E0D4',

  whiteSoft: '#FFFDF7',
  blackSoft: '#07150F',

  success: '#2F6F45',
  warning: '#F29B45',
  danger: '#D96B5F',
} as const;

// Constante publica usada por otras partes de la app.
export const darkThemeColors = {
  background: '#1C1817',
  surface: '#4E5E46',
  surfaceSoft: '#3B4233',

  primary: '#BCD4C2',
  primaryDark: '#758561',
  primarySoft: '#243B2A',

  accent: '#F78539',
  accentSoft: '#4D321E',

  text: '#EBEAE1',
  textSoft: '#B8C5B7',
  textMuted: '#839083',
  textInverse: '#07150F',

  border: '#314333',

  whiteSoft: '#F7F5EC',
  blackSoft: '#07150F',

  success: '#7FD99A',
  warning: '#F3A85C',
  danger: '#EF7C6B',
} as const;

export type ThemeColors = Record<keyof typeof lightThemeColors, string>;
export type ThemeMode = 'light' | 'dark';

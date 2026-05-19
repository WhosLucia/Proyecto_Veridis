// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Stack } from 'expo-router';

import { useTemaApp } from '@/features/theme/context/AppThemeContext';

// Punto de entrada de esta pantalla o layout.
export default function DisenoInicio() {
  const { colors } = useTemaApp();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}

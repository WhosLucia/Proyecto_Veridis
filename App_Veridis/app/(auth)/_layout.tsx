// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

import { useUsuario } from '@/features/user/context/UserContext';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function DisenoAutenticacion() {
  const colors = useColoresTema();
  const { user, loadingUser } = useUsuario();

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    // Si ya hay sesion guardada, evitamos mostrar login o registro.
    if (!loadingUser && user) {
      router.replace('/home');
    }
  }, [loadingUser, user]);

  if (loadingUser || user) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 450,
        contentStyle: {
          backgroundColor: colors.background,
        },
        gestureEnabled: false,
      }}
    />
  );
}

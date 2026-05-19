// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

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
    // Cubrir con un View opaco en lugar de devolver null evita que pantallas
    // del stack auth queden visibles por debajo de otras tras el login.
    return <View style={{ flex: 1, backgroundColor: colors.background ?? '#F2F0E9' }} />;
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

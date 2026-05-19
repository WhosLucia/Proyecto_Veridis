// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { ProveedorTemaApp } from '@/features/theme/context/AppThemeContext';
import { ProveedorUsuario } from '@/features/user/context/UserContext';
import { useColoresTema } from '@/theme/useColoresTema';

SplashScreen.preventAutoHideAsync();

// Punto de entrada de esta pantalla o layout.
export default function DisenoRaiz() {
  const [fontsLoaded, fontError] = useFonts({
    Restaglick: require('../assets/fonts/Restaglick.ttf'),
  });

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ProveedorTemaApp>
      <ProveedorUsuario>
        <PilaRaiz />
      </ProveedorUsuario>
    </ProveedorTemaApp>
  );
}

function PilaRaiz() {
  const colors = useColoresTema();

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

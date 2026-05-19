// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Stack } from 'expo-router';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { ProveedorTemaApp } from '@/features/theme/context/AppThemeContext';
import { ProveedorUsuario } from '@/features/user/context/UserContext';
import { useColoresTema } from '@/theme/useColoresTema';

SplashScreen.preventAutoHideAsync();

// Punto de entrada de esta pantalla o layout.
export default function DisenoRaiz() {
  const [appReady, setAppReady] = useState(false);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    async function prepararApp() {
      try {
        await Font.loadAsync({
          Restaglick: require('../assets/fonts/Restaglick.ttf'),
        });
        console.log('[Veridis] Fuente Restaglick cargada correctamente');
      } catch (error) {
        console.warn('[Veridis] Error cargando Restaglick:', error);
      } finally {
        setAppReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepararApp();
  }, []);

  if (!appReady) {
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

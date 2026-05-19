// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router, Tabs } from 'expo-router';
import { useEffect } from 'react';

import { BarraPestanasCristalLiquido } from '@/components/layout/liquid-tabs/BarraPestanasCristalLiquido';
import { ProveedorMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import { useUsuario } from '@/features/user/context/UserContext';

// Punto de entrada de esta pantalla o layout.
export default function DisenoPestanas() {
  const { user, loadingUser } = useUsuario();

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    if (!loadingUser && !user) {
      router.replace('/login');
    }
  }, [loadingUser, user]);

  if (loadingUser || !user) {
    return null;
  }

  return (
    <ProveedorMisPlantas>
      <Tabs
        tabBar={(props) => <BarraPestanasCristalLiquido {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen name="catalog" options={{ title: 'Catálogo' }} />
        <Tabs.Screen
          name="my-plants"
          options={{
            title: 'Mis plantas',
            popToTopOnBlur: true,
          }}
        />
        <Tabs.Screen name="home" options={{ title: 'Inicio' }} />
        <Tabs.Screen name="calendar" options={{ title: 'Calendario' }} />
        <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
      </Tabs>
    </ProveedorMisPlantas>
  );
}

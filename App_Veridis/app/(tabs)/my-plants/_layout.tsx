// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Stack, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import { ProveedorSaludPlanta } from '@/features/plant-health/context/PlantHealthContext';
import { useTemaApp } from '@/features/theme/context/AppThemeContext';

// Punto de entrada de esta pantalla o layout.
export default function DisenoMisPlantas() {
  return (
    <ProveedorSaludPlanta>
      <PilaMisPlantas />
    </ProveedorSaludPlanta>
  );
}

function PilaMisPlantas() {
  const { colors } = useTemaApp();
  const { reloadMyPlantsData } = useMisPlantas();

  useFocusEffect(
    useCallback(() => {
      reloadMyPlantsData();
    }, [reloadMyPlantsData])
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 200,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}

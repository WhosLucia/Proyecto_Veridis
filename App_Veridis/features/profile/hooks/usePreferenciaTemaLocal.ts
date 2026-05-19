// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export type LocalThemePreference = 'system' | 'light' | 'dark';

const STORAGE_KEY = '@veridis/theme_preference';

// Hook publico que devuelve estado y acciones listas para usar.
export function usePreferenciaTemaLocal() {
  const [themePreference, setThemePreference] =
    useState<LocalThemePreference>('system');

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    cargarPreferenciaTema();
  }, []);

  // Carga datos iniciales y actualiza el estado local.
  async function cargarPreferenciaTema() {
    try {
      const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

      if (
        storedValue === 'system' ||
        storedValue === 'light' ||
        storedValue === 'dark'
      ) {
        setThemePreference(storedValue);
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  }

  async function actualizarPreferenciaTema(value: LocalThemePreference) {
    try {
      setThemePreference(value);
      await AsyncStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  }

  return {
    themePreference,
    actualizarPreferenciaTema,
  };
}
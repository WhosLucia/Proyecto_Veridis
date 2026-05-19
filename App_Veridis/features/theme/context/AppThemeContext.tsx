// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { darkThemeColors, lightThemeColors, ThemeColors } from '@/theme/themeColors';

export type ThemeMode = 'light' | 'dark';

type AppThemeContextValue = {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  colors: ThemeColors;
  themeColors: ThemeColors;
  toggleDarkMode: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

const STORAGE_KEY = '@veridis/theme_mode';
// Contexto interno que guarda el contrato compartido de esta funcionalidad.
const AppThemeContext = createContext<AppThemeContextValue | null>(null);

// Componente publico que renderiza una parte de la interfaz.
export function ProveedorTemaApp({ children }: PropsWithChildren) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    async function cargarModoTema() {
      try {
        const storedThemeMode = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedThemeMode === 'light' || storedThemeMode === 'dark') {
          setThemeMode(storedThemeMode);
        }
      } catch (error) {
        console.log('Error loading theme mode:', error);
      }
    }

    cargarModoTema();
  }, []);

  const updateThemeMode = useCallback(async (nextThemeMode: ThemeMode) => {
    setThemeMode(nextThemeMode);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, nextThemeMode);
    } catch (error) {
      console.log('Error saving theme mode:', error);
    }
  }, []);

  const toggleDarkMode = useCallback(async () => {
    const nextThemeMode = themeMode === 'dark' ? 'light' : 'dark';

    updateThemeMode(nextThemeMode);
  }, [themeMode, updateThemeMode]);

  const value = useMemo<AppThemeContextValue>(
    () => ({
      themeMode,
      isDarkMode: themeMode === 'dark',
      colors: themeMode === 'dark' ? darkThemeColors : lightThemeColors,
      themeColors: themeMode === 'dark' ? darkThemeColors : lightThemeColors,
      toggleDarkMode,
      setThemeMode: updateThemeMode,
    }),
    [themeMode, toggleDarkMode, updateThemeMode]
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

// Hook publico que devuelve estado y acciones listas para usar.
export function useTemaApp() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error('useTemaApp debe usarse dentro de ProveedorTemaApp');
  }

  return context;
}

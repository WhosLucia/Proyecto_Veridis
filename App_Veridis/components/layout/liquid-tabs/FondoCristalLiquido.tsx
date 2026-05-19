// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTemaApp } from '@/features/theme/context/AppThemeContext';

// Componente publico que renderiza una parte de la interfaz.
export function FondoCristalLiquido({ children }: PropsWithChildren) {
  const { isDarkMode } = useTemaApp();

  return (
    <BlurView
      intensity={isDarkMode ? 28 : 35}
      tint={isDarkMode ? 'dark' : 'light'}
      style={styles.blurLayer}>
      <LinearGradient
        colors={
          isDarkMode
            ? ['rgba(24,36,27,0.86)', 'rgba(16,24,18,0.72)', 'rgba(32,49,38,0.78)']
            : ['rgba(255,255,255,0.58)', 'rgba(255,255,255,0.24)', 'rgba(255,255,255,0.38)']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          styles.glassBorder,
          {
            borderColor: isDarkMode ? 'rgba(127,203,138,0.22)' : 'rgba(255,255,255,0.58)',
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
          },
        ]}
      />

      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurLayer: {
    flex: 1,
    borderRadius: 34,
    overflow: 'hidden',
  },

  glassBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 34,
    borderWidth: 1,
  },
});

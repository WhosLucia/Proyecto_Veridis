// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Animated, StyleSheet } from 'react-native';

import { useTemaApp } from '@/features/theme/context/AppThemeContext';

type LiquidGlassIndicatorProps = {
  width: number;
  translateX: Animated.Value;
  scaleX: Animated.Value;
};

// Componente publico que renderiza una parte de la interfaz.
export function IndicadorCristalLiquido({ width, translateX, scaleX }: LiquidGlassIndicatorProps) {
  const { isDarkMode } = useTemaApp();

  return (
    <Animated.View
      style={[
        styles.indicator,
        {
          width,
          backgroundColor: isDarkMode ? 'rgba(127,203,138,0.20)' : 'rgba(255,255,255,0.42)',
          borderColor: isDarkMode ? 'rgba(127,203,138,0.42)' : 'rgba(255,255,255,0.72)',
          transform: [{ translateX }, { scaleX }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: 7,
    bottom: 7,
    left: 0,
    borderRadius: 999,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});

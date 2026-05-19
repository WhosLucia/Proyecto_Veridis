// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useTemaApp } from '@/features/theme/context/AppThemeContext';
import type { TabIconName } from './tabBarConfig';

type LiquidGlassTabItemProps = {
  icon: TabIconName;
  label: string;
  focused: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function ElementoPestanaCristalLiquido({
  icon,
  label,
  focused,
  onPress,
  onLongPress,
}: LiquidGlassTabItemProps) {
  const { colors, isDarkMode } = useTemaApp();
  const pressScale = useRef(new Animated.Value(1)).current;
  const activeProgress = useRef(new Animated.Value(focused ? 1 : 0)).current;

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    Animated.spring(activeProgress, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      speed: 22,
      bounciness: 8,
    }).start();
  }, [focused, activeProgress]);

  function animarEscalaPulsacion(value: number) {
    Animated.spring(pressScale, {
      toValue: value,
      useNativeDriver: true,
      speed: 30,
      bounciness: 7,
    }).start();
  }

  const labelOpacity = activeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.62, 1],
  });

  const translateY = activeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [2, -1],
  });

  const iconColor = focused
    ? colors.primaryDark
    : isDarkMode
      ? 'rgba(241,245,239,0.52)'
      : 'rgba(30,42,34,0.48)';
  const iconSize = focused ? 24 : 22;

  return (
    <Pressable
      style={styles.tabItem}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => animarEscalaPulsacion(1.05)}
      onPressOut={() => animarEscalaPulsacion(1)}
      delayLongPress={260}>
      <Animated.View
        style={[
          styles.tabContent,
          {
            transform: [{ scale: pressScale }, { translateY }],
          },
        ]}>
        <MaterialCommunityIcons name={icon} size={iconSize} color={iconColor} />

        <Animated.Text
          numberOfLines={1}
          style={[
            styles.tabLabel,
            {
              opacity: labelOpacity,
              color: iconColor,
            },
          ]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    borderRadius: 999,
  },

  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabLabel: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '800',
  },
});

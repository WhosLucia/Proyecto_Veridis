// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Platform, StyleSheet, View } from 'react-native';

import { FondoCristalLiquido } from './FondoCristalLiquido';
import { IndicadorCristalLiquido } from './IndicadorCristalLiquido';
import { ElementoPestanaCristalLiquido } from './ElementoPestanaCristalLiquido';
import { obtenerConfigElementoPestana } from './tabBarConfig';
import { useTemaApp } from '@/features/theme/context/AppThemeContext';

const TAB_BAR_HEIGHT = 74;
const TAB_BAR_HORIZONTAL_MARGIN = 20;
const TAB_BAR_PADDING = 7;

// Componente publico que renderiza una parte de la interfaz.
export function BarraPestanasCristalLiquido({ state, descriptors, navigation }: BottomTabBarProps) {
  const { isDarkMode } = useTemaApp();
  const [barWidth, setBarWidth] = useState<number>(0);

  const indicatorTranslateX = useRef(new Animated.Value(0)).current;
  const indicatorScaleX = useRef(new Animated.Value(1)).current;

  const routes = state.routes;
  const tabCount = routes.length;

  const innerWidth = barWidth - TAB_BAR_PADDING * 2;
  const tabWidth = innerWidth > 0 ? innerWidth / tabCount : 0;

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    if (!tabWidth) return;

    Animated.parallel([
      Animated.spring(indicatorTranslateX, {
        toValue: TAB_BAR_PADDING + state.index * tabWidth,
        useNativeDriver: true,
        speed: 22,
        bounciness: 8,
      }),

      Animated.sequence([
        Animated.spring(indicatorScaleX, {
          toValue: 1.12,
          useNativeDriver: true,
          speed: 28,
          bounciness: 5,
        }),
        Animated.spring(indicatorScaleX, {
          toValue: 1,
          useNativeDriver: true,
          speed: 24,
          bounciness: 7,
        }),
      ]),
    ]).start();
  }, [state.index, tabWidth, indicatorTranslateX, indicatorScaleX]);

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarDiseno(event: LayoutChangeEvent) {
    setBarWidth(event.nativeEvent.layout.width);
  }

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.shadowContainer}>
        <View
          style={[
            styles.glassContainer,
            {
              backgroundColor: isDarkMode ? 'rgba(16,24,18,0.72)' : 'rgba(255,255,255,0.20)',
            },
          ]}
          onLayout={manejarDiseno}>
          <FondoCristalLiquido>
            {tabWidth > 0 ? (
              <IndicadorCristalLiquido
                width={tabWidth - 6}
                translateX={indicatorTranslateX}
                scaleX={indicatorScaleX}
              />
            ) : null}

            <View style={styles.tabsRow}>
              {routes.map((route, index) => {
                const focused = state.index === index;
                const options = descriptors[route.key]?.options;
                const config = obtenerConfigElementoPestana(route.name);

                function onPress() {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                }

                function onLongPress() {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  });
                }

                return (
                  <ElementoPestanaCristalLiquido
                    key={route.key}
                    icon={config.icon}
                    label={options.title?.toString() ?? config.label}
                    focused={focused}
                    onPress={onPress}
                    onLongPress={onLongPress}
                  />
                );
              })}
            </View>
          </FondoCristalLiquido>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: TAB_BAR_HORIZONTAL_MARGIN,
    right: TAB_BAR_HORIZONTAL_MARGIN,
    bottom: Platform.OS === 'ios' ? 24 : 18,
    height: TAB_BAR_HEIGHT,
  },

  shadowContainer: {
    flex: 1,
    borderRadius: 34,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 18,
  },

  glassContainer: {
    flex: 1,
    borderRadius: 34,
    overflow: 'hidden',
  },

  tabsRow: {
    flex: 1,
    flexDirection: 'row',
    padding: TAB_BAR_PADDING,
  },
});

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { HeroBanner, HeroSlide } from '../types/home.types';

type AutoHeroBannerProps = {
  slides: HeroSlide[];
};

type DefaultHeroSlideProps = {
  banner: HeroBanner;
};

// Componente publico que renderiza una parte de la interfaz.
export function DiapositivaPrincipalPredeterminada({ banner }: DefaultHeroSlideProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.defaultSlideContent}>
      <View style={styles.topRow}>
        <Text style={styles.eyebrow}>{banner.eyebrow}</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{banner.highlight}</Text>
        </View>
      </View>

      <Text style={styles.title}>{banner.title}</Text>
      <Text style={styles.description}>{banner.description}</Text>
    </View>
  );
}

// Componente publico que renderiza una parte de la interfaz.
export function BannerPrincipalAutomatico({ slides }: AutoHeroBannerProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const slideWidth = width - 44;

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1;

        scrollRef.current?.scrollTo({
          x: nextIndex * slideWidth,
          animated: true,
        });

        return nextIndex;
      });
    }, 5600);

    return () => clearInterval(interval);
  }, [activeIndex, slideWidth, slides.length]);

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarFinDesplazamiento(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    const safeIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));

    setActiveIndex(safeIndex);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={manejarFinDesplazamiento}
        scrollEventThrottle={16}>
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width: slideWidth }]}>
            {slide.component}
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {slides.map((slide, index) => (
          <View key={slide.id} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      minHeight: 198,
      borderRadius: 28,
      backgroundColor: colors.primaryDark,
      overflow: 'hidden',
    },

    slide: {
      minHeight: 198,
    },

    defaultSlideContent: {
      flex: 1,
      minHeight: 158,
      padding: 20,
    },

    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    eyebrow: {
      color: 'rgba(255,255,255,0.72)',
      fontSize: 11,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },

    pill: {
      backgroundColor: colors.accent,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
    },

    pillText: {
      color: colors.whiteSoft,
      fontSize: 10,
      fontWeight: '700',
    },

    title: {
      color: colors.whiteSoft,
      fontSize: 22,
      lineHeight: 27,
      fontWeight: '800',
      marginTop: 18,
      maxWidth: 270,
    },

    description: {
      color: 'rgba(255,255,255,0.78)',
      fontSize: 13,
      lineHeight: 19,
      marginTop: 9,
      maxWidth: 295,
    },

    dots: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingBottom: 18,
    },

    dot: {
      width: 6,
      height: 6,
      borderRadius: 99,
      marginRight: 6,
      backgroundColor: 'rgba(255,255,255,0.32)',
    },

    activeDot: {
      width: 20,
      backgroundColor: colors.whiteSoft,
    },
  });
}

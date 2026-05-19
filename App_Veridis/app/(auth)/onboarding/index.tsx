// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

const backgroundImage = require('../../../assets/images/auth_bg.jpg');

type OnboardingSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

const slides: OnboardingSlide[] = [
  {
    id: '1',
    eyebrow: 'Véridis',
    title: 'Cuida tus plantas con calma',
    description:
      'Organiza tus plantas, consulta sus necesidades y mantén una rutina de cuidado sencilla y agradable.',
  },
  {
    id: '2',
    eyebrow: 'Recordatorios',
    title: 'Nunca olvides un cuidado importante',
    description:
      'Recibe avisos para regar, abonar, podar o revisar tus plantas en el momento adecuado.',
  },
  {
    id: '3',
    eyebrow: 'Clima y recomendaciones',
    title: 'Consejos adaptados a tu entorno',
    description:
      'Véridis tiene en cuenta el clima y tus rutinas para ayudarte a tomar mejores decisiones.',
  },
];

// Punto de entrada de esta pantalla o layout.
export default function PantallaIntroduccion() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  const { width } = useWindowDimensions();

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const eyebrowOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const eyebrowTranslate = useRef(new Animated.Value(12)).current;
  const titleTranslate = useRef(new Animated.Value(16)).current;
  const descriptionTranslate = useRef(new Animated.Value(18)).current;
  const buttonTranslate = useRef(new Animated.Value(14)).current;

  const isLastSlide = currentSlide === slides.length - 1;

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    // Cada cambio de slide reinicia la entrada animada del texto activo.
    reiniciarAnimaciones();
    iniciarAnimaciones();
  }, [currentSlide]);

  function reiniciarAnimaciones() {
    // Devuelve textos y boton al estado inicial antes de animarlos.
    eyebrowOpacity.setValue(0);
    titleOpacity.setValue(0);
    descriptionOpacity.setValue(0);
    buttonOpacity.setValue(0);

    eyebrowTranslate.setValue(12);
    titleTranslate.setValue(16);
    descriptionTranslate.setValue(18);
    buttonTranslate.setValue(14);
  }

  function iniciarAnimaciones() {
    // Entra cada bloque con un pequeño desfase para dar ritmo al onboarding.
    Animated.stagger(160, [
      Animated.parallel([
        Animated.timing(eyebrowOpacity, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(eyebrowTranslate, {
          toValue: 0,
          duration: 550,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslate, {
          toValue: 0,
          duration: 650,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(descriptionOpacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(descriptionTranslate, {
          toValue: 0,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarFinScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    // Calcula el indice visible a partir del desplazamiento horizontal.
    const offsetX = event.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(offsetX / width);

    setCurrentSlide(nextIndex);
  }

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarSaltar() {
    router.replace('/login');
  }

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarComenzar() {
    router.replace('/login');
  }

  function renderizarDiapositiva({ item, index }: { item: OnboardingSlide; index: number }) {
    // Solo el slide activo usa las animaciones; los demás quedan ocultos.
    const isActive = index === currentSlide;

    return (
      <View style={[styles.slide, { width }]}>
        <Animated.Text
          style={[
            styles.eyebrow,
            {
              opacity: isActive ? eyebrowOpacity : 0,
              transform: [{ translateY: isActive ? eyebrowTranslate : 12 }],
            },
          ]}
        >
          {item.eyebrow}
        </Animated.Text>

        <Animated.Text
          style={[
            styles.title,
            {
              opacity: isActive ? titleOpacity : 0,
              transform: [{ translateY: isActive ? titleTranslate : 16 }],
            },
          ]}
        >
          {item.title}
        </Animated.Text>

        <Animated.Text
          style={[
            styles.description,
            {
              opacity: isActive ? descriptionOpacity : 0,
              transform: [{ translateY: isActive ? descriptionTranslate : 18 }],
            },
          ]}
        >
          {item.description}
        </Animated.Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
      blurRadius={5}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.overlay} />

      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Pressable onPress={manejarSaltar}>
            <Text style={styles.skipText}>Saltar</Text>
          </Pressable>
        </View>

        <FlatList
          data={slides}
          keyExtractor={(item) => item.id}
          renderItem={renderizarDiapositiva}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={manejarFinScroll}
        />

        <View style={styles.footer}>
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlide === index && styles.activeDot,
                ]}
              />
            ))}
          </View>

          {!isLastSlide ? (
            <Text style={styles.swipeHint}>Desliza para continuar</Text>
          ) : (
            <Animated.View
              style={{
                opacity: buttonOpacity,
                transform: [{ translateY: buttonTranslate }],
              }}
            >
              <Pressable
                style={styles.startButton}
                onPress={manejarComenzar}
              >
                <Text style={styles.startButtonText}>Empezar</Text>
              </Pressable>
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },

  container: {
    flex: 1,
  },

  topBar: {
    height: 54,
    paddingHorizontal: 34,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  skipText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    fontWeight: '500',
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 34,
    paddingBottom: 80,
  },

  eyebrow: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 14,
  },

  title: {
    color: colors.whiteSoft,
    fontSize: 31,
    lineHeight: 38,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: 310,
  },

  description: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 18,
    maxWidth: 310,
  },

  footer: {
    paddingHorizontal: 34,
    paddingBottom: 34,
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginHorizontal: 5,
  },

  activeDot: {
    width: 22,
    backgroundColor: colors.whiteSoft,
  },

  swipeHint: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },

  startButton: {
    height: 46,
    borderRadius: 16,
    color: 'colors.text',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },

  startButtonText: {
    color: 'colors.text',
    fontSize: 12,
    fontWeight: '700',
     textAlign: 'center',
     marginBottom: 12,
  },
  });
}

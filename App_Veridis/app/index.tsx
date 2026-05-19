// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, ImageBackground, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUsuario } from '@/features/user/context/UserContext';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

const backgroundImage = require('../assets/images/auth_bg.jpg');

// Punto de entrada de esta pantalla o layout.
export default function PantallaBienvenida() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { user, loadingUser } = useUsuario();

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    if (!loadingUser && user) {
      router.replace('/home');
    }
  }, [loadingUser, user]);

  if (loadingUser || user) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <StatusBar barStyle="light-content" />


      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Véridis</Text>
          <Text style={styles.subtitle}>Tus plantas, cuidadas con calma</Text>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => router.replace('/onboarding')}>
          <Text style={styles.buttonText}>Empezar</Text>
        </Pressable>
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

  loadingScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 34,
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.whiteSoft,
    fontFamily: 'Restaglick',
    fontSize: 74,
    lineHeight: 66,
  },
  subtitle: {
    color: colors.whiteSoft,
    marginTop: 8,
    fontSize: 15,
    fontFamily: 'serif'
  },
  button: {
    width: '72%',
    height: 44,

    borderRadius: 24,
    backgroundColor: colors.whiteSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.whiteSoft,
    fontSize: 14,
    fontWeight: '500',
    marginTop : 30,
  },
  });
}

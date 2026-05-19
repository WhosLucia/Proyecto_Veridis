// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUsuario } from '@/features/user/context/UserContext';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

const backgroundImage = require('../../../assets/images/auth_bg.jpg');

// Punto de entrada de esta pantalla o layout.
export default function PantallaInicioSesion() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { iniciarSesionUsuario } = useUsuario();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarInicioSesion() {
    setFormError(null);

    // Evita llamar a la API si faltan credenciales.
    if (!email.trim() || !password) {
      setFormError('Introduce email y contrasena.');
      return;
    }

    try {
      setSubmitting(true);
      // iniciarSesionUsuario guarda el usuario real para el resto de pantallas privadas.
      await iniciarSesionUsuario({
        email: email.trim(),
        contrasena: password,
      });

      router.replace('/home');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'No se ha podido iniciar sesion.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
      blurRadius={5}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SafeAreaView style={styles.container}>
          <View style={styles.formWrapper}>
            <Text style={styles.title1}>Hola,</Text>
            <Text style={styles.title}>Bienvenido de nuevo!</Text>

            <View style={styles.form}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>E-mail</Text>

                <TextInput
                  style={styles.input}
                  placeholder="example@gmail.com"
                  placeholderTextColor="rgba(255,255,255,0.45)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Contraseña</Text>

                <View style={styles.passwordBox}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Contraseña"
                    placeholderTextColor="rgba(255,255,255,0.45)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />

                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
                  </Pressable>
                </View>
              </View>


              <View style={styles.buttonContainer}>
                {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

                <Pressable
                  style={({ pressed }) => [
                    styles.loginButton,
                    pressed && styles.loginButtonPressed,
                  ]}
                  onPress={manejarInicioSesion}>
                  <Text style={styles.loginButtonText}>
                    {submitting ? 'Iniciando...' : 'Iniciar sesión'}
                  </Text>
                </Pressable>
              </View>
              <View style={styles.registerRow}>
                <Text style={styles.registerText}>No tienes cuenta?</Text>

                <Pressable onPress={() => router.replace('/register')}>
                  <Text style={styles.registerLink}> Registrate</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  background: {
    flex: 1,
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 36,
    justifyContent: 'center',
  },

  formWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: -30,
  },
  title1: {
    color: colors.whiteSoft,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '500',
  },

  title: {
    color: colors.whiteSoft,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center',
  },

  form: {
    width: '100%',
    marginTop: 38,
  },

  fieldGroup: {
    marginBottom: 14,
  },

  label: {
    color: colors.whiteSoft,
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 4,
    fontWeight: '400',
  },

  input: {
    width: '100%',
    height: 39,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    borderRadius: 13,
    paddingHorizontal: 14,
    color: colors.whiteSoft,
    fontSize: 13,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  passwordBox: {
    width: '100%',
    height: 39,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  passwordInput: {
    flex: 1,
    color: colors.whiteSoft,
    fontSize: 13,
    paddingVertical: 0,
  },

  eyeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '500',
  },


  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButton: {
    width: 'auto',
    height: 44,
    borderRadius: 14,
    alignSelf: 'center',
    marginTop: 26,
    marginBottom: 16,
  },

  loginButtonPressed: {
    opacity: 0.82,
  },

  loginButtonText: {
    color: colors.whiteSoft,
    fontSize: 14,
    fontWeight: '700',
  },

  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
    textAlign: 'center',
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  registerText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 10.5,
  },

  registerLink: {
    color: colors.whiteSoft,
    fontSize: 10.5,
    fontWeight: '700',
  },
  });
}

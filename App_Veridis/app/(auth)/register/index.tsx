// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Link, router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  buscarLocalizacionesPorTexto,
  obtenerLocalizaciones,
} from '@/features/locations/services/localizacionService';
import { useUsuario } from '@/features/user/context/UserContext';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { Localizacion } from '@/types/user.types';

const backgroundImage = require('../../../assets/images/auth_bg.jpg');

// Punto de entrada de esta pantalla o layout.
export default function PantallaRegistro() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { registrarUsuarioContexto } = useUsuario();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');
  const [localizaciones, setLocalizaciones] = useState<Localizacion[]>([]);
  const [selectedLocalizacion, setSelectedLocalizacion] = useState<Localizacion | null>(null);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loadingCities, setLoadingCities] = useState(false);
  const [citiesError, setCitiesError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarUbicaciones() {
      // Carga ciudades desde la API y evita actualizar estado si la pantalla ya cambió.
      setLoadingCities(true);
      setCitiesError(null);

      try {
        const results = citySearch
          ? await buscarLocalizacionesPorTexto(citySearch)
          : await obtenerLocalizaciones();

        if (active) {
          setLocalizaciones(results);
        }
      } catch (error) {
        if (active) {
          setCitiesError(
            error instanceof Error ? error.message : 'No se han podido cargar las ciudades.'
          );
          setLocalizaciones([]);
        }
      } finally {
        if (active) {
          setLoadingCities(false);
        }
      }
    }

    cargarUbicaciones();

    return () => {
      active = false;
    };
  }, [citySearch]);

  const selectedLocationLabel = useMemo(() => {
    // Mantiene el texto del selector sincronizado con la ciudad elegida.
    if (!selectedLocalizacion) return null;

    return `${selectedLocalizacion.ciudad}, ${selectedLocalizacion.provincia}, ${selectedLocalizacion.pais}`;
  }, [selectedLocalizacion]);

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarRegistro() {
    setCityDropdownOpen(false);
    setFormError(null);

    // Validaciones basicas antes de enviar datos reales a la API.
    if (!username.trim() || !email.trim() || !password || !repeatPassword) {
      setFormError('Completa todos los campos para crear tu cuenta.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Introduce un email valido.');
      return;
    }

    if (password.length < 6) {
      setFormError('La contrasena debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== repeatPassword) {
      setFormError('Las contraseñas no coinciden.');
      return;
    }

    if (!selectedLocalizacion) {
      setFormError('Selecciona la ciudad principal donde están tus plantas.');
      return;
    }

    try {
      setSubmitting(true);
      // registrarUsuarioContexto guarda el usuario devuelto y su ciudad principal en el contexto.
      await registrarUsuarioContexto({
        nombre: username.trim(),
        email: email.trim(),
        contrasena: password,
        localizacionPrincipal: selectedLocalizacion,
      });

      router.replace('/home');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'No se ha podido crear la cuenta.');
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            <View style={styles.formWrapper}>
              <Text style={styles.title1}>Crea tu cuenta</Text>
              <Text style={styles.title}>Empieza a cuidar tus plantas</Text>

              <View style={styles.form}>
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Nombre de usuario</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Tu nombre"
                    placeholderTextColor="rgba(255,255,255,0.45)"
                    value={username}
                    onChangeText={setUsername}
                    onFocus={() => setCityDropdownOpen(false)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>E-mail</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="example@gmail.com"
                    placeholderTextColor="rgba(255,255,255,0.45)"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setCityDropdownOpen(false)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={[styles.fieldGroup, styles.citySelectorContainer]}>
                  <Text style={styles.label}>Ciudad principal</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Busca tu ciudad"
                    placeholderTextColor="rgba(255,255,255,0.45)"
                    value={selectedLocationLabel ?? citySearch}
                    onFocus={() => setCityDropdownOpen(true)}
                    onChangeText={(value) => {
                      setCitySearch(value);
                      setSelectedLocalizacion(null);
                      setCityDropdownOpen(true);
                    }}
                  />

                  {cityDropdownOpen && !selectedLocalizacion ? (
                    <View style={styles.cityDropdown}>
                      <ScrollView
                        nestedScrollEnabled
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={localizaciones.length > 5}>
                        {loadingCities ? (
                          <Text style={styles.cityFeedbackText}>Cargando ciudades...</Text>
                        ) : null}
                        {citiesError ? (
                          <Text style={styles.cityFeedbackText}>{citiesError}</Text>
                        ) : null}
                        {!loadingCities && !citiesError && localizaciones.length === 0 ? (
                          <Text style={styles.cityFeedbackText}>No hay ciudades disponibles.</Text>
                        ) : null}
                        {localizaciones.map((localizacion) => (
                          <Pressable
                            key={localizacion.idLocalizacion}
                            style={styles.cityOption}
                            onPress={() => {
                              setSelectedLocalizacion(localizacion);
                              setCitySearch(localizacion.ciudad);
                              setCityDropdownOpen(false);
                            }}>
                            <Text style={styles.cityOptionText}>
                              {localizacion.ciudad}, {localizacion.provincia}, {localizacion.pais}
                            </Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </View>
                  ) : null}
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
                      onFocus={() => setCityDropdownOpen(false)}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />

                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Text style={styles.eyeText}>{showPassword ? 'Ocultar' : 'Ver'}</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Repetir contraseña</Text>
                  <View style={styles.passwordBox}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Repite tu contraseña"
                      placeholderTextColor="rgba(255,255,255,0.45)"
                      value={repeatPassword}
                      onChangeText={setRepeatPassword}
                      onFocus={() => setCityDropdownOpen(false)}
                      secureTextEntry={!showRepeatPassword}
                      autoCapitalize="none"
                    />

                    <Pressable onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
                      <Text style={styles.eyeText}>{showRepeatPassword ? 'Ocultar' : 'Ver'}</Text>
                    </Pressable>
                  </View>
                </View>

                {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

                <View style={styles.buttonContainer}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.registerButton,
                      pressed && styles.registerButtonPressed,
                    ]}
                    onPress={manejarRegistro}>
                    <Text style={styles.registerButtonText}>
                      {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.loginRow}>
                  <Text style={styles.loginText}>¿Ya tienes cuenta?</Text>

                  <Link href="/login" asChild>
                    <Pressable>
                      <Text style={styles.loginLink}> Inicia sesión</Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
            </View>
          </ScrollView>
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

    keyboardView: {
      flex: 1,
    },

    container: {
      flex: 1,
      paddingHorizontal: 36,
    },

    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical: 34,
    },

    formWrapper: {
      width: '100%',
      alignItems: 'center',
    },

    title1: {
      color: colors.whiteSoft,
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '600',
      textAlign: 'center',
    },

    title: {
      color: colors.whiteSoft,
      fontSize: 17,
      lineHeight: 22,
      fontWeight: '500',
      textAlign: 'center',
      marginTop: 2,
    },

    form: {
      width: '100%',
      marginTop: 26,
      overflow: 'visible',
    },

    fieldGroup: {
      marginBottom: 12,
    },

    citySelectorContainer: {
      position: 'relative',
      zIndex: 30,
      elevation: 30,
      overflow: 'visible',
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

    cityDropdown: {
      position: 'absolute',
      top: 63,
      left: 0,
      right: 0,
      zIndex: 50,
      elevation: 12,
      maxHeight: 188,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.28)',
      backgroundColor: 'rgba(20,31,23,0.96)',
      overflow: 'hidden',
      paddingVertical: 6,
    },

    cityOption: {
      paddingHorizontal: 12,
      paddingVertical: 10,
    },

    cityOptionText: {
      color: colors.whiteSoft,
      fontSize: 11,
      fontWeight: '700',
    },

    cityFeedbackText: {
      color: colors.whiteSoft,
      fontSize: 11,
      fontWeight: '700',
      paddingHorizontal: 12,
      paddingVertical: 10,
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

    errorText: {
      color: colors.danger,
      fontSize: 12,
      fontWeight: '800',
      lineHeight: 17,
      marginBottom: 8,
    },

    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    registerButton: {
      width: 180,
      height: 44,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 16,
    },

    registerButtonPressed: {
      opacity: 0.82,
    },

    registerButtonText: {
      color: colors.textInverse,
      fontSize: 14,
      fontWeight: '700',
    },

    loginRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
    },

    loginText: {
      color: 'rgba(255,255,255,0.72)',
      fontSize: 10.5,
    },

    loginLink: {
      color: colors.whiteSoft,
      fontSize: 10.5,
      fontWeight: '700',
    },
  });
}

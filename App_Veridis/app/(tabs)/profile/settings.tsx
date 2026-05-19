// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  buscarLocalizacionesPorTexto,
  obtenerLocalizaciones,
} from '@/features/locations/services/localizacionService';
import {
  guardarConfiguracionUsuario,
  obtenerConfiguracionUsuario,
  type UserSettingsConfig,
} from '@/features/settings/services/settingsService';
import { useTemaApp } from '@/features/theme/context/AppThemeContext';
import { useUsuario } from '@/features/user/context/UserContext';
import type { Localizacion } from '@/types/user.types';

function esEmailValido(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Punto de entrada de esta pantalla o layout.
export default function PantallaAjustesPerfil() {
  const { themeColors, isDarkMode, toggleDarkMode } = useTemaApp();
  const { user, actualizarDatosCuentaContexto, actualizarContrasena, actualizarUbicacionPrincipal, cerrarSesionUsuario } = useUsuario();

  const [nombre, setNombre] = useState(user?.nombre ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [accountError, setAccountError] = useState<string | null>(null);
  const [accountMessage, setAccountMessage] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [citySearch, setCitySearch] = useState('');
  const [localizaciones, setLocalizaciones] = useState<Localizacion[]>([]);
  const [selectedLocalizacion, setSelectedLocalizacion] = useState<Localizacion | null>(
    user?.localizacionPrincipal ?? null
  );
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [loadingCities, setLoadingCities] = useState(false);
  const [citiesError, setCitiesError] = useState<string | null>(null);
  const [savingAccount, setSavingAccount] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingLocation, setSavingLocation] = useState(false);
  const [settingsConfig, setSettingsConfig] = useState<UserSettingsConfig>({
    tema: 'sistema',
    idioma: 'es',
    notificaciones: true,
  });
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [notificationsError, setNotificationsError] = useState<string | null>(null);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    setNombre(user?.nombre ?? '');
    setEmail(user?.email ?? '');
    setSelectedLocalizacion(user?.localizacionPrincipal ?? null);
    setCitySearch('');
  }, [user]);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarConfigUsuario() {
      if (!user) return;

      try {
        const config = await obtenerConfiguracionUsuario(user.idUsuario);

        if (active) {
          setSettingsConfig(config);
        }
      } catch {
        if (active) {
          setNotificationsError('No se ha podido cargar la configuración.');
        }
      }
    }

    cargarConfigUsuario();

    return () => {
      active = false;
    };
  }, [user]);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarUbicaciones() {
      setLoadingCities(true);
      setCitiesError(null);

      try {
        const results = citySearch
          ? await buscarLocalizacionesPorTexto(citySearch)
          : await obtenerLocalizaciones();

        if (active) {
          setLocalizaciones(results);
        }
      } catch {
        if (active) {
          setCitiesError('No se han podido cargar las ciudades.');
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
    if (!selectedLocalizacion) return '';

    return `${selectedLocalizacion.ciudad}, ${selectedLocalizacion.provincia}, ${selectedLocalizacion.pais}`;
  }, [selectedLocalizacion]);

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarGuardarCuenta() {
    setCityDropdownOpen(false);
    setAccountError(null);
    setAccountMessage(null);

    if (!nombre.trim()) {
      setAccountError('El nombre no puede estar vacío.');
      return;
    }

    if (!email.trim()) {
      setAccountError('El email no puede estar vacío.');
      return;
    }

    if (!esEmailValido(email.trim())) {
      setAccountError('Introduce un email válido.');
      return;
    }

    try {
      setSavingAccount(true);
      await actualizarDatosCuentaContexto({
        nombre: nombre.trim(),
        email: email.trim(),
      });

      setAccountMessage('Datos de cuenta actualizados.');
    } catch (error) {
      setAccountError(error instanceof Error ? error.message : 'No se han podido guardar los cambios.');
    } finally {
      setSavingAccount(false);
    }
  }

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarCambiarContrasena() {
    setCityDropdownOpen(false);
    setPasswordError(null);
    setPasswordMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Completa todos los campos para cambiar la contraseña.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }

    try {
      setSavingPassword(true);
      await actualizarContrasena({
        contrasenaActual: currentPassword,
        nuevaContrasena: newPassword,
        repetirNuevaContrasena: confirmPassword,
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMessage('Contraseña actualizada correctamente.');
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : 'No se ha podido cambiar la contrasena.');
    } finally {
      setSavingPassword(false);
    }
  }

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarGuardarUbicacion() {
    setLocationError(null);
    setLocationMessage(null);

    if (!selectedLocalizacion) {
      setLocationError('Selecciona una ciudad principal.');
      return;
    }

    try {
      setSavingLocation(true);
      await actualizarUbicacionPrincipal(selectedLocalizacion);
      setCityDropdownOpen(false);
      setLocationMessage('Ciudad principal actualizada.');
    } catch (error) {
      setLocationError(error instanceof Error ? error.message : 'No se han podido guardar los cambios.');
    } finally {
      setSavingLocation(false);
    }
  }

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarAlternarNotificaciones(value: boolean) {
    if (!user) return;

    setNotificationsError(null);
    setSavingNotifications(true);

    const previousConfig = settingsConfig;
    const nextConfig = {
      ...settingsConfig,
      notificaciones: value,
    };

    setSettingsConfig(nextConfig);

    try {
      const savedConfig = await guardarConfiguracionUsuario(user.idUsuario, nextConfig);
      setSettingsConfig(savedConfig);

      if (!savedConfig.notificaciones) {
        const { cancelarTodasNotificacionesRecordatorio } = await import(
          '@/features/notifications/services/reminderNotifications.service'
        );
        await cancelarTodasNotificacionesRecordatorio();
      }
    } catch (error) {
      setSettingsConfig(previousConfig);
      setNotificationsError(
        error instanceof Error ? error.message : 'No se han podido guardar las notificaciones.'
      );
    } finally {
      setSavingNotifications(false);
    }
  }

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarCerrarSesion() {
    setCityDropdownOpen(false);

    Alert.alert('Cerrar sesión', '¿Quieres salir de tu cuenta?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: async () => {
          await cerrarSesionUsuario();
          router.replace('/login');
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Pressable
            style={[
              styles.backButton,
              {
                backgroundColor: themeColors.surface,
                borderColor: themeColors.border,
              },
            ]}
            onPress={() => router.back()}>
            <MaterialCommunityIcons name="chevron-left" size={26} color={themeColors.primaryDark} />
          </Pressable>

          <View style={styles.headerText}>
            <Text style={[styles.title, { color: themeColors.text }]}>Ajustes</Text>
            <Text style={[styles.subtitle, { color: themeColors.textSoft }]}>
              Cuenta, seguridad y localización
            </Text>
          </View>
        </View>

        <SeccionAjustes title="Cuenta">
          <EntradaAjustes
            label="Nombre de usuario"
            value={nombre}
            onChangeText={setNombre}
            onFocus={() => setCityDropdownOpen(false)}
            placeholder="Tu nombre"
          />

          <EntradaAjustes
            label="Email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setCityDropdownOpen(false)}
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {accountError ? <TextoRespuesta type="error" text={accountError} /> : null}
          {accountMessage ? <TextoRespuesta type="success" text={accountMessage} /> : null}

          <BotonPrimario
            label={savingAccount ? 'Guardando...' : 'Guardar cambios'}
            onPress={manejarGuardarCuenta}
          />
        </SeccionAjustes>

        <SeccionAjustes title="Apariencia">
          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: themeColors.primarySoft }]}>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={20}
                color={themeColors.primaryDark}
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: themeColors.text }]}>Tema oscuro</Text>
              <Text style={[styles.settingSubtitle, { color: themeColors.textSoft }]}>
                Cambia la apariencia de la app.
              </Text>
            </View>

            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor={isDarkMode ? themeColors.primary : themeColors.whiteSoft}
              trackColor={{
                false: themeColors.border,
                true: themeColors.primarySoft,
              }}
            />
          </View>
        </SeccionAjustes>

        <SeccionAjustes title="Notificaciones">
          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: themeColors.primarySoft }]}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={20}
                color={themeColors.primaryDark}
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: themeColors.text }]}>
                Recibir avisos de cuidados
              </Text>
              <Text style={[styles.settingSubtitle, { color: themeColors.textSoft }]}>
                Controla si se programan notificaciones locales.
              </Text>
            </View>

            <Switch
              value={settingsConfig.notificaciones}
              onValueChange={manejarAlternarNotificaciones}
              disabled={savingNotifications}
              thumbColor={settingsConfig.notificaciones ? themeColors.primary : themeColors.whiteSoft}
              trackColor={{
                false: themeColors.border,
                true: themeColors.primarySoft,
              }}
            />
          </View>

          {notificationsError ? <TextoRespuesta type="error" text={notificationsError} /> : null}
        </SeccionAjustes>

        <SeccionAjustes title="Seguridad">
          <EntradaAjustes
            label="Contraseña actual"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            onFocus={() => setCityDropdownOpen(false)}
            placeholder="Contraseña actual"
            secureTextEntry
          />

          <EntradaAjustes
            label="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            onFocus={() => setCityDropdownOpen(false)}
            placeholder="Nueva contraseña"
            secureTextEntry
          />

          <EntradaAjustes
            label="Repetir nueva contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setCityDropdownOpen(false)}
            placeholder="Repite la nueva contraseña"
            secureTextEntry
          />

          {passwordError ? <TextoRespuesta type="error" text={passwordError} /> : null}
          {passwordMessage ? <TextoRespuesta type="success" text={passwordMessage} /> : null}

          <BotonPrimario
            label={savingPassword ? 'Guardando...' : 'Cambiar contraseña'}
            onPress={manejarCambiarContrasena}
          />
        </SeccionAjustes>

        <SeccionAjustes title="Localización principal">
          <Text style={[styles.sectionHelper, { color: themeColors.textSoft }]}>
            Esta ciudad será la referencia para clima, recomendaciones y avisos.
          </Text>

          <View style={styles.citySelectorContainer}>
            <Text style={[styles.inputLabel, { color: themeColors.textSoft }]}>
              Ciudad principal
            </Text>

            <TextInput
              value={selectedLocationLabel || citySearch}
              onFocus={() => setCityDropdownOpen(true)}
              onChangeText={(value) => {
                setCitySearch(value);
                setSelectedLocalizacion(null);
                setCityDropdownOpen(true);
                setLocationMessage(null);
              }}
              placeholder="Busca tu ciudad"
              placeholderTextColor={themeColors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: themeColors.surfaceSoft,
                  borderColor: themeColors.border,
                  color: themeColors.text,
                },
              ]}
            />

            {cityDropdownOpen && !selectedLocalizacion ? (
              <View
                style={[
                  styles.cityDropdown,
                  {
                    backgroundColor: themeColors.surface,
                    borderColor: themeColors.border,
                  },
                ]}>
                <ScrollView
                  nestedScrollEnabled
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={localizaciones.length > 5}>
                  {loadingCities ? (
                    <Text style={[styles.cityFeedbackText, { color: themeColors.text }]}>
                      Cargando ciudades...
                    </Text>
                  ) : null}
                  {citiesError ? (
                    <Text style={[styles.cityFeedbackText, { color: themeColors.text }]}>
                      {citiesError}
                    </Text>
                  ) : null}
                  {!loadingCities && !citiesError && localizaciones.length === 0 ? (
                    <Text style={[styles.cityFeedbackText, { color: themeColors.text }]}>
                      No hay ciudades disponibles.
                    </Text>
                  ) : null}
                  {localizaciones.map((localizacion) => (
                    <Pressable
                      key={localizacion.idLocalizacion}
                      style={styles.cityOption}
                      onPress={() => {
                        setSelectedLocalizacion(localizacion);
                        setCitySearch(localizacion.ciudad);
                        setCityDropdownOpen(false);
                        setLocationMessage(null);
                      }}>
                      <Text style={[styles.cityOptionText, { color: themeColors.text }]}>
                        {localizacion.ciudad}, {localizacion.provincia}, {localizacion.pais}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            ) : null}
          </View>

          {locationError ? <TextoRespuesta type="error" text={locationError} /> : null}
          {locationMessage ? <TextoRespuesta type="success" text={locationMessage} /> : null}

          <BotonPrimario
            label={savingLocation ? 'Guardando...' : 'Guardar ciudad principal'}
            onPress={manejarGuardarUbicacion}
          />
        </SeccionAjustes>

        <SeccionAjustes title="Cuenta">
          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,
              { borderColor: themeColors.border },
              pressed && styles.buttonPressed,
            ]}
            onPress={manejarCerrarSesion}>
            <MaterialCommunityIcons name="logout" size={21} color={themeColors.danger} />
            <Text style={[styles.logoutText, { color: themeColors.danger }]}>Cerrar sesión</Text>
          </Pressable>
        </SeccionAjustes>
      </ScrollView>
    </SafeAreaView>
  );
}

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

function SeccionAjustes({ title, children }: SettingsSectionProps) {
  const { themeColors } = useTemaApp();

  return (
    <View
      style={[
        styles.section,
        {
          backgroundColor: themeColors.surface,
          borderColor: themeColors.border,
        },
      ]}>
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{title}</Text>
      {children}
    </View>
  );
}

type SettingsInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  onFocus?: () => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

function EntradaAjustes({
  label,
  value,
  onChangeText,
  onFocus,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: SettingsInputProps) {
  const { themeColors } = useTemaApp();

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputLabel, { color: themeColors.textSoft }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        placeholderTextColor={themeColors.textMuted}
        style={[
          styles.input,
          {
            backgroundColor: themeColors.surfaceSoft,
            borderColor: themeColors.border,
            color: themeColors.text,
          },
        ]}
      />
    </View>
  );
}

type FeedbackTextProps = {
  type: 'error' | 'success';
  text: string;
};

function TextoRespuesta({ type, text }: FeedbackTextProps) {
  const { themeColors } = useTemaApp();

  return (
    <Text
      style={[
        styles.feedbackText,
        { color: type === 'error' ? themeColors.danger : themeColors.success },
      ]}>
      {text}
    </Text>
  );
}

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

function BotonPrimario({ label, onPress }: PrimaryButtonProps) {
  const { themeColors } = useTemaApp();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.primaryButton,
        { backgroundColor: themeColors.primary },
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}>
      <Text style={[styles.primaryButtonText, { color: themeColors.textInverse }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 130,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 25,
    fontWeight: '900',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },

  section: {
    borderRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    marginBottom: 18,
    overflow: 'visible',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 10,
  },

  sectionHelper: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 12,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  settingContent: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: '900',
  },

  settingSubtitle: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },

  inputGroup: {
    marginBottom: 12,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 7,
  },

  input: {
    minHeight: 46,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: '600',
  },

  citySelectorContainer: {
    position: 'relative',
    zIndex: 30,
    elevation: 30,
    overflow: 'visible',
    marginBottom: 12,
  },

  cityDropdown: {
    position: 'absolute',
    top: 73,
    left: 0,
    right: 0,
    zIndex: 50,
    elevation: 12,
    maxHeight: 210,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    paddingVertical: 6,
  },

  cityOption: {
    paddingHorizontal: 14,
    paddingVertical: 11,
  },

  cityOptionText: {
    fontSize: 13,
    fontWeight: '700',
  },

  cityFeedbackText: {
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 14,
    paddingVertical: 11,
  },

  feedbackText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    marginBottom: 12,
  },

  primaryButton: {
    minHeight: 46,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  primaryButtonText: {
    fontSize: 13,
    fontWeight: '900',
  },

  logoutButton: {
    minHeight: 48,
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  logoutText: {
    fontSize: 13,
    fontWeight: '900',
  },

  buttonPressed: {
    opacity: 0.72,
  },
});

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View, ColorValue } from 'react-native';

import { useTemaApp } from '@/features/theme/context/AppThemeContext';
import type { ThemeColors } from '@/theme/themeColors';
import { obtenerIniciales } from '../../../utils/obtenerIniciales';
import type { UserProfileView } from '../types/profile.types';

type ProfileHeaderProps = {
  user: UserProfileView;
  onSettingsPress: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function CabeceraPerfil({ user, onSettingsPress }: ProfileHeaderProps) {
  const { colors } = useTemaApp();
  const styles = crearEstilos(colors);
  const { isDarkMode } = useTemaApp();

 const gradientColors: [ColorValue, ColorValue, ...ColorValue[]] = isDarkMode
  ? ['#324532', '#506E50', '#A1B593']
  : [colors.primaryDark, colors.primary, colors.success];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.smallLabel}>Mi perfil</Text>
          <Text style={styles.title}>{user.nombre}</Text>
        </View>

        <Pressable style={styles.settingsButton} onPress={onSettingsPress}>
          <MaterialCommunityIcons name="cog-outline" size={22} color={colors.whiteSoft} />
        </Pressable>
      </View>

      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{obtenerIniciales(user.nombre, user.email)}</Text>
        </View>

        <View style={styles.userData}>
          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.locationRow}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={15}
              color="rgba(255,255,255,0.78)"
            />
            <Text style={styles.location}>{user.localizacion_default}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.total_plantas}</Text>
          <Text style={styles.statLabel}>Plantas</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.total_ubicaciones}</Text>
          <Text style={styles.statLabel}>Espacios</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.notificaciones ? 'Sí' : 'No'}</Text>
          <Text style={styles.statLabel}>Avisos</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      borderRadius: 32,
      padding: 22,
      marginBottom: 18,
      overflow: 'hidden',
    },

    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },

    smallLabel: {
      color: 'rgba(255,255,255,0.72)',
      fontSize: 12,
      fontWeight: '700',
      marginBottom: 5,
    },

    title: {
      color: colors.whiteSoft,
      fontSize: 25,
      fontWeight: '900',
    },

    settingsButton: {
      width: 42,
      height: 42,
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.22)',
    },

    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24,
    },

    avatar: {
      width: 72,
      height: 72,
      borderRadius: 28,
      backgroundColor: colors.whiteSoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.72)',
    },

    avatarText: {
      color: colors.primary,
      fontSize: 24,
      fontWeight: '900',
    },

    userData: {
      flex: 1,
    },

    email: {
      color: colors.whiteSoft,
      fontSize: 14,
      fontWeight: '800',
    },

    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 7,
    },

    location: {
      color: 'rgba(255,255,255,0.78)',
      fontSize: 12,
      fontWeight: '600',
      marginLeft: 4,
    },

    statsRow: {
      marginTop: 24,
      borderRadius: 22,
      backgroundColor: 'rgba(255,255,255,0.16)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.16)',
      flexDirection: 'row',
      paddingVertical: 14,
    },

    statItem: {
      flex: 1,
      alignItems: 'center',
    },

    statValue: {
      color: colors.whiteSoft,
      fontSize: 18,
      fontWeight: '900',
    },

    statLabel: {
      color: 'rgba(255,255,255,0.72)',
      fontSize: 11,
      fontWeight: '700',
      marginTop: 3,
    },

    statDivider: {
      width: 1,
      backgroundColor: 'rgba(255,255,255,0.18)',
    },
  });
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { Ubicacion } from '../types/profile.types';
import { obtenerIconoUbicacion } from '../utils/obtenerIconoUbicacion';
import {
  obtenerDescripcionEntorno,
} from '../utils/formateadoresUbicacion';
import { InsigniaEntornoUbicacion } from './InsigniaEntornoUbicacion';
import { useTemaApp } from '@/features/theme/context/AppThemeContext';

type LocationGridCardProps = {
  location: Ubicacion;
  onPress: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaCuadriculaUbicacion({ location, onPress }: LocationGridCardProps) {
  const { colors, isDarkMode } = useTemaApp();
  const styles = crearEstilos(colors, isDarkMode);
  const icon = obtenerIconoUbicacion(location.nombre);
  const isExterior = location.es_exterior === 1;

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons
            name={icon}
            size={25}
            color={colors.primaryDark}
          />
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={colors.textMuted}
        />
      </View>

      <Text numberOfLines={1} style={styles.name}>
        {location.nombre}
      </Text>

      <Text numberOfLines={2} style={styles.description}>
        {location.descripcion || 'Espacio para organizar tus plantas.'}
      </Text>

      <View style={styles.badges}>
        <InsigniaEntornoUbicacion isExterior={isExterior} compact />
        <Text numberOfLines={1} style={styles.environmentText}>
          {obtenerDescripcionEntorno(location)}
        </Text>
      </View>
    </Pressable>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors, isDarkMode: boolean) {
  return StyleSheet.create({
    card: {
      flex: 0.82,
      minHeight: 190,
      width: 50,
      borderRadius: 22,
      borderWidth: 0.8,
       backgroundColor: isDarkMode ? '#262121' : colors.surface,
      borderColor: colors.border,
      padding: 14,
    },

    cardPressed: {
      opacity: 0.86,
      transform: [{ scale: 0.98 }],
    },

    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },

    iconBox: {
      width: 46,
      height: 46,
      borderRadius: 17,
      backgroundColor: colors.surfaceSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },

    name: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
      marginBottom: 5,
    },

    description: {
      color: colors.textSoft,
      fontSize: 11,
      lineHeight: 16,
      minHeight: 32,
    },

    badges: {
      gap: 7,
      marginTop: 12,
    },

    environmentText: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: '800',
    },
  });
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

type LocationEmptyStateProps = {
  onAddLocation: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function EstadoVacioUbicaciones({ onAddLocation }: LocationEmptyStateProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons
          name="home-map-marker"
          size={30}
          color={colors.primaryDark}
        />
      </View>

      <Text style={styles.title}>Aun no hay ubicaciones</Text>
      <Text style={styles.text}>
        Crea espacios como Salon, Cocina o Balcon para organizar tus plantas y
        preparar avisos meteorologicos.
      </Text>

      <Pressable style={styles.button} onPress={onAddLocation}>
        <Text style={styles.buttonText}>Crear ubicacion</Text>
      </Pressable>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      padding: 18,
      alignItems: 'center',
    },

    iconBox: {
      width: 56,
      height: 56,
      borderRadius: 20,
      backgroundColor: colors.surfaceSoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },

    title: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '900',
    },

    text: {
      color: colors.textSoft,
      fontSize: 13,
      lineHeight: 19,
      textAlign: 'center',
      marginTop: 6,
    },

    button: {
      minHeight: 42,
      borderRadius: 16,
      backgroundColor: colors.accent,
      justifyContent: 'center',
      paddingHorizontal: 16,
      marginTop: 14,
    },

    buttonText: {
      color: colors.textInverse,
      fontSize: 13,
      fontWeight: '900',
    },
  });
}

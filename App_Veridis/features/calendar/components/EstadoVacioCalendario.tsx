// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Componente publico que renderiza una parte de la interfaz.
export function EstadoVacioCalendario() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="leaf-circle-outline" size={42} color={colors.primarySoft} />
      <Text style={styles.title}>No hay tareas para este día</Text>
      <Text style={styles.description}>
        Puedes añadir una nueva tarea para organizar mejor los cuidados de tus plantas.
      </Text>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 28,
    },

    title: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: '800',
      color: colors.text,
    },

    description: {
      marginTop: 6,
      textAlign: 'center',
      fontSize: 13,
      lineHeight: 18,
      color: colors.textSoft,
      maxWidth: 260,
    },
  });
}

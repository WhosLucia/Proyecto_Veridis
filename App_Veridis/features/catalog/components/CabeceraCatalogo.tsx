// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Componente publico que renderiza una parte de la interfaz.
export function CabeceraCatalogo() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Catálogo de plantas</Text>
      </View>

      <View style={styles.iconButton}>
        <MaterialCommunityIcons
          name="book-open-page-variant-outline"
          size={23}
          color={colors.primaryDark}
        />
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    title: {
      color: colors.text,
      fontSize: 26,
      fontWeight: '900',
    },

    iconButton: {
      width: 44,
      height: 44,
      borderRadius: 17,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

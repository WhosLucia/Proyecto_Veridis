// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

type MyPlantsSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function BarraBusquedaMisPlantas({ value, onChangeText }: MyPlantsSearchBarProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Buscar en mis plantas"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <Pressable style={styles.filterButton}>
        <MaterialCommunityIcons name="tune-variant" size={22} color={colors.primaryDark} />
      </Pressable>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 14,
    },

    searchBox: {
      flex: 1,
      height: 46,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
    },

    input: {
      flex: 1,
      marginLeft: 8,
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },

    filterButton: {
      width: 46,
      height: 46,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

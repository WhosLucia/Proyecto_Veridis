// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, TextInput, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function BarraBusquedaCatalogo({ value, onChangeText }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar planta o familia"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <MaterialCommunityIcons name="tune-variant" size={19} color={colors.primaryDark} />
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      height: 46,
      borderRadius: 17,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },

    input: {
      flex: 1,
      color: colors.text,
      fontSize: 14,
      fontWeight: '700',
      marginHorizontal: 8,
    },
  });
}

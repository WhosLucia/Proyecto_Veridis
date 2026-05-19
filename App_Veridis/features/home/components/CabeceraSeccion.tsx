// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

type SectionHeaderProps = {
  title: string;
  actionText?: string;
  onActionPress? : () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function CabeceraSeccion({ title, actionText, onActionPress }: SectionHeaderProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

        {actionText && (
        <Pressable onPress={onActionPress}>
          <Text style={styles.action}>{actionText}</Text>
        </Pressable>
      )}
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '800',
    },

    action: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: '700',
    },
  });
}

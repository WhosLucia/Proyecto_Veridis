// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { ProfileMenuItem } from '../types/profile.types';

type ProfileOptionRowProps = {
  item: ProfileMenuItem;
  onPress: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function FilaOpcionPerfil({ item, onPress }: ProfileOptionRowProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={item.icon} size={20} color={colors.primaryDark} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
      </View>

      <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textMuted} />
    </Pressable>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },

  rowPressed: {
    opacity: 0.72,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },

  subtitle: {
    color: colors.textSoft,
    fontSize: 12,
    marginTop: 2,
  },
  });
}

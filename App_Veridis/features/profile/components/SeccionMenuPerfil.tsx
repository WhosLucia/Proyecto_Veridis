// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import { profileMenuItems } from '../config/profileMenuItems';
import type { ProfileMenuItem } from '../types/profile.types';
import { FilaOpcionPerfil } from './FilaOpcionPerfil';

type ProfileMenuSectionProps = {
  onItemPress: (item: ProfileMenuItem) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function SeccionMenuPerfil({ onItemPress }: ProfileMenuSectionProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta y ajustes</Text>

      {profileMenuItems.map((item) => (
        <FilaOpcionPerfil key={item.id} item={item} onPress={() => onItemPress(item)} />
      ))}
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
  },

  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 8,
  },
  });
}

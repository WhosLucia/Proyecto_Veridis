// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

export type MyPlantsViewMode = 'list' | 'grid';

type MyPlantsHeaderProps = {
  totalPlants: number;
  onAddPress: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function CabeceraMisPlantas({ totalPlants, onAddPress }: MyPlantsHeaderProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Mis plantas</Text>
        <Text style={styles.subtitle}>{totalPlants} plantas registradas</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.addButton} onPress={onAddPress}>
          <MaterialCommunityIcons name="plus" size={23} color={colors.textInverse} />
        </Pressable>
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 18,
      paddingTop: 13,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    title: {
      color: colors.text,
      fontSize: 25,
      fontWeight: '900',
    },

    subtitle: {
      color: colors.textSoft,
      fontSize: 13,
      fontWeight: '600',
      marginTop: 4,
    },

    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
    },

    addButton: {
      width: 46,
      height: 46,
      borderRadius: 18,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

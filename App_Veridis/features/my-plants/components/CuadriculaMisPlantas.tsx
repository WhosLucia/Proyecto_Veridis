// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { MyPlant } from '../types/myPlants.types';
import { TarjetaMiPlanta } from './TarjetaMiPlanta';

type MyPlantsGridProps = {
  plants: MyPlant[];
  onSelectPlant: (plant: MyPlant) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function CuadriculaMisPlantas({ plants, onSelectPlant }: MyPlantsGridProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  if (plants.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No hay plantas</Text>
        <Text style={styles.emptyText}>Añade una planta o cambia los filtros de búsqueda.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {plants.map((plant) => (
        <TarjetaMiPlanta
          key={plant.id_usuario_planta}
          plant={plant}
          onPress={() => onSelectPlant(plant)}
        />
      ))}
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      width: '100%',
    },

    emptyContainer: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 24,
      alignItems: 'center',
    },

    emptyTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '900',
    },

    emptyText: {
      color: colors.textSoft,
      textAlign: 'center',
      fontSize: 13,
      lineHeight: 19,
      marginTop: 6,
    },
  });
}

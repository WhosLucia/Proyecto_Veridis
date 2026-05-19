// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { FormularioRegistroPlanta } from '@/features/my-plants/components/plant-form/FormularioRegistroPlanta';
import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import type { UsuarioPlantaFormValues } from '@/features/my-plants/types/myPlants.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaCrearMiPlanta() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { agregarPlantaUsuario } = useMisPlantas();

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarCrear(values: UsuarioPlantaFormValues) {
    try {
      const createdPlant = await agregarPlantaUsuario(values);

      if (!createdPlant) return;

      router.replace({
        pathname: '/my-plants/[id]',
        params: {
          id: createdPlant.id_usuario_planta.toString(),
        },
      });
    } catch (error) {
      Alert.alert(
        'No se ha podido guardar la planta',
        error instanceof Error ? error.message : 'Revisa la conexión con la API.'
      );
    }
  }

  return (
    <View style={styles.screen}>
      <FormularioRegistroPlanta mode="create" onSubmit={manejarCrear} />
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}

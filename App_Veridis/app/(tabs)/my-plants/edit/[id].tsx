// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router, useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { FormularioRegistroPlanta } from '@/features/my-plants/components/plant-form/FormularioRegistroPlanta';
import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import type { UsuarioPlantaFormValues } from '@/features/my-plants/types/myPlants.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaEditarMiPlanta() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { obtenerPlantaPorId, actualizarPlantaUsuarioContexto } = useMisPlantas();

  const plantId = Number(id);
  const plant = obtenerPlantaPorId(plantId);

  if (!plant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Planta no encontrada</Text>
        <Text style={styles.backText} onPress={() => router.back()}>
          Volver atrás
        </Text>
      </View>
    );
  }

  const initialValues: UsuarioPlantaFormValues = {
    id_planta: plant.id_planta,
    id_ubicacion: plant.id_ubicacion,
    nombre_personalizado: plant.nombre_personalizado,
    fecha_adquisicion: plant.fecha_adquisicion,
    fecha_ultimo_riego: null,
    estado_salud: plant.estado_salud,
    notas: plant.notas,
  };

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarActualizar(values: UsuarioPlantaFormValues) {
    try {
      await actualizarPlantaUsuarioContexto(plantId, values);

      router.replace({
        pathname: '/my-plants/[id]',
        params: {
          id: plantId.toString(),
        },
      });
    } catch (error) {
      Alert.alert(
        'No se han podido guardar los cambios',
        error instanceof Error ? error.message : 'Revisa la conexión con la API.'
      );
    }
  }

  return (
    <View style={styles.screen}>
      <FormularioRegistroPlanta
        mode="edit"
        initialValues={initialValues}
        onSubmit={manejarActualizar}
      />
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

    notFoundContainer: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },

    notFoundTitle: {
      color: colors.text,
      fontSize: 22,
      fontWeight: '900',
    },

    backText: {
      color: colors.primary,
      fontSize: 15,
      fontWeight: '900',
      marginTop: 18,
    },
  });
}

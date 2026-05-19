// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ResumenCuidadosPlanta } from '@/features/my-plants/components/ResumenCuidadosPlanta';
import { InfoBaseDatosPlanta } from '@/features/my-plants/components/InfoBaseDatosPlanta';
import { HeroDetallePlanta } from '@/features/my-plants/components/HeroDetallePlanta';
import { VistaGeneralDetallePlanta } from '@/features/my-plants/components/VistaGeneralDetallePlanta';
import { SeccionRecordatoriosPlanta } from '@/features/my-plants/components/SeccionRecordatoriosPlanta';
import { TarjetaInfoPlantaUsuario } from '@/features/my-plants/components/TarjetaInfoPlantaUsuario';
import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaDetalleMiPlanta() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { obtenerPlantaPorId, eliminarPlantaUsuarioContexto } = useMisPlantas();

  const plantId = Number(id);
  const plant = obtenerPlantaPorId(plantId);

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarEliminar() {
    if (!plant) return;

    Alert.alert(
      'Eliminar planta',
      `¿Quieres eliminar "${plant.nombre_personalizado || plant.planta.nombre_comun}" de tus plantas?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await eliminarPlantaUsuarioContexto(plant.id_usuario_planta);
            router.replace('/my-plants');
          },
        },
      ]
    );
  }

  if (!plant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Planta no encontrada</Text>
        <Text style={styles.notFoundText}>No se ha podido encontrar la planta seleccionada.</Text>

        <Text style={styles.backText} onPress={() => router.back()}>
          Volver atrás
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <HeroDetallePlanta plant={plant} />

        <VistaGeneralDetallePlanta plant={plant} />

        <View style={styles.actionsCard}>
          <Pressable
            style={styles.editButton}
            onPress={() =>
              router.push({
                pathname: '/my-plants/edit/[id]',
                params: {
                  id: plant.id_usuario_planta.toString(),
                },
              })
            }>
            <Text style={styles.editButtonText}>Editar planta</Text>
          </Pressable>

          <Pressable style={styles.deleteButton} onPress={manejarEliminar}>
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </Pressable>
        </View>

        <ResumenCuidadosPlanta plant={plant} />
        <View style={styles.healthActionsCard}>
          <Text style={styles.healthActionsTitle}>Estado de salud</Text>
          <Text style={styles.healthActionsText}>
            Revisa el estado de esta planta mediante un cuestionario rápido y guarda el resultado en
            su historial.
          </Text>

          <View style={styles.healthActionsRow}>
            <Pressable
              style={styles.healthPrimaryButton}
              onPress={() =>
                router.push({
                  pathname: '/my-plants/[id]/health-check',
                  params: {
                    id: plant.id_usuario_planta.toString(),
                  },
                })
              }>
              <Text style={styles.healthPrimaryButtonText}>Revisar salud</Text>
            </Pressable>

            <Pressable
              style={styles.healthSecondaryButton}
              onPress={() =>
                router.push({
                  pathname: '/my-plants/[id]/history',
                  params: {
                    id: plant.id_usuario_planta.toString(),
                  },
                })
              }>
              <Text style={styles.healthSecondaryButtonText}>Historial</Text>
            </Pressable>
          </View>
        </View>

        <SeccionRecordatoriosPlanta plant={plant} />

        <TarjetaInfoPlantaUsuario plant={plant} />

        <InfoBaseDatosPlanta plant={plant} />
      </ScrollView>
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

  scrollContent: {
    paddingBottom: 130,
  },

  actionsCard: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 22,
    marginTop: 18,
  },

  editButton: {
    flex: 1,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButtonText: {
    color: colors.whiteSoft,
    fontSize: 13,
    fontWeight: '900',
  },

  deleteButton: {
    flex: 1,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButtonText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '900',
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

  notFoundText: {
    color: colors.textSoft,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  backText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 18,
  },

  healthActionsCard: {
    marginHorizontal: 22,
    marginTop: 18,
    borderRadius: 26,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },

  healthActionsTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },

  healthActionsText: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },

  healthActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  healthPrimaryButton: {
    flex: 1,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  healthPrimaryButtonText: {
    color: colors.whiteSoft,
    fontSize: 13,
    fontWeight: '900',
  },

  healthSecondaryButton: {
    flex: 1,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  healthSecondaryButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  });
}

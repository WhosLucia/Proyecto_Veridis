// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ModalDetalleUbicacion } from '@/features/profile/components/ModalDetalleUbicacion';
import { ModalFormularioUbicacion } from '@/features/profile/components/ModalFormularioUbicacion';
import { CabeceraPerfil } from '@/features/profile/components/CabeceraPerfil';
import { TarjetaInfoPerfil } from '@/features/profile/components/TarjetaInfoPerfil';
import { SeccionUbicacionesPerfil } from '@/features/profile/components/SeccionUbicacionesPerfil';
import {
  ProfileSectionTabKey,
  PestanasSeccionPerfil,
} from '@/features/profile/components/PestanasSeleccionPerfil';
import { useUbicacionesPerfil } from '@/features/profile/hooks/useUbicacionesPerfil';
import type { UbicacionFormValues } from '@/features/profile/types/profile.types';
import { useTemaApp } from '@/features/theme/context/AppThemeContext';
import { useUsuario } from '@/features/user/context/UserContext';
import { obtenerPlantasUsuario } from '@/features/my-plants/services/plantaUsuarioService';

// Punto de entrada de esta pantalla o layout.
export default function PantallaPerfil() {
  const {
    locations,
    selectedLocation,
    isDetailModalVisible,
    isFormModalVisible,
    editingLocation,
    abrirDetalleUbicacion,
    cerrarDetalleUbicacion,
    abrirCrearUbicacion,
    abrirEditarUbicacion,
    cerrarFormulario,
    crearUbicacion,
    actualizarUbicacion,
    eliminarUbicacion,
    loading,
    error,
  } = useUbicacionesPerfil();
  const { themeColors } = useTemaApp();
  const { user: currentUser } = useUsuario();
  const [totalPlants, setTotalPlants] = useState<number | string>('-');

  const [activeTab, setActiveTab] = useState<ProfileSectionTabKey>('info');

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarTotalPlantas() {
      if (!currentUser) {
        setTotalPlants('-');
        return;
      }

      try {
        const plants = await obtenerPlantasUsuario(currentUser.idUsuario);

        if (active) {
          setTotalPlants(plants.length);
        }
      } catch {
        if (active) {
          setTotalPlants('-');
        }
      }
    }

    cargarTotalPlantas();

    return () => {
      active = false;
    };
  }, [currentUser]);

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarGuardarUbicacion(values: UbicacionFormValues) {
    if (editingLocation) {
      actualizarUbicacion(editingLocation.id_ubicacion, values);
    } else {
      crearUbicacion(values);
    }
  }

  const user = {
    id_usuario: currentUser?.idUsuario ?? 0,
    nombre: currentUser?.nombre ?? 'Sin usuario',
    email: currentUser?.email ?? 'Sin email',
    fecha_registro: currentUser?.fechaRegistro ?? 'Sin datos',
    localizacion_default: currentUser?.localizacionPrincipal
      ? `${currentUser.localizacionPrincipal.ciudad}, ${currentUser.localizacionPrincipal.provincia}`
      : 'Sin ciudad principal',
    idioma: 'es' as const,
    notificaciones: true,
    total_plantas: totalPlants,
    total_ubicaciones: locations.length,
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <CabeceraPerfil user={user} onSettingsPress={() => router.push('/profile/settings')} />

        <PestanasSeccionPerfil activeTab={activeTab} onChangeTab={setActiveTab} />

        {activeTab === 'info' ? <TarjetaInfoPerfil user={user} /> : null}

        {activeTab === 'locations' ? (
          <>
            {loading ? <Text style={[styles.feedbackText, { color: themeColors.textSoft }]}>Cargando ubicaciones...</Text> : null}
            {error ? <Text style={[styles.feedbackText, { color: themeColors.danger }]}>{error}</Text> : null}
            <SeccionUbicacionesPerfil
              locations={locations}
              onAddLocation={abrirCrearUbicacion}
              onSelectLocation={abrirDetalleUbicacion}
            />
          </>
        ) : null}
      </ScrollView>

      <ModalDetalleUbicacion
        visible={isDetailModalVisible}
        location={selectedLocation}
        onClose={cerrarDetalleUbicacion}
        onEdit={abrirEditarUbicacion}
        onDelete={eliminarUbicacion}
      />

      <ModalFormularioUbicacion
        visible={isFormModalVisible}
        editingLocation={editingLocation}
        onClose={cerrarFormulario}
        onSave={manejarGuardarUbicacion}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 130,
  },

  feedbackText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    marginBottom: 12,
  },
});

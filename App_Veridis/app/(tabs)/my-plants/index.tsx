// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CuadriculaMisPlantas } from '@/features/my-plants/components/CuadriculaMisPlantas';
import { CabeceraMisPlantas } from '@/features/my-plants/components/CabeceraMisPlantas';
import { EtiquetasUbicacionMisPlantas } from '@/features/my-plants/components/EtiquetasUbicacionMisPlantas';
import { BarraBusquedaMisPlantas } from '@/features/my-plants/components/BarraBusquedaMisPlantas';
import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import { useFiltrosMisPlantas } from '@/features/my-plants/hooks/useFiltrosMisPlantas';
import type { MyPlant } from '@/features/my-plants/types/myPlants.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaMisPlantas() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { plants, loading, error } = useMisPlantas();

  const {
    search,
    setSearch,
    activeLocation,
    setActiveLocation,
    locations,
    filteredPlants,
  } = useFiltrosMisPlantas(plants);

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarAbrirDetallePlanta(plant: MyPlant) {
    router.push({
      pathname: '/my-plants/[id]',
      params: {
        id: plant.id_usuario_planta.toString(),
      },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CabeceraMisPlantas
          totalPlants={plants.length}
          onAddPress={() => router.push('/my-plants/create')}
        />

        <BarraBusquedaMisPlantas value={search} onChangeText={setSearch} />

        {loading ? <Text style={styles.feedbackText}>Cargando tus plantas...</Text> : null}
        {error ? <Text style={styles.feedbackText}>{error}</Text> : null}

        <EtiquetasUbicacionMisPlantas
          locations={locations}
          activeLocation={activeLocation}
          onChangeLocation={setActiveLocation}
        />

        <CuadriculaMisPlantas plants={filteredPlants} onSelectPlant={manejarAbrirDetallePlanta} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 130,
    },

    feedbackText: {
      color: colors.textSoft,
      fontSize: 13,
      fontWeight: '700',
      lineHeight: 19,
      marginBottom: 12,
    },
  });
}

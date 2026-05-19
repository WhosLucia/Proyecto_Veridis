// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CabeceraCatalogo } from '@/features/catalog/components/CabeceraCatalogo';
import { BarraBusquedaCatalogo } from '@/features/catalog/components/BarraBusquedaCatalogo';
import { EtiquetasTipoCatalogo } from '@/features/catalog/components/EtiquetasTipoCatalogo';
import { TarjetaFamiliaPlanta } from '@/features/catalog/components/TarjetaFamiliaPlanta';
import { useFiltrosCatalogo } from '@/features/catalog/hooks/useFiltrosCatalogo';
import type { CatalogPlant } from '@/features/catalog/types/catalog.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaCatalogo() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const {
    search,
    setSearch,
    activeType,
    setActiveType,
    expandedFamilyId,
    filteredFamilies,
    availableTypes,
    loading,
    error,
    alternarFamilia,
  } = useFiltrosCatalogo();

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarAbrirPlanta(plant: CatalogPlant) {
    router.push({
      pathname: '/catalog/plant/[id]',
      params: { id: plant.id_planta.toString() },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CabeceraCatalogo />

        <BarraBusquedaCatalogo value={search} onChangeText={setSearch} />

        <EtiquetasTipoCatalogo
          activeType={activeType}
          availableTypes={availableTypes}
          onChangeType={setActiveType}
        />

        {loading ? <Text style={styles.feedbackText}>Cargando plantas...</Text> : null}
        {error ? <Text style={styles.feedbackText}>{error}</Text> : null}
        {!loading && filteredFamilies.length === 0 ? (
          <Text style={styles.feedbackText}>No hay plantas disponibles.</Text>
        ) : null}

        {filteredFamilies.map(({ family, plants }) => (
          <TarjetaFamiliaPlanta
            key={family.id_familia}
            family={family}
            plants={plants}
            expanded={expandedFamilyId === family.id_familia}
            onToggle={() => alternarFamilia(family.id_familia)}
            onPressPlant={manejarAbrirPlanta}
          />
        ))}
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
      backgroundColor: colors.background,
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

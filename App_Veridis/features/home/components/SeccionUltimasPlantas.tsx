// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';

import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import { useColoresTema } from '@/theme/useColoresTema';
import { TarjetaMiniPlanta } from './TarjetaMiniPlanta';
import { CabeceraSeccion } from './CabeceraSeccion';

// Componente publico que renderiza una parte de la interfaz.
export function SeccionUltimasPlantas() {
  const router = useRouter();
  const colors = useColoresTema();
  const { plants, loading, error } = useMisPlantas();
  const latestPlants = useMemo(
    () =>
      [...plants]
        .sort((firstPlant, secondPlant) => secondPlant.id_usuario_planta - firstPlant.id_usuario_planta)
        .slice(0, 5),
    [plants]
  );

  return (
    <View style={styles.container}>
      <CabeceraSeccion
        title="Ultimas plantas agregadas"
        actionText="Ver todas"
        onActionPress={() => router.replace('/my-plants')}
      />

      {loading ? <Text style={[styles.feedbackText, { color: colors.textSoft }]}>Cargando plantas...</Text> : null}
      {error ? <Text style={[styles.feedbackText, { color: colors.danger }]}>{error}</Text> : null}
      {!loading && !error && latestPlants.length === 0 ? (
        <Text style={[styles.feedbackText, { color: colors.textSoft }]}>Todavia no tienes plantas registradas.</Text>
      ) : null}

      <FlatList
        data={latestPlants}
        keyExtractor={(item) => item.id_usuario_planta.toString()}
        renderItem={({ item }) => <TarjetaMiniPlanta plant={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  separator: {
    width: 12,
  },

  feedbackText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    marginBottom: 12,
  },
});

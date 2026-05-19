// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DetallesInfoPlanta } from '@/features/catalog/components/DetallesInfoPlanta';
import { HeroInfoPlanta } from '@/features/catalog/components/HeroInfoPlanta';
import {
  obtenerFamiliaPorId,
  obtenerPlantaPorId as obtenerPlantaMockPorId,
} from '@/features/catalog/data/catalogMockData';
import { obtenerPlantaPorId } from '@/features/plants/services/plantaService';
import type { CatalogPlant } from '@/features/catalog/types/catalog.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaInfoPlantaCatalogo() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { id } = useLocalSearchParams<{ id: string }>();

  const [plant, setPlant] = useState<CatalogPlant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarPlanta() {
      setLoading(true);
      setError(null);

      try {
        const apiPlant = await obtenerPlantaPorId(Number(id));

        if (active) {
          setPlant(apiPlant);
        }
      } catch {
        if (active) {
          setPlant(obtenerPlantaMockPorId(Number(id)) ?? null);
          setError(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    cargarPlanta();

    return () => {
      active = false;
    };
  }, [id]);

  const family = plant?.familia ?? obtenerFamiliaPorId(plant?.id_familia ?? null);

  if (loading && !plant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Cargando planta...</Text>
      </View>
    );
  }

  if (!plant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Planta no encontrada</Text>
        <Text style={styles.notFoundText}>
          {error ?? 'No se ha podido encontrar la planta seleccionada.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroInfoPlanta plant={plant} family={family} />
        <DetallesInfoPlanta plant={plant} />
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
  });
}

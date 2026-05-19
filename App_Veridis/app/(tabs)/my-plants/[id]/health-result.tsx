// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TarjetaResultadoSalud } from '@/features/plant-health/components/TarjetaResultadoSalud';
import { useSaludPlanta } from '@/features/plant-health/context/PlantHealthContext';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaResultadoSalud() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { id, consultationId } = useLocalSearchParams<{
    id: string;
    consultationId: string;
  }>();

  const { obtenerConsultaPorId } = useSaludPlanta();

  const consultation = obtenerConsultaPorId(Number(consultationId));

  if (!consultation) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundTitle}>Resultado no encontrado</Text>
        <Text style={styles.backText} onPress={() => router.back()}>
          Volver atrás
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TarjetaResultadoSalud consultation={consultation} />

        <View style={styles.actions}>
          <Pressable
            style={styles.primaryButton}
            onPress={() =>
              router.replace({
                pathname: '/my-plants/[id]',
                params: {
                  id,
                },
              })
            }
          >
            <Text style={styles.primaryButtonText}>Volver a la planta</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() =>
              router.push({
                pathname: '/my-plants/[id]/history',
                params: {
                  id,
                },
              })
            }
          >
            <Text style={styles.secondaryButtonText}>Ver historial</Text>
          </Pressable>
        </View>
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

  content: {
    paddingHorizontal: 22,
    paddingTop: 50,
    paddingBottom: 130,
  },

  actions: {
    marginTop: 8,
    gap: 10,
  },

  primaryButton: {
    height: 50,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: colors.whiteSoft,
    fontSize: 14,
    fontWeight: '900',
  },

  secondaryButton: {
    height: 50,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },

  centered: {
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

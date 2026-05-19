// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { obtenerRecordatoriosPlantaUsuario } from '@/features/calendar/services/recordatorioService';
import { obtenerHoyISO } from '@/features/calendar/utils/calendar.utils';
import {
  obtenerNotasRecordatorio,
  obtenerTituloRecordatorio,
  recordatorioOcurreEnFecha,
} from '@/features/calendar/utils/reminderSchedule';
import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import { CabeceraSeccion } from './CabeceraSeccion';

type TodayCareItem = {
  id: string;
  title: string;
  plantName: string;
  locationName: string;
  notes: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerIconoRecordatorio(type: string): keyof typeof MaterialCommunityIcons.glyphMap {
  const normalizedType = type.toLowerCase();

  if (normalizedType === 'riego' || normalizedType === 'watering') {
    return 'water-outline';
  }

  if (normalizedType === 'abono' || normalizedType === 'fertilizing') {
    return 'flower-tulip-outline';
  }

  if (normalizedType === 'pulverizar' || normalizedType === 'spraying') {
    return 'spray';
  }

  return 'clipboard-check-outline';
}

// Componente publico que renderiza una parte de la interfaz.
export function BloqueCuidadosHoy() {
  const router = useRouter();
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { plants } = useMisPlantas();
  const [items, setItems] = useState<TodayCareItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = useMemo(() => obtenerHoyISO(), []);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarCuidadosHoy() {
      if (plants.length === 0) {
        setItems([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const remindersByPlant = await Promise.all(
          plants.map(async (plant) => ({
            plant,
            reminders: await obtenerRecordatoriosPlantaUsuario(plant.id_usuario_planta),
          }))
        );

        if (active) {
          const todayItems = remindersByPlant.flatMap(({ plant, reminders }) =>
            reminders
              .filter((reminder) => recordatorioOcurreEnFecha(reminder, today))
              .map((reminder) => ({
                id: `${reminder.idRecordatorio}-${today}`,
                title: obtenerTituloRecordatorio(reminder.tipo),
                plantName: plant.nombre_personalizado || plant.planta.nombre_comun,
                locationName: plant.ubicacion_nombre,
                notes: obtenerNotasRecordatorio(reminder),
                icon: obtenerIconoRecordatorio(reminder.tipo),
              }))
          );

          setItems(todayItems);
        }
      } catch (requestError) {
        if (active) {
          setItems([]);
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se han podido cargar los cuidados de hoy.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    cargarCuidadosHoy();

    return () => {
      active = false;
    };
  }, [plants, today]);

  return (
    <View style={styles.container}>
      <CabeceraSeccion
        title="Cuidados de hoy"
        actionText="Ver calendario"
        onActionPress={() => router.push('/calendar')}
      />

      {loading ? <Text style={styles.feedbackText}>Buscando cuidados de hoy...</Text> : null}
      {error ? <Text style={[styles.feedbackText, styles.errorText]}>{error}</Text> : null}

      {!loading && !error && items.length === 0 ? (
        <View style={styles.emptyCard}>
          <MaterialCommunityIcons name="check-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.emptyTitle}>Hoy no hay nada que hacer.</Text>
          <Text style={styles.emptyText}>Tus plantas no tienen cuidados pendientes para hoy.</Text>
        </View>
      ) : null}

      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name={item.icon} size={21} color={colors.primaryDark} />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.plantName}>{item.plantName}</Text>
              <Text style={styles.helper}>
                {item.locationName} - {item.notes}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 28,
    },

    list: {
      gap: 10,
    },

    card: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 22,
      backgroundColor: colors.surface,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },

    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 16,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },

    cardContent: {
      flex: 1,
    },

    title: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '900',
    },

    plantName: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '800',
      marginTop: 3,
    },

    helper: {
      color: colors.textSoft,
      fontSize: 12,
      lineHeight: 16,
      marginTop: 4,
    },

    emptyCard: {
      borderRadius: 22,
      backgroundColor: colors.surface,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },

    emptyTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '900',
      marginTop: 8,
    },

    emptyText: {
      color: colors.textSoft,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 4,
    },

    feedbackText: {
      color: colors.textSoft,
      fontSize: 12,
      fontWeight: '700',
      marginBottom: 10,
    },

    errorText: {
      color: colors.danger,
    },
  });
}

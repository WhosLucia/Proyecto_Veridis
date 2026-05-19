// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import { PlantTask } from '../types/calendar.types';
import { obtenerEtiquetaTipoTarea } from '../utils/calendar.utils';

type CalendarTaskCardProps = {
  task: PlantTask;
  onToggleStatus: () => void;
  onEdit: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaTareaCalendario({ task, onToggleStatus, onEdit }: CalendarTaskCardProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const done = task.status === 'done';

  return (
    <View style={styles.card}>
      <Pressable
        style={[styles.statusButton, done && styles.statusButtonDone]}
        onPress={onToggleStatus}>
        <MaterialCommunityIcons
          name={done ? 'check' : 'clock-outline'}
          size={18}
          color={done ? colors.textInverse : colors.primaryDark}
        />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.name}>{task.plantName}</Text>

        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{obtenerEtiquetaTipoTarea(task.type)}</Text>
          </View>

          <Text style={styles.room}>{task.room}</Text>
        </View>

        {task.notes ? <Text style={styles.notes}>{task.notes}</Text> : null}
      </View>

      <Pressable style={styles.editButton} onPress={onEdit}>
        <MaterialCommunityIcons name="pencil-outline" size={18} color={colors.primaryDark} />
      </Pressable>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceSoft,
      borderRadius: 20,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
    },

    statusButton: {
      width: 38,
      height: 38,
      borderRadius: 14,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },

    statusButtonDone: {
      backgroundColor: colors.primary,
    },

    content: {
      flex: 1,
    },

    name: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text,
    },

    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
      gap: 8,
    },

    badge: {
      backgroundColor: colors.accentSoft,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },

    badgeText: {
      color: colors.accent,
      fontSize: 11,
      fontWeight: '800',
    },

    room: {
      color: colors.textSoft,
      fontSize: 12,
      fontWeight: '600',
    },

    notes: {
      marginTop: 7,
      color: colors.text,
      fontSize: 12,
      lineHeight: 17,
    },

    editButton: {
      width: 34,
      height: 34,
      borderRadius: 12,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
    },
  });
}

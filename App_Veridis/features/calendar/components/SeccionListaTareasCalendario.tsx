// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import { PlantTask } from '../types/calendar.types';
import { formatearFechaLegible } from '../utils/calendar.utils';
import { EstadoVacioCalendario } from './EstadoVacioCalendario';
import { TarjetaTareaCalendario } from './TarjetaTareaCalendario';

type Props = {
  selectedDate: string;
  tasks: PlantTask[];
  onAddTask: () => void;
  onToggleTask: (taskId: string) => void;
  onEditTask: (task: PlantTask) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function SeccionListaTareasCalendario({
  selectedDate,
  tasks,
  onAddTask,
  onToggleTask,
  onEditTask,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Tareas del día</Text>
          <Text style={styles.subtitle}>{formatearFechaLegible(selectedDate)}</Text>
        </View>

        <Pressable style={styles.addButton} onPress={onAddTask}>
          <MaterialCommunityIcons name="plus" size={22} color={colors.textInverse} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {tasks.length === 0 ? (
          <EstadoVacioCalendario />
        ) : (
          tasks.map((task) => (
            <TarjetaTareaCalendario
              key={task.id}
              task={task}
              onToggleStatus={() => onToggleTask(task.id)}
              onEdit={() => onEditTask(task)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 14,
      backgroundColor: colors.surface,
      borderRadius: 28,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },

    title: {
      fontSize: 20,
      fontWeight: '900',
      color: colors.text,
    },

    subtitle: {
      marginTop: 3,
      color: colors.textSoft,
      fontSize: 13,
      textTransform: 'capitalize',
    },

    addButton: {
      width: 46,
      height: 46,
      borderRadius: 18,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },

    listContent: {
      paddingBottom: 24,
    },
  });
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ModalEditorTareaCalendario } from '@/features/calendar/components/ModalEditorTareaCalendario';
import { SeccionListaTareasCalendario } from '@/features/calendar/components/SeccionListaTareasCalendario';
import { SeccionSuperiorCalendario } from '@/features/calendar/components/SeccionSuperiorCalendario';
import { useEventosCalendario } from '@/features/calendar/hooks/useEventosCalendario';
import { PlantTask, PlantTaskDraft } from '@/features/calendar/types/calendar.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

// Punto de entrada de esta pantalla o layout.
export default function PantallaCalendario() {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const {
    selectedDate,
    setSelectedDate,
    tasks,
    selectedTasks,
    alternarEstadoTarea,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    loading,
    error,
  } = useEventosCalendario();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<PlantTask | null>(null);

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarAbrirModalNuevaTarea() {
    setEditingTask(null);
    setModalVisible(true);
  }

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarEditarTarea(task: PlantTask) {
    setEditingTask(task);
    setModalVisible(true);
  }

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarGuardarTarea(task: PlantTaskDraft | PlantTask) {
    if ('id' in task) {
      await actualizarTarea(task);
    } else {
      await agregarTarea(task);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topHalf}>
          <SeccionSuperiorCalendario
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            tasks={tasks}
          />
        </View>

        <View style={styles.bottomHalf}>
          {loading ? <Text style={styles.feedbackText}>Cargando recordatorios...</Text> : null}
          {error ? <Text style={styles.feedbackText}>{error}</Text> : null}
          <SeccionListaTareasCalendario
            selectedDate={selectedDate}
            tasks={selectedTasks}
            onAddTask={manejarAbrirModalNuevaTarea}
            onToggleTask={alternarEstadoTarea}
            onEditTask={manejarEditarTarea}
          />
        </View>
      </View>

      <ModalEditorTareaCalendario
        visible={modalVisible}
        selectedDate={selectedDate}
        editingTask={editingTask}
        onClose={() => setModalVisible(false)}
        onSave={manejarGuardarTarea}
        onDelete={eliminarTarea}
      />
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

    container: {
      flex: 1,
      paddingHorizontal: 18,
      paddingTop: 8,
      paddingBottom: 80,
    },

    topHalf: {
      flex: 0.58,
    },

    bottomHalf: {
      flex: 0.42,
    },

    feedbackText: {
      color: colors.textSoft,
      fontSize: 13,
      fontWeight: '700',
      marginBottom: 8,
    },
  });
}

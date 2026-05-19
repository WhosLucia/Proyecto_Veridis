// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { CampoFechaCalendario } from '@/components/forms/CampoFechaCalendario';
import { useMisPlantas } from '@/features/my-plants/context/MyPlantsContext';
import type { MyPlant } from '@/features/my-plants/types/myPlants.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import { PlantTask, PlantTaskDraft, PlantTaskType } from '../types/calendar.types';
import { CARE_TYPE_OPTIONS, obtenerEtiquetaTipoCuidado } from '../utils/reminderSchedule';

type Props = {
  visible: boolean;
  selectedDate: string;
  editingTask: PlantTask | null;
  onClose: () => void;
  onSave: (task: PlantTaskDraft | PlantTask) => Promise<void> | void;
  onDelete?: (taskId: string) => Promise<void> | void;
};

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerEtiquetaPlanta(plant: MyPlant) {
  return plant.nombre_personalizado || plant.planta.nombre_comun;
}

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerFrecuenciaPredeterminada(plant: MyPlant | undefined, type: PlantTaskType) {
  if (!plant) return '';
  if (type === 'watering' && plant.planta.frecuencia_riego) {
    return plant.planta.frecuencia_riego.toString();
  }
  if (type === 'fertilizing' && plant.planta.frecuencia_abono) {
    return plant.planta.frecuencia_abono.toString();
  }
  return '7';
}

// Componente publico que renderiza una parte de la interfaz.
export function ModalEditorTareaCalendario({
  visible,
  selectedDate,
  editingTask,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const { plants } = useMisPlantas();
  const [selectedPlantId, setSelectedPlantId] = useState<number | null>(null);
  const [plantSearch, setPlantSearch] = useState('');
  const [taskDate, setTaskDate] = useState(selectedDate);
  const [type, setType] = useState<PlantTaskType>('watering');
  const [frequency, setFrequency] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const selectedPlant = useMemo(
    () => plants.find((plant) => plant.id_usuario_planta === selectedPlantId),
    [plants, selectedPlantId]
  );

  const plantResults = useMemo(() => {
    const normalizedSearch = plantSearch.trim().toLowerCase();
    if (!normalizedSearch) return plants.slice(0, 5);

    return plants
      .filter((plant) => {
        const visibleName = obtenerEtiquetaPlanta(plant).toLowerCase();
        const catalogName = plant.planta.nombre_comun.toLowerCase();
        const scientificName = plant.planta.nombre_cientifico?.toLowerCase() ?? '';

        return (
          visibleName.includes(normalizedSearch) ||
          catalogName.includes(normalizedSearch) ||
          scientificName.includes(normalizedSearch)
        );
      })
      .slice(0, 5);
  }, [plantSearch, plants]);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    if (editingTask) {
      setSelectedPlantId(editingTask.idUsuarioPlanta);
      setPlantSearch(editingTask.plantName);
      setTaskDate(editingTask.date);
      setType(editingTask.type);
      setFrequency(editingTask.frequency?.toString() ?? '');
    } else {
      setSelectedPlantId(null);
      setPlantSearch('');
      setTaskDate(selectedDate);
      setType('watering');
      setFrequency('');
    }

    setFormError(null);
    setSaving(false);
  }, [editingTask, selectedDate, visible]);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    if (!selectedPlant || editingTask) return;
    setFrequency(obtenerFrecuenciaPredeterminada(selectedPlant, type));
  }, [editingTask, selectedPlant, type]);

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarSeleccionPlanta(plant: MyPlant) {
    setSelectedPlantId(plant.id_usuario_planta);
    setPlantSearch(obtenerEtiquetaPlanta(plant));
    setFrequency(obtenerFrecuenciaPredeterminada(plant, type));
    setFormError(null);
  }

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarCambioBusquedaPlanta(text: string) {
    setPlantSearch(text);
    setSelectedPlantId(null);
  }

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarGuardar() {
    if (!selectedPlant) {
      setFormError('Selecciona una planta de la lista.');
      return;
    }

    const parsedFrequency = Number(frequency);
    if (!Number.isFinite(parsedFrequency) || parsedFrequency <= 0) {
      setFormError('Indica una frecuencia válida en días.');
      return;
    }

    setSaving(true);
    setFormError(null);

    try {
      const taskData = {
        idUsuarioPlanta: selectedPlant.id_usuario_planta,
        plantName: obtenerEtiquetaPlanta(selectedPlant),
        room: selectedPlant.ubicacion_nombre,
        type,
        date: taskDate,
        frequency: parsedFrequency,
        status: editingTask?.status ?? 'pending',
      };

      if (editingTask) {
        await onSave({
          ...editingTask,
          ...taskData,
        });
      } else {
        await onSave(taskData);
      }

      onClose();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'No se ha podido guardar la tarea.'
      );
    } finally {
      setSaving(false);
    }
  }

  // Gestiona una accion del usuario que necesita operaciones asincronas.
  async function manejarEliminar() {
    if (!editingTask || !onDelete) return;

    setSaving(true);
    setFormError(null);

    try {
      await onDelete(editingTask.id);
      onClose();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'No se ha podido eliminar la tarea.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{editingTask ? 'Editar tarea' : 'Nueva tarea'}</Text>

            <Text style={styles.label}>Planta</Text>
            <TextInput
              placeholder="Busca por nombre de la planta"
              placeholderTextColor={colors.textMuted}
              value={plantSearch}
              onChangeText={manejarCambioBusquedaPlanta}
              style={styles.input}
            />

            {plantResults.length > 0 ? (
              <View style={styles.resultsBox}>
                {plantResults.map((plant) => {
                  const selected = plant.id_usuario_planta === selectedPlantId;

                  return (
                    <Pressable
                      key={plant.id_usuario_planta}
                      style={[styles.resultItem, selected && styles.resultItemActive]}
                      onPress={() => manejarSeleccionPlanta(plant)}>
                      <Text style={[styles.resultName, selected && styles.resultNameActive]}>
                        {obtenerEtiquetaPlanta(plant)}
                      </Text>
                      <Text style={styles.resultMeta}>
                        {plant.planta.nombre_comun}
                        {plant.ubicacion_nombre ? ` - ${plant.ubicacion_nombre}` : ''}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.feedbackText}>No hay plantas que coincidan con la busqueda.</Text>
            )}

            <CampoFechaCalendario
              label="Fecha de la tarea"
              value={taskDate}
              onChange={setTaskDate}
              placeholder="Selecciona la fecha de la tarea"
            />

            <Text style={styles.label}>Tipo de cuidado</Text>
            <View style={styles.typesRow}>
              {CARE_TYPE_OPTIONS.map((taskType) => (
                <Pressable
                  key={taskType}
                  onPress={() => setType(taskType)}
                  style={[styles.typeButton, type === taskType && styles.typeButtonActive]}>
                  <Text
                    style={[
                      styles.typeButtonText,
                      type === taskType && styles.typeButtonTextActive,
                    ]}>
                    {obtenerEtiquetaTipoCuidado(taskType)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Frecuencia</Text>
            <TextInput
              placeholder="Cada cuántos días"
              placeholderTextColor={colors.textMuted}
              value={frequency}
              onChangeText={setFrequency}
              style={styles.input}
              keyboardType="number-pad"
            />

            {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

            <View style={styles.actions}>
              {editingTask && onDelete ? (
                <Pressable
                  style={[styles.deleteButton, saving && styles.disabledButton]}
                  onPress={manejarEliminar}
                  disabled={saving}>
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </Pressable>
              ) : null}

              <Pressable style={styles.cancelButton} onPress={onClose} disabled={saving}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.saveButton, saving && styles.disabledButton]}
                onPress={manejarGuardar}
                disabled={saving}>
                <Text style={styles.saveButtonText}>{saving ? 'Guardando...' : 'Guardar'}</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.28)',
      justifyContent: 'center',
      padding: 22,
    },

    modal: {
      maxHeight: '88%',
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: 18,
    },

    title: {
      fontSize: 18,
      fontWeight: '900',
      color: colors.text,
      marginBottom: 14,
    },

    label: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '900',
      marginBottom: 7,
    },

    input: {
      height: 46,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      color: colors.textInverse,
      backgroundColor: colors.whiteSoft,
      marginBottom: 10,
    },

    resultsBox: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 14,
    },

    resultItem: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: colors.whiteSoft,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    resultItemActive: {
      backgroundColor: colors.primarySoft,
    },

    resultName: {
      color: colors.textMuted,
      fontSize: 13,
      fontWeight: '900',
    },

    resultNameActive: {
      color: colors.textSoft,
    },

    resultMeta: {
      color: colors.textSoft,
      fontSize: 11,
      fontWeight: '700',
      marginTop: 3,
    },

    typesRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16,
    },

    typeButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: colors.surfaceSoft,
    },

    typeButtonActive: {
      backgroundColor: colors.accent,
    },

    typeButtonText: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '700',
    },

    typeButtonTextActive: {
      color: colors.whiteSoft,
    },

    feedbackText: {
      color: colors.textSoft,
      fontSize: 12,
      fontWeight: '700',
      marginBottom: 14,
    },

    errorText: {
      color: colors.danger,
      fontSize: 12,
      fontWeight: '800',
      marginBottom: 12,
    },

    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
      flexWrap: 'wrap',
    },

    deleteButton: {
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.accentSoft,
    },

    deleteButtonText: {
      color: colors.danger,
      fontWeight: '800',
    },

    cancelButton: {
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.surfaceSoft,
    },

    cancelButtonText: {
      color: colors.text,
      fontWeight: '800',
    },

    saveButton: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.primary,
    },

    saveButtonText: {
      color: colors.whiteSoft,
      fontWeight: '800',
    },

    disabledButton: {
      opacity: 0.55,
    },
  });
}

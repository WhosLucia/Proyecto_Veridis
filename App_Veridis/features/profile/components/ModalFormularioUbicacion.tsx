// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type {
  HumidityLevel,
  LightLevel,
  Ubicacion,
  UbicacionFormValues,
} from '../types/profile.types';
import { formatearNivelHumedad, formatearNivelLuz } from '../utils/formateadoresUbicacion';

type LocationFormModalProps = {
  visible: boolean;
  editingLocation: Ubicacion | null;
  onClose: () => void;
  onSave: (values: UbicacionFormValues) => void;
};

const lightOptions: LightLevel[] = [
  'plena_sombra',
  'sombra_parcial',
  'luz_indirecta',
  'luz_directa',
];

const humidityOptions: HumidityLevel[] = ['baja', 'media', 'alta'];

// Componente publico que renderiza una parte de la interfaz.
export function ModalFormularioUbicacion({
  visible,
  editingLocation,
  onClose,
  onSave,
}: LocationFormModalProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [luz, setLuz] = useState<LightLevel>('luz_indirecta');
  const [humedad, setHumedad] = useState<HumidityLevel>('media');
  const [esExterior, setEsExterior] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    if (editingLocation) {
      setNombre(editingLocation.nombre);
      setDescripcion(editingLocation.descripcion ?? '');
      setLuz(editingLocation.luz);
      setHumedad(editingLocation.humedad);
      setEsExterior(editingLocation.es_exterior === 1);
    } else {
      setNombre('');
      setDescripcion('');
      setLuz('luz_indirecta');
      setHumedad('media');
      setEsExterior(false);
    }

    setSubmitted(false);
  }, [editingLocation, visible]);

  const nameError = useMemo(() => {
    if (!submitted) return null;

    if (!nombre.trim()) {
      return 'El nombre es obligatorio.';
    }

    if (nombre.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres.';
    }

    return null;
  }, [nombre, submitted]);

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarGuardar() {
    setSubmitted(true);

    if (!nombre.trim() || nombre.trim().length < 2) {
      return;
    }

    onSave({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      luz,
      humedad,
      es_exterior: esExterior,
    });

    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>
                {editingLocation ? 'Editar ubicacion' : 'Nueva ubicacion'}
              </Text>
              <Text style={styles.subtitle}>
                Define el ambiente para cuidar mejor las plantas de este espacio.
              </Text>
            </View>

            <Pressable onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={20} color={colors.primaryDark} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ej: Salon"
              placeholderTextColor={colors.textMuted}
              style={[styles.input, nameError && styles.inputError]}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

            <Text style={styles.label}>Descripcion</Text>
            <TextInput
              value={descripcion}
              onChangeText={setDescripcion}
              placeholder="Ej: Zona con luz indirecta junto a la ventana"
              placeholderTextColor={colors.textMuted}
              style={[styles.input, styles.textArea]}
              multiline
            />

            <Text style={styles.label}>Luz</Text>
            <View style={styles.chipGrid}>
              {lightOptions.map((option) => (
                <OpcionEtiqueta
                  key={option}
                  label={formatearNivelLuz(option)}
                  active={luz === option}
                  onPress={() => setLuz(option)}
                />
              ))}
            </View>

            <Text style={styles.label}>Humedad</Text>
            <View style={styles.chipGrid}>
              {humidityOptions.map((option) => (
                <OpcionEtiqueta
                  key={option}
                  label={formatearNivelHumedad(option)}
                  active={humedad === option}
                  onPress={() => setHumedad(option)}
                />
              ))}
            </View>

            <View style={styles.environmentBox}>
              <View style={styles.environmentTextBlock}>
                <Text style={styles.environmentTitle}>
                  {esExterior ? 'Exterior' : 'Interior'}
                </Text>
                <Text style={styles.environmentText}>
                  {esExterior
                    ? 'Esta ubicacion se tendra en cuenta para avisos meteorologicos.'
                    : 'Esta ubicacion no se cruzara con el clima exterior.'}
                </Text>
              </View>

              <Switch
                value={esExterior}
                onValueChange={setEsExterior}
                thumbColor={esExterior ? colors.primary : colors.whiteSoft}
                trackColor={{
                  false: colors.border,
                  true: colors.primarySoft,
                }}
              />
            </View>
          </ScrollView>

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>

            <Pressable style={styles.saveButton} onPress={manejarGuardar}>
              <Text style={styles.saveText}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function OpcionEtiqueta({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <Pressable
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(7, 21, 15, 0.38)',
      justifyContent: 'center',
      padding: 18,
    },

    modal: {
      maxHeight: '88%',
      backgroundColor: colors.surface,
      borderRadius: 28,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 12,
    },

    title: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '900',
    },

    subtitle: {
      color: colors.textSoft,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 4,
      maxWidth: 250,
    },

    closeButton: {
      width: 38,
      height: 38,
      borderRadius: 14,
      backgroundColor: colors.surfaceSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },

    content: {
      paddingBottom: 4,
    },

    label: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '900',
      marginBottom: 7,
      marginLeft: 3,
      marginTop: 8,
    },

    input: {
      minHeight: 46,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceSoft,
      paddingHorizontal: 14,
      color: colors.text,
      fontSize: 14,
      fontWeight: '700',
    },

    inputError: {
      borderColor: colors.danger,
    },

    errorText: {
      color: colors.danger,
      fontSize: 11,
      fontWeight: '800',
      marginTop: 5,
      marginLeft: 3,
    },

    textArea: {
      height: 86,
      paddingTop: 12,
      textAlignVertical: 'top',
    },

    chipGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 2,
    },

    chip: {
      minHeight: 38,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      paddingHorizontal: 12,
    },

    chipActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft,
    },

    chipText: {
      color: colors.textSoft,
      fontSize: 12,
      fontWeight: '900',
    },

    chipTextActive: {
      color: colors.text,
    },

    environmentBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceSoft,
      padding: 13,
      marginTop: 16,
    },

    environmentTextBlock: {
      flex: 1,
    },

    environmentTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '900',
    },

    environmentText: {
      color: colors.textSoft,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 3,
    },

    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 9,
      marginTop: 16,
    },

    cancelButton: {
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.surfaceSoft,
    },

    cancelText: {
      color: colors.text,
      fontWeight: '900',
    },

    saveButton: {
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.primary,
    },

    saveText: {
      color: colors.textInverse,
      fontWeight: '900',
    },
  });
}

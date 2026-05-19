// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { Ubicacion } from '../types/profile.types';
import { obtenerIconoUbicacion } from '../utils/obtenerIconoUbicacion';
import {
  formatearEntorno,
  formatearNivelHumedad,
  formatearNivelLuz,
  obtenerDescripcionEntorno,
} from '../utils/formateadoresUbicacion';
import { InsigniaEntornoUbicacion } from './InsigniaEntornoUbicacion';

type LocationDetailModalProps = {
  visible: boolean;
  location: Ubicacion | null;
  onClose: () => void;
  onEdit: (location: Ubicacion) => void;
  onDelete: (id_ubicacion: number) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function ModalDetalleUbicacion({
  visible,
  location,
  onClose,
  onEdit,
  onDelete,
}: LocationDetailModalProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  if (!location) return null;

  const icon = obtenerIconoUbicacion(location.nombre);
  const isExterior = location.es_exterior === 1;

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarEliminar() {
    if (!location) return;

    Alert.alert(
      'Eliminar ubicacion',
      `Quieres eliminar "${location.nombre}"? Esta accion no se puede deshacer.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete(location.id_ubicacion),
        },
      ]
    );
  }

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name={icon}
                size={32}
                color={colors.text}
              />
            </View>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons name="close" size={20} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.title}>{location.nombre}</Text>
            <Text style={styles.identifier}>ID #{location.id_ubicacion}</Text>
          </View>

          <Text style={styles.description}>
            {location.descripcion || 'Espacio registrado para organizar tus plantas.'}
          </Text>

          <View style={styles.badgeRow}>
            <InsigniaEntornoUbicacion isExterior={isExterior} />
            <Text style={styles.environmentDescription}>
              {obtenerDescripcionEntorno(location)}
            </Text>
          </View>

          <View style={styles.infoGrid}>
            <TarjetaInformacion
              icon="white-balance-sunny"
              label="Luz"
              value={formatearNivelLuz(location.luz)}
            />
            <TarjetaInformacion
              icon="water-percent"
              label="Humedad"
              value={formatearNivelHumedad(location.humedad)}
            />
            <TarjetaInformacion
              icon={isExterior ? 'weather-sunny' : 'home-outline'}
              label="Ambiente"
              value={formatearEntorno(location.es_exterior)}
            />
          </View>

          {isExterior ? (
            <View style={styles.weatherBox}>
              <MaterialCommunityIcons
                name="weather-pouring"
                size={20}
                color={colors.accent}
              />
              <Text style={styles.weatherText}>
                En el futuro, las plantas de esta ubicacion podran recibir avisos
                por lluvia, viento, frio o calor.
              </Text>
            </View>
          ) : null}

          <View style={styles.actions}>
            <Pressable style={styles.deleteButton} onPress={manejarEliminar}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryButtonText}>Cerrar</Text>
            </Pressable>

            <Pressable style={styles.primaryButton} onPress={() => onEdit(location)}>
              <Text style={styles.primaryButtonText}>Editar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function TarjetaInformacion({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
}) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.infoCard}>
      <MaterialCommunityIcons name={icon} size={22} color={colors.primaryDark} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(7, 21, 15, 0.38)',
      justifyContent: 'center',
      padding: 20,
    },

    modal: {
      backgroundColor: colors.surface,
      borderRadius: 30,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    iconBox: {
      width: 62,
      height: 62,
      borderRadius: 23,
      backgroundColor: colors.surfaceSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },

    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 15,
      backgroundColor: colors.surfaceSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 18,
    },

    title: {
      flex: 1,
      color: colors.text,
      fontSize: 25,
      fontWeight: '900',
    },

    identifier: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: '900',
    },

    description: {
      color: colors.textSoft,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 8,
    },

    badgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 16,
    },

    environmentDescription: {
      flex: 1,
      color: colors.text,
      fontSize: 12,
      fontWeight: '900',
    },

    infoGrid: {
      flexDirection: 'row',
      gap: 9,
      marginTop: 18,
    },

    infoCard: {
      flex: 1,
      minHeight: 106,
      backgroundColor: colors.surfaceSoft,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
    },

    infoLabel: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: '900',
      marginTop: 9,
    },

    infoValue: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '900',
      marginTop: 3,
    },

    weatherBox: {
      flexDirection: 'row',
      gap: 9,
      borderRadius: 18,
      backgroundColor: colors.accentSoft,
      padding: 12,
      marginTop: 16,
    },

    weatherText: {
      flex: 1,
      color: colors.text,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: '800',
    },

    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 20,
    },

    deleteButton: {
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.accentSoft,
    },

    deleteButtonText: {
      color: colors.danger,
      fontWeight: '900',
    },

    secondaryButton: {
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.surfaceSoft,
    },

    secondaryButtonText: {
      color: colors.text,
      fontWeight: '900',
    },

    primaryButton: {
      paddingHorizontal: 17,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.primary,
    },

    primaryButtonText: {
      color: colors.textInverse,
      fontWeight: '900',
    },
  });
}

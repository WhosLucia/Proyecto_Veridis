// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

// Convierte un valor interno en texto legible para la interfaz.
function formatearFecha(value: string) {
  if (!value) return '';

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// Componente publico que renderiza una parte de la interfaz.
export function CampoFechaCalendario({
  label,
  value,
  onChange,
  placeholder = 'Selecciona una fecha',
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const [visible, setVisible] = useState(false);

  const calendarThemeKey = `${colors.surface}-${colors.text}-${colors.primary}`;
  const calendarTheme = useMemo(
    () => ({
      backgroundColor: colors.surface,
      calendarBackground: colors.surface,
      textSectionTitleColor: colors.textSoft,
      selectedDayBackgroundColor: colors.primary,
      selectedDayTextColor: colors.textInverse,
      todayTextColor: colors.accent,
      dayTextColor: colors.text,
      textDisabledColor: colors.textMuted,
      monthTextcolor: colors.text,
      arrowcolor: colors.text,
      indicatorColor: colors.primary,
      textDayFontWeight: '600' as const,
      textMonthFontWeight: '800' as const,
      textDayHeaderFontWeight: '700' as const,
      textDayFontSize: 14,
      textMonthFontSize: 18,
      textDayHeaderFontSize: 12,
    }),
    [
      colors.accent,
      colors.primary,
      colors.primaryDark,
      colors.surface,
      colors.text,
      colors.textInverse,
      colors.textMuted,
      colors.textSoft,
    ]
  );

  const markedDates = value
    ? {
        [value]: {
          selected: true,
          selectedColor: colors.primary,
          selectedTextColor: colors.textInverse,
        },
      }
    : {};

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.field} onPress={() => setVisible(true)}>
        <Text style={[styles.fieldText, !value && styles.placeholder]}>
          {value ? formatearFecha(value) : placeholder}
        </Text>
      </Pressable>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>{label}</Text>

            <Calendar
              key={calendarThemeKey}
              current={value || undefined}
              markedDates={markedDates}
              onDayPress={(day) => {
                onChange(day.dateString);
                setVisible(false);
              }}
              enableSwipeMonths
              theme={calendarTheme}
              style={styles.calendar}
            />

            <Pressable style={styles.cancelButton} onPress={() => setVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    label: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '900',
      marginBottom: 7,
    },

    field: {
      minHeight: 46,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      justifyContent: 'center',
      backgroundColor: colors.whiteSoft,
      marginBottom: 10,
    },

    fieldText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '700',
    },

    placeholder: {
      color: colors.textMuted,
    },

    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.28)',
      justifyContent: 'center',
      padding: 22,
    },

    modal: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: 18,
    },

    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '900',
      marginBottom: 12,
    },

    calendar: {
      borderRadius: 20,
      overflow: 'hidden',
    },

    cancelButton: {
      alignSelf: 'flex-end',
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.surfaceSoft,
      marginTop: 14,
    },

    cancelButtonText: {
      color: colors.text,
      fontWeight: '800',
    },
  });
}

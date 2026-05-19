// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import { PlantTask } from '../types/calendar.types';
import { formatearFechaLegible, obtenerFechasMarcadasDeTareas } from '../utils/calendar.utils';

type CalendarTopSectionProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  tasks: PlantTask[];
};

// Componente publico que renderiza una parte de la interfaz.
export function SeccionSuperiorCalendario({
  selectedDate,
  onSelectDate,
  tasks,
}: CalendarTopSectionProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  const calendarThemeKey = `${colors.background}-${colors.surface}-${colors.text}-${colors.primary}`;

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

      monthTextcolor: colors.accent,
      arrowcolor: colors.text,
      indicatorColor: colors.primary,

      textDayFontWeight: '600' as const,
      textMonthFontWeight: '800' as const,
      textDayHeaderFontWeight: '700' as const,

      textDayFontSize: 14,
      textMonthFontSize: 18,
      textDayHeaderFontSize: 12,
    }),
    [colors.surface, colors.textSoft, colors.primary, colors.textInverse, colors.accent, colors.text, colors.textMuted]
  );

  const markedDates = useMemo(
    () => obtenerFechasMarcadasDeTareas(tasks, selectedDate, colors),
    [tasks, selectedDate, colors]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendario</Text>
        <Text style={styles.subtitle}>{formatearFechaLegible(selectedDate)}</Text>
      </View>

      <Calendar
        key={calendarThemeKey}
        current={selectedDate}
        onDayPress={(day) => onSelectDate(day.dateString)}
        markedDates={markedDates}
        enableSwipeMonths
        theme={calendarTheme}
        style={styles.calendar}
      />
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 28,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },

    header: {
      marginBottom: 12,
    },

    title: {
      fontSize: 22,
      fontWeight: '900',
      color: colors.text,
    },

    subtitle: {
      marginTop: 4,
      fontSize: 13,
      color: colors.textSoft,
      textTransform: 'capitalize',
    },

    calendar: {
      borderRadius: 20,
      overflow: 'hidden',
    },
  });
}

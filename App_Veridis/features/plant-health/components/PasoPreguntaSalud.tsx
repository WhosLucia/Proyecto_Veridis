// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { HealthQuestion } from '../types/plantHealth.types';
import { TarjetaOpcionSalud } from './TarjetaOpcionSalud';

type Props = {
  question: HealthQuestion;
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function PasoPreguntaSalud({
  question,
  selectedOptions,
  onToggleOption,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return question.options;
    }

    return question.options.filter((option) => {
      const label = option.label.toLowerCase();
      const description = option.description?.toLowerCase() ?? '';

      return label.includes(normalizedSearch) || description.includes(normalizedSearch);
    });
  }, [question.options, search]);

  return (
    <View>
      <Text style={styles.title}>{question.title}</Text>
      <Text style={styles.description}>{question.description}</Text>

      {question.multiple ? (
        <Text style={styles.helper}>Puedes seleccionar varias opciones.</Text>
      ) : (
        <Text style={styles.helper}>Selecciona una opción.</Text>
      )}

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar síntoma"
        placeholderTextColor={colors.textMuted}
        style={styles.searchInput}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={styles.optionsContainer}>
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator
          contentContainerStyle={styles.optionsContent}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <TarjetaOpcionSalud
                key={option.id}
                option={option}
                selected={selectedOptions.includes(option.id)}
                onPress={() => onToggleOption(option.id)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No hay síntomas que coincidan con tu búsqueda.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    title: {
      color: colors.text,
      fontSize: 23,
      fontWeight: '900',
      marginBottom: 7,
    },

    description: {
      color: colors.textSoft,
      fontSize: 14,
      lineHeight: 20,
    },

    helper: {
      color: colors.accent,
      fontSize: 12,
      fontWeight: '900',
      marginTop: 10,
      marginBottom: 12,
    },

    searchInput: {
      height: 46,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      color: colors.text,
      paddingHorizontal: 14,
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 12,
    },

    optionsContainer: {
      maxHeight: 330,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 22,
      backgroundColor: colors.surfaceSoft,
      overflow: 'hidden',
    },

    optionsContent: {
      padding: 12,
      paddingBottom: 2,
    },

    emptyText: {
      color: colors.textSoft,
      fontSize: 13,
      fontWeight: '700',
      lineHeight: 19,
      padding: 10,
    },
  });
}

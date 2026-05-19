// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { HealthQuestionOption } from '../types/plantHealth.types';

type Props = {
  option: HealthQuestionOption;
  selected: boolean;
  onPress: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaOpcionSalud({ option, selected, onPress }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  return (
    <Pressable
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
    >
      <View style={styles.textBlock}>
        <Text style={styles.label}>{option.label}</Text>

        {option.description ? (
          <Text style={styles.description}>{option.description}</Text>
        ) : null}
      </View>

      <MaterialCommunityIcons
        name={selected ? 'check-circle' : 'circle-outline'}
        size={23}
        color={selected ? colors.primary : colors.textMuted}
      />
    </Pressable>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    marginBottom: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },

  textBlock: {
    flex: 1,
    marginRight: 12,
  },

  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },

  description: {
    color: colors.textSoft,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  });
}

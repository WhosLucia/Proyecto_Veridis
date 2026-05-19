// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { StyleSheet, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';

type Props = {
  step: number;
  totalSteps: number;
};

// Componente publico que renderiza una parte de la interfaz.
export function BarraProgresoSalud({ step, totalSteps }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.item,
            index <= step && styles.itemActive,
          ]}
        />
      ))}
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 20,
  },

  item: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.border,
  },

  itemActive: {
    backgroundColor: colors.primary,
  },
  });
}

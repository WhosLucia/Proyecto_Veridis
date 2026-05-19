// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { View } from 'react-native';

import { useColoresTema } from '@/theme/useColoresTema';

import { crearEstilos } from './plantForm.styles';

type Props = {
  step: number;
  total: number;
};

// Componente publico que renderiza una parte de la interfaz.
export function ProgresoFormularioPlanta({ step, total }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.progressContainer}>
      {Array.from({ length: total }).map((_, index) => {
        const active = index <= step;

        return (
          <View
            key={index}
            style={[styles.progressItem, active && styles.progressItemActive]}
          />
        );
      })}
    </View>
  );
}

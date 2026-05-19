// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Text, View } from 'react-native';

import { useColoresTema } from '@/theme/useColoresTema';

import { crearEstilos } from './plantForm.styles';

type Props = {
  mode: 'create' | 'edit';
  step: number;
  totalSteps: number;
  currentStepLabel: string;
};

// Componente publico que renderiza una parte de la interfaz.
export function CabeceraFormularioPlanta({  mode,
  step,
  totalSteps,
  currentStepLabel,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  return (
    <View style={styles.header}>
      <Text style={styles.eyebrow}>
        {mode === 'create' ? 'Nueva planta' : 'Editar planta'}
      </Text>

      <Text style={styles.title}>
        {mode === 'create'
          ? 'Añade una planta a tu jardín'
          : 'Actualiza la información'}
      </Text>

      <Text style={styles.subtitle}>
        Paso {step + 1} de {totalSteps}: {currentStepLabel}
      </Text>
    </View>
  );
}
// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Pressable, Text, View } from 'react-native';

import { useColoresTema } from '@/theme/useColoresTema';

import { crearEstilos } from './plantForm.styles';

type Props = {
  mode: 'create' | 'edit';
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function PieFormularioPlanta({  mode,
  step,
  totalSteps,
  onBack,
  onNext,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;

  return (
    <View style={styles.footer}>
      <Pressable
        style={[styles.secondaryButton, isFirstStep && styles.disabledButton]}
        onPress={onBack}
        disabled={isFirstStep}
      >
        <Text style={styles.secondaryButtonText}>Atrás</Text>
      </Pressable>

      <Pressable style={styles.primaryButton} onPress={onNext}>
        <Text style={styles.primaryButtonText}>
          {isLastStep
            ? mode === 'create'
              ? 'Guardar planta'
              : 'Guardar cambios'
            : 'Siguiente'}
        </Text>
      </Pressable>
    </View>
  );
}
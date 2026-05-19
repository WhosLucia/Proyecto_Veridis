// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Pressable, Text, TextInput, View } from 'react-native';

import { CampoFechaCalendario } from '@/components/forms/CampoFechaCalendario';
import { useColoresTema } from '@/theme/useColoresTema';
import type { EstadoSalud, Planta } from '../../../types/myPlants.types';
import { obtenerConfigSalud } from '../../../utils/formateadoresPlanta';
import { crearEstilos } from '../plantForm.styles';

type Props = {
  selectedPlant?: Planta;
  nombrePersonalizado: string;
  fechaAdquisicion: string;
  fechaUltimoRiego: string;
  estadoSalud: EstadoSalud;
  notas: string;
  onChangeNombre: (value: string) => void;
  onChangeFecha: (value: string) => void;
  onChangeUltimoRiego: (value: string) => void;
  onChangeEstado: (value: EstadoSalud) => void;
  onChangeNotas: (value: string) => void;
};

const statusOptions: EstadoSalud[] = ['excelente', 'bueno', 'regular', 'malo', 'critico'];

// Componente publico que renderiza una parte de la interfaz.
export function PasoDetalles({
  selectedPlant,
  nombrePersonalizado,
  fechaAdquisicion,
  fechaUltimoRiego,
  estadoSalud,
  notas,
  onChangeNombre,
  onChangeFecha,
  onChangeUltimoRiego,
  onChangeEstado,
  onChangeNotas,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View>
      <Text style={styles.stepTitle}>Personaliza tu planta</Text>
      <Text style={styles.stepText}>
        Añade un nombre propio, sus fechas principales, estado inicial y notas.
      </Text>

      <Text style={styles.label}>Nombre personalizado</Text>
      <TextInput
        value={nombrePersonalizado}
        onChangeText={onChangeNombre}
        placeholder={selectedPlant?.nombre_comun ?? 'Ej: Monstera del salón'}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <CampoFechaCalendario
        label="Fecha de adquisición"
        value={fechaAdquisicion}
        onChange={onChangeFecha}
        placeholder="Selecciona la fecha de adquisición"
      />

      <CampoFechaCalendario
        label="Último riego"
        value={fechaUltimoRiego}
        onChange={onChangeUltimoRiego}
        placeholder="Selecciona la fecha del último riego"
      />

      <Text style={styles.label}>Estado de salud</Text>
      <View style={styles.statusGrid}>
        {statusOptions.map((status) => {
          const active = estadoSalud === status;
          const health = obtenerConfigSalud(status, colors);

          return (
            <Pressable
              key={status}
              style={[
                styles.statusButton,
                active && {
                  backgroundColor: health.background,
                  borderColor: health.color,
                },
              ]}
              onPress={() => onChangeEstado(status)}
            >
              <Text style={[styles.statusButtonText, active && { color: health.color }]}>
                {health.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Notas</Text>
      <TextInput
        value={notas}
        onChangeText={onChangeNotas}
        placeholder="Ej: revisar hojas nuevas esta semana"
        placeholderTextColor={colors.textMuted}
        style={[styles.input, styles.textArea]}
        multiline
      />
    </View>
  );
}

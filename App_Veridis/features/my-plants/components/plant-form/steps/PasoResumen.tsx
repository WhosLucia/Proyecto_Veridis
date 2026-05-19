// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Image, Text, View } from 'react-native';

import { useColoresTema } from '@/theme/useColoresTema';

import type {
  EstadoSalud,
  Planta,
  UbicacionOption,
} from '../../../types/myPlants.types';
import {
  formatearFrecuencia,
  formatearHumedad,
  formatearLuz,
  formatearRangoTemperatura,
  obtenerConfigSalud,
} from '../../../utils/formateadoresPlanta';
import { crearEstilos } from '../plantForm.styles';

type Props = {
  plant: Planta;
  location: UbicacionOption | undefined;
  nombrePersonalizado: string;
  fechaAdquisicion: string;
  fechaUltimoRiego: string;
  estadoSalud: EstadoSalud;
  notas: string;
  photoUri: string | null;
};

// Componente publico que renderiza una parte de la interfaz.
export function PasoResumen({  plant,
  location,
  nombrePersonalizado,
  fechaAdquisicion,
  fechaUltimoRiego,
  estadoSalud,
  notas,
  photoUri,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const health = obtenerConfigSalud(estadoSalud, colors);

  const previewImage = photoUri || plant.url_img_default;

  return (
    <View>
      <Text style={styles.stepTitle}>Resumen</Text>
      <Text style={styles.stepText}>
        Revisa la información antes de guardar la planta.
      </Text>

      <View style={styles.summaryCard}>
        {previewImage ? (
          <Image source={{ uri: previewImage }} style={styles.summaryImage} />
        ) : null}

        <Text style={styles.summaryName}>
          {nombrePersonalizado || plant.nombre_comun}
        </Text>

        <Text style={styles.summaryScientific}>
          {plant.nombre_cientifico ?? plant.nombre_comun}
        </Text>

        <View style={styles.summaryInfoGrid}>
          <ElementoResumen label="Ubicación" value={location?.nombre ?? 'Sin ubicación'} />
          <ElementoResumen label="Fecha" value={fechaAdquisicion || 'Sin fecha'} />
          <ElementoResumen label="Último riego" value={fechaUltimoRiego || 'Sin fecha'} />
          <ElementoResumen label="Estado" value={health.label} />
          <ElementoResumen label="Luz" value={formatearLuz(plant.luz_recomendada)} />
          <ElementoResumen
            label="Humedad"
            value={formatearHumedad(plant.humedad_recomendada)}
          />
          <ElementoResumen
            label="Temperatura"
            value={formatearRangoTemperatura(plant.temp_minima, plant.temp_maxima)}
          />
          <ElementoResumen
            label="Riego"
            value={formatearFrecuencia(plant.frecuencia_riego)}
          />
          <ElementoResumen
            label="Abono"
            value={formatearFrecuencia(plant.frecuencia_abono)}
          />
        </View>

        {photoUri ? (
          <View style={styles.notesPreview}>
            <Text style={styles.notesPreviewTitle}>Foto personalizada</Text>
            <Text style={styles.notesPreviewText}>
              Se usará la imagen seleccionada como portada de esta planta.
            </Text>
          </View>
        ) : (
          <View style={styles.notesPreview}>
            <Text style={styles.notesPreviewTitle}>Imagen por defecto</Text>
            <Text style={styles.notesPreviewText}>
              No se ha seleccionado una foto propia, así que se usará la imagen de la especie.
            </Text>
          </View>
        )}

        {notas.trim() ? (
          <View style={styles.notesPreview}>
            <Text style={styles.notesPreviewTitle}>Notas</Text>
            <Text style={styles.notesPreviewText}>{notas}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function ElementoResumen({ label, value }: { label: string; value: string }) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

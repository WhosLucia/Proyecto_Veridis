// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { ScrollView, Text, View } from 'react-native';

import { useColoresTema } from '@/theme/useColoresTema';

import { useFormularioRegistroPlanta } from '../../hooks/useFormularioRegistroPlanta';
import type { UsuarioPlantaFormValues } from '../../types/myPlants.types';

import { PieFormularioPlanta } from './PieFormularioPlanta';
import { CabeceraFormularioPlanta } from './CabeceraFormularioPlanta';
import { ProgresoFormularioPlanta } from './ProgresoFormularioPlanta';

import { PasoDetalles } from './steps/PasoDetalles';
import { PasoUbicacion } from './steps/PasoUbicacion';
import { PasoFoto } from './steps/PasoFoto';
import { PasoEspecie } from './steps/PasoEspecie';
import { PasoResumen } from './steps/PasoResumen';

import { crearEstilos } from './plantForm.styles';

type PlantRegistrationFormProps = {
  mode: 'create' | 'edit';
  initialValues?: UsuarioPlantaFormValues;
  onSubmit: (values: UsuarioPlantaFormValues) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function FormularioRegistroPlanta({  mode,
  initialValues,
  onSubmit,
}: PlantRegistrationFormProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const form = useFormularioRegistroPlanta({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <CabeceraFormularioPlanta
        mode={mode}
        step={form.step}
        totalSteps={form.totalSteps}
        currentStepLabel={form.currentStepLabel}
      />

      <ProgresoFormularioPlanta step={form.step} total={form.totalSteps} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
        {form.step === 0 ? (
          <PasoEspecie
            plants={form.filteredCatalog}
            selectedPlantId={form.idPlanta}
            search={form.search}
            onSearchChange={form.setSearch}
            onSelectPlant={form.setIdPlanta}
          />
        ) : null}

        {form.step === 1 ? (
          <PasoUbicacion
            locations={form.locations}
            selectedLocationId={form.idUbicacion}
            loading={form.locationsLoading}
            error={form.locationsError}
            onSelectLocation={form.setIdUbicacion}
          />
        ) : null}

        {form.step === 2 ? (
          <PasoDetalles
            selectedPlant={form.selectedPlant}
            nombrePersonalizado={form.nombrePersonalizado}
            fechaAdquisicion={form.fechaAdquisicion}
            fechaUltimoRiego={form.fechaUltimoRiego}
            estadoSalud={form.estadoSalud}
            notas={form.notas}
            onChangeNombre={form.setNombrePersonalizado}
            onChangeFecha={form.setFechaAdquisicion}
            onChangeUltimoRiego={form.setFechaUltimoRiego}
            onChangeEstado={form.setEstadoSalud}
            onChangeNotas={form.setNotas}
          />
        ) : null}

        {form.step === 3 ? (
          <PasoFoto
            selectedPlant={form.selectedPlant}
            photoUri={form.fotoPortadaUri}
            onChangePhoto={form.setFotoPortadaUri}
          />
        ) : null}

        {form.step === 4 && form.selectedPlant ? (
          <PasoResumen
            plant={form.selectedPlant}
            location={form.selectedLocation}
            nombrePersonalizado={form.nombrePersonalizado}
            fechaAdquisicion={form.fechaAdquisicion}
            fechaUltimoRiego={form.fechaUltimoRiego}
            estadoSalud={form.estadoSalud}
            notas={form.notas}
            photoUri={form.fotoPortadaUri}
          />
        ) : null}
      </ScrollView>

      {form.formError ? <Text style={styles.formErrorText}>{form.formError}</Text> : null}

      <PieFormularioPlanta
        mode={mode}
        step={form.step}
        totalSteps={form.totalSteps}
        onBack={form.manejarAtras}
        onNext={form.manejarSiguiente}
      />
    </View>
  );
}

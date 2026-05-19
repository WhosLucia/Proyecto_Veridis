// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useEffect, useMemo, useState } from 'react';

import { useMisPlantas } from '../context/MyPlantsContext';
import type { EstadoSalud, UsuarioPlantaFormValues } from '../types/myPlants.types';
import { obtenerHoyISO } from '../utils/obtenerHoyISO';

// Constante publica usada por otras partes de la app.
export const PLANT_FORM_STEPS = ['Especie', 'Ubicación', 'Detalles', 'Foto', 'Resumen'];

type Params = {
  initialValues?: UsuarioPlantaFormValues;
  onSubmit: (values: UsuarioPlantaFormValues) => void;
};

// Hook publico que devuelve estado y acciones listas para usar.
export function useFormularioRegistroPlanta({ initialValues, onSubmit }: Params) {
  const { plantCatalog, locations, locationsLoading, locationsError } = useMisPlantas();

  const [step, setStep] = useState(0);
  const [search, setSearch] = useState('');

  const [idPlanta, setIdPlanta] = useState(
    initialValues?.id_planta ?? plantCatalog[0]?.id_planta ?? 0
  );

  const [idUbicacion, setIdUbicacion] = useState<number | null>(
    initialValues?.id_ubicacion ?? locations[0]?.id_ubicacion ?? null
  );

  const [nombrePersonalizado, setNombrePersonalizado] = useState(
    initialValues?.nombre_personalizado ?? ''
  );

  const [fechaAdquisicion, setFechaAdquisicion] = useState(
    initialValues?.fecha_adquisicion ?? obtenerHoyISO()
  );

  const [fechaUltimoRiego, setFechaUltimoRiego] = useState(
    initialValues?.fecha_ultimo_riego ?? obtenerHoyISO()
  );

  const [estadoSalud, setEstadoSalud] = useState<EstadoSalud>(
    initialValues?.estado_salud ?? 'bueno'
  );

  const [fotoPortadaUri, setFotoPortadaUri] = useState(initialValues?.foto_portada_uri ?? null);

  const [notas, setNotas] = useState(initialValues?.notas ?? '');
  const [formError, setFormError] = useState<string | null>(null);

  const selectedPlant = plantCatalog.find((plant) => plant.id_planta === idPlanta);

  const selectedLocation = locations.find((location) => location.id_ubicacion === idUbicacion);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    if (locations.length === 0) {
      setIdUbicacion(null);
      return;
    }

    const selectedLocationStillExists = locations.some(
      (location) => location.id_ubicacion === idUbicacion
    );

    if (!selectedLocationStillExists) {
      setIdUbicacion(locations[0].id_ubicacion);
    }
  }, [idUbicacion, locations]);

  const filteredCatalog = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return plantCatalog.filter((plant) => {
      return (
        plant.nombre_comun.toLowerCase().includes(normalizedSearch) ||
        (plant.nombre_cientifico ?? '').toLowerCase().includes(normalizedSearch)
      );
    });
  }, [plantCatalog, search]);

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarSiguiente() {
    setFormError(null);
    const isLastStep = step === PLANT_FORM_STEPS.length - 1;

    if (!isLastStep) {
      setStep((prev) => prev + 1);
      return;
    }

    if (!selectedPlant) return;

    if (fechaUltimoRiego.trim() && !selectedPlant.frecuencia_riego) {
      setFormError('No se ha podido calcular el próximo riego.');
      return;
    }

    onSubmit({
      id_planta: idPlanta,
      id_ubicacion: idUbicacion,
      nombre_personalizado: nombrePersonalizado.trim() || null,
      fecha_adquisicion: fechaAdquisicion.trim() || null,
      fecha_ultimo_riego: fechaUltimoRiego.trim() || obtenerHoyISO(),
      estado_salud: estadoSalud,
      notas: notas.trim() || null,
      foto_portada_uri: fotoPortadaUri,
    });
  }

  // Gestiona una accion del usuario dentro de esta pantalla.
  function manejarAtras() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  return {
    step,
    totalSteps: PLANT_FORM_STEPS.length,
    currentStepLabel: PLANT_FORM_STEPS[step],

    search,
    setSearch,

    plantCatalog,
    filteredCatalog,
    locations,
    locationsLoading,
    locationsError,

    idPlanta,
    setIdPlanta,

    idUbicacion,
    setIdUbicacion,

    selectedPlant,
    selectedLocation,

    nombrePersonalizado,
    setNombrePersonalizado,

    fechaAdquisicion,
    setFechaAdquisicion,

    fechaUltimoRiego,
    setFechaUltimoRiego,

    estadoSalud,
    setEstadoSalud,

    notas,
    setNotas,

    formError,

    fotoPortadaUri,
    setFotoPortadaUri,

    manejarSiguiente,
    manejarAtras,
  };
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { obtenerPlantas } from '@/features/plants/services/plantaService';
import { useUsuario } from '@/features/user/context/UserContext';
import { obtenerUbicacionesUsuario } from '@/features/profile/services/locations.service';
import {
  actualizarPlantaUsuario,
  crearPlantaUsuario,
  eliminarPlantaUsuario,
  obtenerPlantasUsuario,
} from '../services/plantaUsuarioService';
import { myPlantsMock, plantasMock, ubicacionesOptionsMock } from '../data/myPlantsMockData';
import type {
  MyPlant,
  Planta,
  UbicacionOption,
  UsuarioPlantaFormValues,
} from '../types/myPlants.types';

type MyPlantsContextValue = {
  plants: MyPlant[];
  plantCatalog: Planta[];
  locations: UbicacionOption[];
  loading: boolean;
  locationsLoading: boolean;
  error: string | null;
  locationsError: string | null;
  obtenerPlantaPorId: (id_usuario_planta: number) => MyPlant | undefined;
  agregarPlantaUsuario: (_values: UsuarioPlantaFormValues) => Promise<MyPlant | null>;
  actualizarPlantaUsuarioContexto: (
    _id_usuario_planta: number,
    _values: UsuarioPlantaFormValues
  ) => Promise<MyPlant | null>;
  eliminarPlantaUsuarioContexto: (_id_usuario_planta: number) => Promise<void>;
  reloadMyPlantsData: () => Promise<void>;
};

// Contexto interno que guarda el contrato compartido de esta funcionalidad.
const MyPlantsContext = createContext<MyPlantsContextValue | null>(null);

// Adapta datos de la API al formato que espera la app.
function mapearPlantaCatalogoAMiPlantaCatalogo(plant: Awaited<ReturnType<typeof obtenerPlantas>>[number]): Planta {
  return {
    id_planta: plant.id_planta,
    id_familia: plant.id_familia,
    nombre_comun: plant.nombre_comun,
    nombre_cientifico: plant.nombre_cientifico,
    tipo: plant.tipo,
    descripcion: plant.descripcion,
    url_img_default: plant.url_img_default,
    apta_exterior_temp: plant.apta_exterior_temp,
    luz_recomendada: plant.luz_recomendada,
    humedad_recomendada: plant.humedad_recomendada,
    temp_minima: plant.temp_minima,
    temp_maxima: plant.temp_maxima,
    tolerancia_sol: plant.tolerancia_sol,
    frecuencia_riego: plant.frecuencia_riego,
    frecuencia_abono: plant.frecuencia_abono,
  };
}

// Componente publico que renderiza una parte de la interfaz.
export function ProveedorMisPlantas({ children }: PropsWithChildren) {
  const { user } = useUsuario();
  const [plants, setPlants] = useState<MyPlant[]>([]);
  const [plantCatalog, setPlantCatalog] = useState<Planta[]>([]);
  const [locations, setLocations] = useState<UbicacionOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationsError, setLocationsError] = useState<string | null>(null);

  const loadData = useCallback(
    async (shouldUpdate: () => boolean = () => true) => {
      if (!user) {
        setPlants([]);
        setPlantCatalog([]);
        setLocations([]);
        setLocationsError(null);
        return;
      }

      setLoading(true);
      setLocationsLoading(true);
      setError(null);
      setLocationsError(null);

      const [apiPlantsResult, apiPlantCatalogResult, apiLocationsResult] = await Promise.allSettled([
        obtenerPlantasUsuario(user.idUsuario),
        obtenerPlantas(),
        obtenerUbicacionesUsuario(user.idUsuario),
      ]);

      if (shouldUpdate()) {
        if (apiPlantsResult.status === 'fulfilled') {
          setPlants(apiPlantsResult.value);
        } else {
          setPlants(myPlantsMock);
          setError(
            apiPlantsResult.reason instanceof Error
              ? apiPlantsResult.reason.message
              : 'No se han podido cargar tus plantas.'
          );
        }

        if (apiPlantCatalogResult.status === 'fulfilled') {
          setPlantCatalog(apiPlantCatalogResult.value.map(mapearPlantaCatalogoAMiPlantaCatalogo));
        } else {
          setPlantCatalog(plantasMock);
          setError(
            apiPlantCatalogResult.reason instanceof Error
              ? apiPlantCatalogResult.reason.message
              : 'No se ha podido cargar el catalogo de plantas.'
          );
        }

        if (apiLocationsResult.status === 'fulfilled') {
          setLocations(
            apiLocationsResult.value.map((location) => ({
              id_ubicacion: location.id_ubicacion,
              nombre: location.nombre,
            }))
          );
        } else {
          setLocations(ubicacionesOptionsMock);
          setLocationsError('No se han podido cargar las ubicaciones.');
        }

        setLoading(false);
        setLocationsLoading(false);
      }
    },
    [user]
  );

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    loadData(() => active);

    return () => {
      active = false;
    };
  }, [loadData]);

  const reloadMyPlantsData = useCallback(async () => {
    await loadData();
  }, [loadData]);

  const value = useMemo<MyPlantsContextValue>(() => {
    function obtenerPlantaPorId(id_usuario_planta: number) {
      return plants.find((plant) => plant.id_usuario_planta === id_usuario_planta);
    }

    async function agregarPlantaUsuario(values: UsuarioPlantaFormValues) {
      if (!user) return null;

      const createdPlant = await crearPlantaUsuario(user.idUsuario, values);
      setPlants((prev) => [createdPlant, ...prev]);
      return createdPlant;
    }

    async function actualizarPlantaUsuarioContexto(
      idPlantaUsuario: number,
      values: UsuarioPlantaFormValues
    ) {
      if (!user) return null;

      const updatedPlant = await actualizarPlantaUsuario(
        user.idUsuario,
        idPlantaUsuario,
        values
      );
      setPlants((prev) =>
        prev.map((plant) =>
          plant.id_usuario_planta === idPlantaUsuario ? updatedPlant : plant
        )
      );
      return updatedPlant;
    }

    async function eliminarPlantaUsuarioContexto(idPlantaUsuario: number) {
      await eliminarPlantaUsuario(idPlantaUsuario);
      setPlants((prev) => prev.filter((plant) => plant.id_usuario_planta !== idPlantaUsuario));
    }

    return {
      plants,
      plantCatalog,
      locations,
      loading,
      locationsLoading,
      error,
      locationsError,
      obtenerPlantaPorId,
      agregarPlantaUsuario,
      actualizarPlantaUsuarioContexto,
      eliminarPlantaUsuarioContexto,
      reloadMyPlantsData,
    };
  }, [
    error,
    loading,
    locations,
    locationsError,
    locationsLoading,
    plantCatalog,
    plants,
    reloadMyPlantsData,
    user,
  ]);

  return <MyPlantsContext.Provider value={value}>{children}</MyPlantsContext.Provider>;
}

// Hook publico que devuelve estado y acciones listas para usar.
export function useMisPlantas() {
  const context = useContext(MyPlantsContext);

  if (!context) {
    throw new Error('useMisPlantas debe usarse dentro de ProveedorMisPlantas');
  }

  return context;
}

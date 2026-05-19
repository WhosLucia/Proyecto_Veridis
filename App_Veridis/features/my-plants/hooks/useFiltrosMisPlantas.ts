// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useMemo, useState } from 'react';

import type {
  MyPlant,
  MyPlantsLocationFilter,
} from '../types/myPlants.types';

// Hook publico que devuelve estado y acciones listas para usar.
export function useFiltrosMisPlantas(plants: MyPlant[]) {
  const [search, setSearch] = useState('');
  const [activeLocation, setActiveLocation] =
    useState<MyPlantsLocationFilter>('all');

  const locations = useMemo(() => {
    return Array.from(new Set(plants.map((plant) => plant.ubicacion_nombre)));
  }, [plants]);

  const filteredPlants = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return plants.filter((plant) => {
      const visibleName =
        plant.nombre_personalizado || plant.planta.nombre_comun;

      const matchesSearch =
        visibleName.toLowerCase().includes(normalizedSearch) ||
        plant.planta.nombre_comun.toLowerCase().includes(normalizedSearch) ||
        (plant.planta.nombre_cientifico ?? '')
          .toLowerCase()
          .includes(normalizedSearch) ||
        plant.ubicacion_nombre.toLowerCase().includes(normalizedSearch);

      const matchesLocation =
        activeLocation === 'all' || plant.ubicacion_nombre === activeLocation;

      return matchesSearch && matchesLocation;
    });
  }, [plants, search, activeLocation]);

  return {
    search,
    setSearch,
    activeLocation,
    setActiveLocation,
    locations,
    filteredPlants,
  };
}
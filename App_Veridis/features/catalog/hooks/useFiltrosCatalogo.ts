// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useEffect, useMemo, useState } from 'react';

import { obtenerFamilias, obtenerPlantas } from '@/features/plants/services/plantaService';
import { catalogPlantsMock, plantFamiliesMock } from '../data/catalogMockData';
import type { CatalogPlant, CatalogPlantType, PlantFamily } from '../types/catalog.types';

// Hook publico que devuelve estado y acciones listas para usar.
export function useFiltrosCatalogo() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<CatalogPlantType>('all');
  const [expandedFamilyId, setExpandedFamilyId] = useState<number | null>(null);
  const [families, setFamilies] = useState<PlantFamily[]>(plantFamiliesMock);
  const [plants, setPlants] = useState<CatalogPlant[]>(catalogPlantsMock);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarCatalogo() {
      setLoading(true);
      setError(null);

      try {
        const [apiFamilies, apiPlants] = await Promise.all([obtenerFamilias(), obtenerPlantas()]);

        if (active) {
          setFamilies(apiFamilies);
          setPlants(apiPlants);
        }
      } catch {
        if (active) {
          setFamilies(plantFamiliesMock);
          setPlants(catalogPlantsMock);
          setError('No se ha podido cargar el catalogo desde la API. Se muestran datos temporales.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    cargarCatalogo();

    return () => {
      active = false;
    };
  }, []);

  const availableTypes = useMemo(() => {
    return Array.from(new Set(plants.map((plant) => plant.tipo)));
  }, [plants]);

  const filteredFamilies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return families
      .map((family) => {
        const filteredPlants = plants.filter((plant) => {
          const belongsToFamily = plant.id_familia === family.id_familia;
          const matchesType = activeType === 'all' || plant.tipo === activeType;
          const matchesSearch =
            normalizedSearch.length === 0 ||
            plant.nombre_comun.toLowerCase().includes(normalizedSearch) ||
            (plant.nombre_cientifico ?? '').toLowerCase().includes(normalizedSearch) ||
            family.nombre.toLowerCase().includes(normalizedSearch);

          return belongsToFamily && matchesType && matchesSearch;
        });

        return { family, plants: filteredPlants };
      })
      .filter((group) => group.plants.length > 0);
  }, [activeType, families, plants, search]);

  function alternarFamilia(id_familia: number) {
    setExpandedFamilyId((current) => (current === id_familia ? null : id_familia));
  }

  return {
    search,
    setSearch,
    activeType,
    setActiveType,
    expandedFamilyId,
    filteredFamilies,
    availableTypes,
    loading,
    error,
    alternarFamilia,
  };
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useEffect, useState } from 'react';

import { useUsuario } from '@/features/user/context/UserContext';
import {
  crearUbicacionUsuario,
  eliminarUbicacionUsuario,
  obtenerUbicacionesUsuario,
  actualizarUbicacionUsuario,
} from '../services/locations.service';
import type { Ubicacion, UbicacionFormValues } from '../types/profile.types';

// Hook publico que devuelve estado y acciones listas para usar.
export function useUbicacionesPerfil() {
  const { user } = useUsuario();
  const [locations, setLocations] = useState<Ubicacion[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Ubicacion | null>(null);
  const [editingLocation, setEditingLocation] = useState<Ubicacion | null>(null);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [isFormModalVisible, setFormModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarUbicaciones() {
      if (!user) {
        setLocations([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const apiLocations = await obtenerUbicacionesUsuario(user.idUsuario);

        if (active) {
          setLocations(apiLocations);
        }
      } catch (requestError) {
        if (active) {
          setLocations([]);
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se han podido cargar las ubicaciones.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    cargarUbicaciones();

    return () => {
      active = false;
    };
  }, [user]);

  function abrirDetalleUbicacion(location: Ubicacion) {
    setSelectedLocation(location);
    setDetailModalVisible(true);
  }

  function cerrarDetalleUbicacion() {
    setDetailModalVisible(false);
  }

  function abrirCrearUbicacion() {
    setEditingLocation(null);
    setFormModalVisible(true);
  }

  function abrirEditarUbicacion(location: Ubicacion) {
    setEditingLocation(location);
    setDetailModalVisible(false);
    setFormModalVisible(true);
  }

  function cerrarFormulario() {
    setFormModalVisible(false);
    setEditingLocation(null);
  }

  async function crearUbicacion(values: UbicacionFormValues) {
    if (!user) return;

    const newLocation = await crearUbicacionUsuario(user.idUsuario, values);
    setLocations((prev) => [newLocation, ...prev]);
    setSelectedLocation(newLocation);
  }

  async function actualizarUbicacion(idUbicacion: number, values: UbicacionFormValues) {
    if (!user) return;

    const updatedLocation = await actualizarUbicacionUsuario(user.idUsuario, idUbicacion, values);
    setLocations((prev) =>
      prev.map((location) =>
        location.id_ubicacion === idUbicacion ? updatedLocation : location
      )
    );
    setSelectedLocation(updatedLocation);
  }

  async function eliminarUbicacion(idUbicacion: number) {
    await eliminarUbicacionUsuario(idUbicacion);

    setLocations((prev) => prev.filter((location) => location.id_ubicacion !== idUbicacion));

    if (selectedLocation?.id_ubicacion === idUbicacion) {
      setSelectedLocation(null);
      setDetailModalVisible(false);
    }

    if (editingLocation?.id_ubicacion === idUbicacion) {
      setEditingLocation(null);
      setFormModalVisible(false);
    }
  }

  return {
    locations,
    selectedLocation,
    isDetailModalVisible,
    isFormModalVisible,
    editingLocation,
    loading,
    error,
    abrirDetalleUbicacion,
    cerrarDetalleUbicacion,
    abrirCrearUbicacion,
    abrirEditarUbicacion,
    cerrarFormulario,
    crearUbicacion,
    actualizarUbicacion,
    eliminarUbicacion,
  };
}

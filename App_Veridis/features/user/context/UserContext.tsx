// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { loginUsuario, registrarUsuario } from '@/features/auth/services/authService';
import {
  actualizarDatosCuenta,
  actualizarLocalizacionPrincipal,
  cambiarContrasena,
} from '@/features/user/services/userService';
import type {
  ActualizarCuentaRequest,
  CambiarContrasenaRequest,
  Localizacion,
  Usuario,
} from '@/types/user.types';

const USER_STORAGE_KEY = 'veridis_usuario_actual';

type RegisterParams = {
  nombre: string;
  email: string;
  contrasena: string;
  localizacionPrincipal: Localizacion;
};

type LoginParams = {
  email: string;
  contrasena: string;
};

type UserContextValue = {
  user: Usuario | null;
  localizacionPrincipal: Localizacion | null;
  loadingUser: boolean;
  registrarUsuarioContexto: (params: RegisterParams) => Promise<Usuario>;
  iniciarSesionUsuario: (params: LoginParams) => Promise<Usuario>;
  cerrarSesionUsuario: () => Promise<void>;
  actualizarDatosCuentaContexto: (datos: ActualizarCuentaRequest) => Promise<Usuario>;
  actualizarContrasena: (datos: CambiarContrasenaRequest) => Promise<Usuario>;
  actualizarUbicacionPrincipal: (localizacion: Localizacion) => Promise<Usuario>;
};

// Contexto interno que guarda el contrato compartido de esta funcionalidad.
const UserContext = createContext<UserContextValue | null>(null);

// Componente publico que renderiza una parte de la interfaz.
export function ProveedorUsuario({ children }: PropsWithChildren) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    async function cargarUsuarioGuardado() {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        setUser(storedUser ? (JSON.parse(storedUser) as Usuario) : null);
      } finally {
        setLoadingUser(false);
      }
    }

    cargarUsuarioGuardado();
  }, []);

  async function guardarUsuario(nextUser: Usuario | null) {
    setUser(nextUser);

    if (nextUser) {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
      return;
    }

    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }

  const value = useMemo<UserContextValue>(() => {
    async function registrarUsuarioContexto(params: RegisterParams) {
      const nextUser = await registrarUsuario({
        nombre: params.nombre,
        email: params.email,
        contrasena: params.contrasena,
        idLocalizacionDefault: params.localizacionPrincipal.idLocalizacion,
      });

      await guardarUsuario(nextUser);
      return nextUser;
    }

    async function iniciarSesionUsuario(params: LoginParams) {
      const nextUser = await loginUsuario(params);
      await guardarUsuario(nextUser);
      return nextUser;
    }

    async function cerrarSesionUsuario() {
      await guardarUsuario(null);
    }

    async function actualizarDatosCuentaContexto(datos: ActualizarCuentaRequest) {
      if (!user) {
        throw new Error('No hay usuario activo.');
      }

      const updatedUser = await actualizarDatosCuenta(user, datos);
      await guardarUsuario(updatedUser);
      return updatedUser;
    }

    async function actualizarContrasena(datos: CambiarContrasenaRequest) {
      if (!user) {
        throw new Error('No hay usuario activo.');
      }

      const updatedUser = await cambiarContrasena(user, datos);
      await guardarUsuario(updatedUser);
      return updatedUser;
    }

    async function actualizarUbicacionPrincipal(localizacion: Localizacion) {
      if (!user) {
        throw new Error('No hay usuario activo.');
      }

      const updatedUser = await actualizarLocalizacionPrincipal(user, localizacion);
      await guardarUsuario(updatedUser);
      return updatedUser;
    }

    return {
      user,
      localizacionPrincipal: user?.localizacionPrincipal ?? null,
      loadingUser,
      registrarUsuarioContexto,
      iniciarSesionUsuario,
      cerrarSesionUsuario,
      actualizarDatosCuentaContexto,
      actualizarContrasena,
      actualizarUbicacionPrincipal,
    };
  }, [loadingUser, user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Hook publico que devuelve estado y acciones listas para usar.
export function useUsuario() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUsuario debe usarse dentro de ProveedorUsuario');
  }

  return context;
}

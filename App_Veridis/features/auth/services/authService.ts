// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';
import type { Localizacion, Usuario } from '@/types/user.types';

type AuthResponse = {
  idUsuario: number;
  nombre: string;
  email: string;
  fechaRegistro?: string;
  localizacionDefault?: Localizacion | null;
};

type RegistrarUsuarioRequest = {
  nombre: string;
  email: string;
  contrasena: string;
  idLocalizacionDefault: number;
};

type LoginUsuarioRequest = {
  email: string;
  contrasena: string;
};

// Adapta datos de la API al formato que espera la app.
function mapearRespuestaAuth(response: AuthResponse): Usuario {
  // La API usa localizacionDefault; la app trabaja con localizacionPrincipal.
  return {
    idUsuario: response.idUsuario,
    nombre: response.nombre,
    email: response.email,
    fechaRegistro: response.fechaRegistro,
    localizacionPrincipal: response.localizacionDefault ?? null,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function registrarUsuario(datos: RegistrarUsuarioRequest) {
  const response = await apiClient.post<AuthResponse>(endpoints.auth.registro, datos);
  return mapearRespuestaAuth(response);
}

// Funcion asincrona publica para leer o guardar datos.
export async function loginUsuario(datos: LoginUsuarioRequest) {
  const response = await apiClient.post<AuthResponse>(endpoints.auth.login, datos);
  return mapearRespuestaAuth(response);
}

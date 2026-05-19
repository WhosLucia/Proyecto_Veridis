// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';
import type {
  ActualizarCuentaRequest,
  CambiarContrasenaRequest,
  Localizacion,
  Usuario,
} from '@/types/user.types';

type ApiUsuario = {
  idUsuario: number;
  nombre: string;
  email: string;
  contrasena?: string;
  fechaRegistro?: string;
  localizacionDefault?: Localizacion | null;
};

// Adapta datos de la API al formato que espera la app.
function mapearUsuarioApi(usuario: ApiUsuario): Usuario {
  return {
    idUsuario: usuario.idUsuario,
    nombre: usuario.nombre,
    email: usuario.email,
    contrasena: usuario.contrasena,
    fechaRegistro: usuario.fechaRegistro,
    localizacionPrincipal: usuario.localizacionDefault ?? null,
  };
}

// Adapta datos de la API al formato que espera la app.
function mapearUsuarioAApi(usuario: Usuario): ApiUsuario {
  return {
    idUsuario: usuario.idUsuario,
    nombre: usuario.nombre,
    email: usuario.email,
    contrasena: usuario.contrasena,
    fechaRegistro: usuario.fechaRegistro,
    localizacionDefault: usuario.localizacionPrincipal,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerUsuarioPorId(idUsuario: number) {
  const usuario = await apiClient.get<ApiUsuario>(endpoints.usuarios.byId(idUsuario));
  return mapearUsuarioApi(usuario);
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerUsuarioActual(usuario: Usuario | null) {
  if (!usuario) return null;
  return obtenerUsuarioPorId(usuario.idUsuario);
}

// Funcion asincrona publica para leer o guardar datos.
export async function actualizarUsuario(idUsuario: number, datos: ActualizarCuentaRequest) {
  const usuarioActual = await obtenerUsuarioPorId(idUsuario);
  const response = await apiClient.put<ApiUsuario>(endpoints.usuarios.byId(idUsuario), {
    ...mapearUsuarioAApi(usuarioActual),
    nombre: datos.nombre,
    email: datos.email,
  });

  return mapearUsuarioApi(response);
}

// Funcion asincrona publica para leer o guardar datos.
export async function actualizarDatosCuenta(usuario: Usuario, datos: ActualizarCuentaRequest) {
  return actualizarUsuario(usuario.idUsuario, datos);
}

// Funcion asincrona publica para leer o guardar datos.
export async function cambiarContrasenaPorId(idUsuario: number, datos: CambiarContrasenaRequest) {
  const usuarioActual = await obtenerUsuarioPorId(idUsuario);

  if (usuarioActual.contrasena && usuarioActual.contrasena !== datos.contrasenaActual) {
    throw new Error('La contrasena actual no es correcta.');
  }

  const response = await apiClient.put<ApiUsuario>(endpoints.usuarios.byId(idUsuario), {
    ...mapearUsuarioAApi(usuarioActual),
    contrasena: datos.nuevaContrasena,
  });

  return mapearUsuarioApi(response);
}

// Funcion asincrona publica para leer o guardar datos.
export async function cambiarContrasena(usuario: Usuario, datos: CambiarContrasenaRequest) {
  return cambiarContrasenaPorId(usuario.idUsuario, datos);
}

// Funcion asincrona publica para leer o guardar datos.
export async function actualizarLocalizacionPrincipalPorId(
  idUsuario: number,
  localizacionPrincipal: Localizacion
) {
  const usuarioActual = await obtenerUsuarioPorId(idUsuario);
  const response = await apiClient.put<ApiUsuario>(endpoints.usuarios.byId(idUsuario), {
    ...mapearUsuarioAApi(usuarioActual),
    localizacionDefault: localizacionPrincipal,
  });

  return mapearUsuarioApi(response);
}

// Funcion asincrona publica para leer o guardar datos.
export async function actualizarLocalizacionPrincipal(
  usuario: Usuario,
  localizacionPrincipal: Localizacion
) {
  return actualizarLocalizacionPrincipalPorId(usuario.idUsuario, localizacionPrincipal);
}

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { apiClient } from '@/services/api/apiClient';
import { endpoints } from '@/services/api/endpoints';

export {
  actualizarDatosCuenta,
  actualizarLocalizacionPrincipal,
  cambiarContrasena,
} from '@/features/user/services/userService';

export type UserSettingsConfig = {
  idConfiguracion?: number;
  tema: string;
  idioma: string;
  notificaciones: boolean;
};

type ApiUserSettingsConfig = {
  idConfiguracion?: number;
  tema?: string | null;
  idioma?: string | null;
  notificaciones?: boolean | null;
};

// Adapta datos de la API al formato que espera la app.
function mapearConfigApi(config: ApiUserSettingsConfig): UserSettingsConfig {
  return {
    idConfiguracion: config.idConfiguracion,
    tema: config.tema ?? 'sistema',
    idioma: config.idioma ?? 'es',
    notificaciones: config.notificaciones ?? true,
  };
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerConfiguracionUsuario(idUsuario: number) {
  try {
    const config = await apiClient.get<ApiUserSettingsConfig>(endpoints.usuarios.config(idUsuario));
    return mapearConfigApi(config);
  } catch {
    return {
      tema: 'sistema',
      idioma: 'es',
      notificaciones: true,
    };
  }
}

// Funcion asincrona publica para leer o guardar datos.
export async function guardarConfiguracionUsuario(
  idUsuario: number,
  config: UserSettingsConfig
) {
  const response = await apiClient.put<ApiUserSettingsConfig>(endpoints.usuarios.config(idUsuario), {
    tema: config.tema,
    idioma: config.idioma,
    notificaciones: config.notificaciones,
  });

  return mapearConfigApi(response);
}

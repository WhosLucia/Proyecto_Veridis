// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type ProfileIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export type Usuario = {
  id_usuario: number;
  nombre: string;
  email: string;
  fecha_registro: string;
  id_localizacion_default: number | null;
};

export type ConfigUsuario = {
  id_configuracion: number;
  id_usuario: number;
  idioma: 'es' | 'en';
  notificaciones: boolean;
};

export type UserProfileView = {
  id_usuario: number;
  nombre: string;
  email: string;
  fecha_registro: string;
  localizacion_default: string;
  idioma: 'es' | 'en';
  notificaciones: boolean;
  total_plantas: number | string;
  total_ubicaciones: number;
};

export type LightLevel =
  | 'plena_sombra'
  | 'sombra_parcial'
  | 'luz_indirecta'
  | 'luz_directa';

export type HumidityLevel = 'baja' | 'media' | 'alta';

export type Ubicacion = {
  id_ubicacion: number;
  id_usuario: number;
  id_localizacion: number | null;
  nombre: string;
  descripcion: string | null;
  luz: LightLevel;
  humedad: HumidityLevel;
  es_exterior: 0 | 1;
};

export type UbicacionFormValues = {
  nombre: string;
  descripcion: string;
  luz: LightLevel;
  humedad: HumidityLevel;
  es_exterior: boolean;
};

export type ProfileMenuItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: ProfileIconName;
  action:
    | 'personal-data'
    | 'notifications'
    | 'security'
    | 'settings'
    | 'help'
    | 'logout';
};

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export type Localizacion = {
  idLocalizacion: number;
  ciudad: string;
  provincia: string;
  pais: string;
  latitud: number;
  longitud: number;
};

export type Usuario = {
  idUsuario: number;
  nombre: string;
  email: string;
  contrasena?: string;
  fechaRegistro?: string;
  localizacionPrincipal: Localizacion | null;
};

export type ActualizarCuentaRequest = {
  nombre: string;
  email: string;
};

export type CambiarContrasenaRequest = {
  contrasenaActual: string;
  nuevaContrasena: string;
  repetirNuevaContrasena: string;
};

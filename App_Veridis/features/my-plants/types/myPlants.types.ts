// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export type PlantType =
  | 'interior'
  | 'exterior'
  | 'acuatica'
  | 'suculenta'
  | 'aromatica'
  | 'frutal'
  | 'ornamental'
  | 'trepadora'
  | 'otro';

export type LuzRecomendada =
  | 'plena_sombra'
  | 'sombra_parcial'
  | 'luz_indirecta'
  | 'luz_directa';

export type HumedadRecomendada = 'baja' | 'media' | 'alta';

export type ToleranciaSol = 'baja' | 'media' | 'alta';

export type EstadoSalud =
  | 'excelente'
  | 'bueno'
  | 'regular'
  | 'malo'
  | 'critico';

export type Planta = {
  id_planta: number;
  id_familia: number | null;
  nombre_comun: string;
  nombre_cientifico: string | null;
  tipo: PlantType;
  descripcion: string | null;
  url_img_default: string | null;
  apta_exterior_temp: 0 | 1;
  luz_recomendada: LuzRecomendada;
  humedad_recomendada: HumedadRecomendada;
  temp_minima: number | null;
  temp_maxima: number | null;
  tolerancia_sol: ToleranciaSol;
  frecuencia_riego: number | null;
  frecuencia_abono: number | null;
};

export type UsuarioPlanta = {
  id_usuario_planta: number;
  id_usuario: number;
  id_planta: number;
  id_ubicacion: number | null;
  nombre_personalizado: string | null;
  notas: string | null;
  fecha_adquisicion: string | null;
  estado_salud: EstadoSalud;
};

export type MyPlant = UsuarioPlanta & {
  planta: Planta;
  ubicacion_nombre: string;
  foto_portada_url: string | null;
  fotos: FotoPlanta[];
};

export type MyPlantsLocationFilter = 'all' | string;

export type UbicacionOption = {
  id_ubicacion: number;
  nombre: string;
};

export type UsuarioPlantaFormValues = {
  id_planta: number;
  id_ubicacion: number | null;
  nombre_personalizado: string | null;
  notas: string | null;
  fecha_adquisicion: string | null;
  fecha_ultimo_riego: string | null;
  estado_salud: EstadoSalud;
  foto_portada_uri?: string | null;
};

export type FotoPlanta = {
  id_foto: number;
  id_usuario_planta: number;
  url_imagen: string;
  fecha: string;
};

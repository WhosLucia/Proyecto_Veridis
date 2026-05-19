// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export type CatalogPlantType =
  | 'all'
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

export type PlantFamily = {
  id_familia: number;
  nombre: string;
  descripcion: string;
};

export type CatalogPlant = {
  id_planta: number;
  id_familia: number | null;
  familia?: PlantFamily | null;
  nombre_comun: string;
  nombre_cientifico: string | null;
  tipo: Exclude<CatalogPlantType, 'all'>;
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

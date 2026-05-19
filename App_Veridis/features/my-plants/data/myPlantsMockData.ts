// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { FotoPlanta, MyPlant, Planta, UbicacionOption, UsuarioPlanta } from '../types/myPlants.types';

// Constante publica usada por otras partes de la app.
export const plantasMock: Planta[] = [
  {
    id_planta: 1,
    id_familia: 1,
    nombre_comun: 'Monstera',
    nombre_cientifico: 'Monstera deliciosa',
    tipo: 'interior',
    descripcion: 'Planta tropical de interior.',
    url_img_default: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=900',
    apta_exterior_temp: 0,
    luz_recomendada: 'luz_indirecta',
    humedad_recomendada: 'alta',
    temp_minima: 18,
    temp_maxima: 27,
    tolerancia_sol: 'baja',
    frecuencia_riego: 7,
    frecuencia_abono: 30,
  },
  {
    id_planta: 2,
    id_familia: 1,
    nombre_comun: 'Pothos',
    nombre_cientifico: 'Epipremnum aureum',
    tipo: 'interior',
    descripcion: 'Planta colgante resistente.',
    url_img_default: 'https://images.unsplash.com/photo-1620127682229-33388276e540?w=900',
    apta_exterior_temp: 0,
    luz_recomendada: 'sombra_parcial',
    humedad_recomendada: 'media',
    temp_minima: 17,
    temp_maxima: 30,
    tolerancia_sol: 'media',
    frecuencia_riego: 6,
    frecuencia_abono: 35,
  },
];

// Constante publica usada por otras partes de la app.
export const ubicacionesOptionsMock: UbicacionOption[] = [
  { id_ubicacion: 1, nombre: 'Salon' },
  { id_ubicacion: 2, nombre: 'Dormitorio' },
];

// Constante publica usada por otras partes de la app.
export const usuarioPlantasMock: UsuarioPlanta[] = [
  {
    id_usuario_planta: 1,
    id_usuario: 1,
    id_planta: 1,
    id_ubicacion: 1,
    nombre_personalizado: 'Monstera del salon',
    notas: 'Revisar hojas nuevas esta semana.',
    fecha_adquisicion: '2026-05-01',
    estado_salud: 'bueno',
  },
];

// Constante publica usada por otras partes de la app.
export const fotosPlantaMock: FotoPlanta[] = [
  {
    id_foto: 1,
    id_usuario_planta: 1,
    url_imagen: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=900',
    fecha: '2026-05-08',
  },
];

// Componente publico que renderiza una parte de la interfaz.
export function crearMiPlanta(usuarioPlanta: UsuarioPlanta): MyPlant {
  const planta = plantasMock.find((item) => item.id_planta === usuarioPlanta.id_planta);
  const ubicacion = ubicacionesOptionsMock.find(
    (item) => item.id_ubicacion === usuarioPlanta.id_ubicacion
  );
  const fotos = fotosPlantaMock.filter(
    (foto) => foto.id_usuario_planta === usuarioPlanta.id_usuario_planta
  );

  if (!planta) {
    throw new Error(`No existe planta con id ${usuarioPlanta.id_planta}`);
  }

  return {
    ...usuarioPlanta,
    planta,
    ubicacion_nombre: ubicacion?.nombre ?? 'Sin ubicacion',
    fotos,
    foto_portada_url: fotos[0]?.url_imagen ?? planta.url_img_default,
  };
}

// Constante publica usada por otras partes de la app.
export const myPlantsMock: MyPlant[] = usuarioPlantasMock.map(crearMiPlanta);

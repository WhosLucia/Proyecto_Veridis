// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export const endpoints = {
  auth: {
    registro: '/api/auth/registro',
    login: '/api/auth/login',
  },
  usuarios: {
    byId: (idUsuario: number) => `/api/usuarios/${idUsuario}`,
    plantas: (idUsuario: number) => `/api/usuarios/${idUsuario}/plantas`,
    ubicaciones: (idUsuario: number) => `/api/usuarios/${idUsuario}/ubicaciones`,
    config: (idUsuario: number) => `/api/usuarios/${idUsuario}/config`,
  },
  plantasUsuario: {
    all: '/api/plantas-usuario',
    byId: (idPlantaUsuario: number) => `/api/plantas-usuario/${idPlantaUsuario}`,
  },
  ubicaciones: {
    all: '/api/ubicaciones',
    byId: (idUbicacion: number) => `/api/ubicaciones/${idUbicacion}`,
  },
  localizaciones: {
    all: '/api/localizaciones',
    byId: (idLocalizacion: number) => `/api/localizaciones/${idLocalizacion}`,
  },
  plantas: {
    all: '/api/plantas',
    byId: (idPlanta: number) => `/api/plantas/${idPlanta}`,
    buscar: (texto: string) => `/api/plantas/buscar?texto=${encodeURIComponent(texto)}`,
  },
  familias: {
    all: '/api/familias',
    byId: (idFamilia: number) => `/api/familias/${idFamilia}`,
    buscar: (texto: string) => `/api/familias/buscar?texto=${encodeURIComponent(texto)}`,
  },
  sintomas: {
    all: '/api/sintomas',
    byId: (idSintoma: number) => `/api/sintomas/${idSintoma}`,
    buscar: (texto: string) => `/api/sintomas/buscar?texto=${encodeURIComponent(texto)}`,
  },
  recomendaciones: {
    all: '/api/recomendaciones',
    bySintoma: (idSintoma: number) => `/api/sintomas/${idSintoma}/recomendaciones`,
    byPlanta: (idPlanta: number) => `/api/plantas/${idPlanta}/recomendaciones`,
  },
  recordatorios: {
    all: '/api/recordatorios',
    activos: '/api/recordatorios/activos',
    byId: (idRecordatorio: number) => `/api/recordatorios/${idRecordatorio}`,
    byPlantaUsuario: (idPlantaUsuario: number) =>
      `/api/plantas-usuario/${idPlantaUsuario}/recordatorios`,
  },
  historialCuidados: {
    all: '/api/historial-cuidados',
    byPlantaUsuario: (idPlantaUsuario: number) =>
      `/api/plantas-usuario/${idPlantaUsuario}/historial`,
  },
  fotos: {
    all: '/api/fotos',
    byPlantaUsuario: (idPlantaUsuario: number) =>
      `/api/plantas-usuario/${idPlantaUsuario}/fotos`,
  },
  cuestionarios: {
    all: '/api/cuestionarios',
    byId: (idCuestionario: number) => `/api/cuestionarios/${idCuestionario}`,
    byPlantaUsuario: (idPlantaUsuario: number) =>
      `/api/plantas-usuario/${idPlantaUsuario}/cuestionarios`,
  },
  respuestasCuestionario: {
    all: '/api/respuestas-cuestionario',
    byCuestionario: (idCuestionario: number) =>
      `/api/cuestionarios/${idCuestionario}/respuestas`,
  },
};

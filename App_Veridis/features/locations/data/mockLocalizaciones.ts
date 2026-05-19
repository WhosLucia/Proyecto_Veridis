// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { Localizacion } from '@/types/user.types';

// Constante publica usada por otras partes de la app.
export const mockLocalizaciones: Localizacion[] = [
  {
    idLocalizacion: 1,
    ciudad: 'Granada',
    provincia: 'Granada',
    pais: 'España',
    latitud: 37.1773,
    longitud: -3.5986,
  },
  {
    idLocalizacion: 2,
    ciudad: 'Málaga',
    provincia: 'Málaga',
    pais: 'España',
    latitud: 36.7213,
    longitud: -4.4214,
  },
  {
    idLocalizacion: 3,
    ciudad: 'Sevilla',
    provincia: 'Sevilla',
    pais: 'España',
    latitud: 37.3891,
    longitud: -5.9845,
  },
  {
    idLocalizacion: 4,
    ciudad: 'Córdoba',
    provincia: 'Córdoba',
    pais: 'España',
    latitud: 37.8882,
    longitud: -4.7794,
  },
  {
    idLocalizacion: 5,
    ciudad: 'Madrid',
    provincia: 'Madrid',
    pais: 'España',
    latitud: 40.4168,
    longitud: -3.7038,
  },
];

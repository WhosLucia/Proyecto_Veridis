// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

const OUTDOOR_LOCATION_WORDS = [
  'balcón',
  'balcon',
  'terraza',
  'patio',
  'jardín',
  'jardin',
  'exterior',
  'azotea',
];

// Componente publico que renderiza una parte de la interfaz.
export function esUbicacionExterior(locationName: string) {
  const normalizedLocation = locationName.trim().toLowerCase();

  return OUTDOOR_LOCATION_WORDS.some((word) => normalizedLocation.includes(word));
}

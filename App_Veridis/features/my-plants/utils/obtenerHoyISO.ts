// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export function obtenerHoyISO() {
  return new Date().toISOString().split('T')[0];
}
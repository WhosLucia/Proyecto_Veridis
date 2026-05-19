// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL?.trim() || 'http://10.0.2.2:8082';

if (__DEV__) {
  console.log('Veridis API_BASE_URL:', API_BASE_URL);
}

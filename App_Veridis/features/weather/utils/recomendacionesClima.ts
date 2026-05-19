// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { WeatherAdvice, WeatherForecast, WeatherPlantInput } from '../types/weather.types';
import { esUbicacionExterior } from './esUbicacionExterior';

// Obtiene un valor derivado a partir de los datos disponibles.
function obtenerEtiquetaPlanta(plant: WeatherPlantInput) {
  return plant.name || 'Esta planta';
}

// Componente publico que renderiza una parte de la interfaz.
export function obtenerConsejoClimaParaPlanta(
  plant: WeatherPlantInput,
  forecast: WeatherForecast
): WeatherAdvice {
  const isOutdoor = esUbicacionExterior(plant.locationName);
  const plantLabel = obtenerEtiquetaPlanta(plant);
  const willRain =
    forecast.today.precipitationProbabilityMax >= 65 || forecast.today.rainSum >= 1.5;

  if (
    isOutdoor &&
    plant.minRecommendedTemperature !== null &&
    plant.minRecommendedTemperature !== undefined &&
    forecast.today.temperatureMin <= plant.minRecommendedTemperature
  ) {
    return {
      type: 'bring_inside',
      severity: 'danger',
      title: 'Mejor mover al interior',
      message: `${plantLabel} puede sufrir con la mínima prevista de ${Math.round(
        forecast.today.temperatureMin
      )} °C.`,
    };
  }

  if (isOutdoor && forecast.today.windSpeedMax >= 35) {
    return {
      type: 'protect_from_wind',
      severity: 'warning',
      title: 'Proteger del viento',
      message: `${plantLabel} está en exterior y se esperan rachas de hasta ${Math.round(
        forecast.today.windSpeedMax
      )} km/h.`,
    };
  }

  if (isOutdoor && willRain) {
    return {
      type: 'skip_watering',
      severity: 'info',
      title: 'Puedes saltar el riego',
      message: `${plantLabel} está en exterior y hay lluvia probable. Revisa el sustrato antes de regar.`,
    };
  }

  if (
    isOutdoor &&
    plant.maxRecommendedTemperature !== null &&
    plant.maxRecommendedTemperature !== undefined &&
    forecast.today.temperatureMax > plant.maxRecommendedTemperature &&
    plant.sunTolerance !== 'alta'
  ) {
    return {
      type: 'protect_from_sun',
      severity: 'warning',
      title: 'Evitar sol directo',
      message: `${plantLabel} puede necesitar sombra con una máxima prevista de ${Math.round(
        forecast.today.temperatureMax
      )} °C.`,
    };
  }

  if (
    isOutdoor &&
    !willRain &&
    forecast.today.temperatureMax > 30 &&
    plant.wateringFrequencyDays !== null &&
    plant.wateringFrequencyDays !== undefined &&
    plant.wateringFrequencyDays <= 5
  ) {
    return {
      type: 'water_needed',
      severity: 'warning',
      title: 'Revisar riego',
      message: `${plantLabel} está en exterior, hará calor y no se espera lluvia relevante.`,
    };
  }

  return {
    type: 'normal',
    severity: 'success',
    title: 'Sin avisos importantes',
    message: `${plantLabel} no tiene alertas meteorológicas relevantes para hoy.`,
  };
}

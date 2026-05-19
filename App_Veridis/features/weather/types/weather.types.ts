// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

export type UserWeatherLocation = {
  ciudad: string;
  provincia: string;
  pais: string;
  latitud: number;
  longitud: number;
};

export type WeatherCurrent = {
  temperature: number;
  precipitation: number;
  rain: number;
  weatherCode: number;
  windSpeed: number;
};

export type WeatherDaily = {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitationProbabilityMax: number;
  rainSum: number;
  windSpeedMax: number;
};

export type WeatherForecast = {
  current: WeatherCurrent;
  daily: WeatherDaily[];
  today: WeatherDaily;
};

export type WeatherAdviceType =
  | 'skip_watering'
  | 'water_needed'
  | 'protect_from_sun'
  | 'protect_from_wind'
  | 'bring_inside'
  | 'normal';

export type WeatherAdviceSeverity = 'info' | 'warning' | 'danger' | 'success';

export type WeatherAdvice = {
  type: WeatherAdviceType;
  severity: WeatherAdviceSeverity;
  title: string;
  message: string;
};

export type WeatherPlantInput = {
  name: string;
  locationName: string;
  minRecommendedTemperature?: number | null;
  maxRecommendedTemperature?: number | null;
  sunTolerance?: 'baja' | 'media' | 'alta' | string | null;
  wateringFrequencyDays?: number | null;
};

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { WeatherDaily, WeatherForecast } from '../types/weather.types';

type OpenMeteoResponse = {
  current: {
    temperature_2m: number;
    precipitation: number;
    rain: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    rain_sum: number[];
    wind_speed_10m_max: number[];
  };
};

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';

function crearPronosticoDiario(data: OpenMeteoResponse): WeatherDaily[] {
  return data.daily.time.map((date, index) => ({
    date,
    temperatureMax: data.daily.temperature_2m_max[index] ?? 0,
    temperatureMin: data.daily.temperature_2m_min[index] ?? 0,
    precipitationProbabilityMax: data.daily.precipitation_probability_max[index] ?? 0,
    rainSum: data.daily.rain_sum[index] ?? 0,
    windSpeedMax: data.daily.wind_speed_10m_max[index] ?? 0,
  }));
}

// Funcion asincrona publica para leer o guardar datos.
export async function obtenerPronosticoClima(
  latitude: number,
  longitude: number
): Promise<WeatherForecast> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: ['temperature_2m', 'precipitation', 'rain', 'weather_code', 'wind_speed_10m'].join(
      ','
    ),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'rain_sum',
      'wind_speed_10m_max',
    ].join(','),
    timezone: 'auto',
  });

  const response = await fetch(`${OPEN_METEO_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('No se pudo consultar la previsión meteorológica.');
  }

  const data = (await response.json()) as OpenMeteoResponse;
  const daily = crearPronosticoDiario(data);
  const today = daily[0];

  if (!today) {
    throw new Error('La previsión meteorológica no incluye datos diarios.');
  }

  return {
    current: {
      temperature: data.current.temperature_2m,
      precipitation: data.current.precipitation,
      rain: data.current.rain,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
    },
    daily,
    today,
  };
}

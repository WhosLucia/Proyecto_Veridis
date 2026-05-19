// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { StyleSheet, Text, View } from 'react-native';

import { DiapositivaPrincipalClima } from '@/features/weather/components/DiapositivaPrincipalClima';
import type { UserWeatherLocation, WeatherForecast } from '@/features/weather/types/weather.types';
import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import { heroBanners } from '../config/heroBanners';
import type { HeroSlide } from '../types/home.types';
import { BannerPrincipalAutomatico, DiapositivaPrincipalPredeterminada } from './BannerPrincipalAutomatico';

type BrandHeroProps = {
  location: UserWeatherLocation | null;
  forecast: WeatherForecast | null;
  loading: boolean;
  permissionDenied: boolean;
  error: string | null;
  onReloadWeather: () => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function HeroMarca({
  location,
  forecast,
  loading,
  permissionDenied,
  error,
  onReloadWeather,
}: BrandHeroProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const slides: HeroSlide[] = [
    ...heroBanners.map((banner) => ({
      id: banner.id,
      component: <DiapositivaPrincipalPredeterminada banner={banner} />,
    })),
    {
      id: 'weather',
      component: (
        <DiapositivaPrincipalClima
          location={location}
          forecast={forecast}
          loading={loading}
          permissionDenied={permissionDenied}
          error={error}
          onReload={onReloadWeather}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.brandName}>Véridis</Text>
      <Text style={styles.brandSubtitle}>Tus plantas, cuidadas con calma</Text>

      <View style={styles.bannerWrapper}>
        <BannerPrincipalAutomatico slides={slides} />
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 28,
    },

    brandName: {
      color: colors.text,
      fontSize: 64,
      fontWeight: '700',
    },

    brandSubtitle: {
      color: colors.textSoft,
      fontSize: 14,
      marginTop: -2,
      marginLeft: 10
    },

    bannerWrapper: {
      marginTop: 22,
    },
  });
}

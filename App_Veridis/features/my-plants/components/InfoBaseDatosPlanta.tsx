// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { MyPlant } from '../types/myPlants.types';
import {
  formatearBooleano,
  formatearHumedad,
  formatearLuz,
  formatearTipoPlanta,
  formatearToleranciaSol,
  formatearRangoTemperatura,
} from '../utils/formateadoresPlanta';

type PlantDatabaseInfoProps = {
  plant: MyPlant;
};

// Componente publico que renderiza una parte de la interfaz.
export function InfoBaseDatosPlanta({ plant }: PlantDatabaseInfoProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de la especie</Text>

      <FilaInfo
        icon="leaf"
        label="Nombre común"
        value={plant.planta.nombre_comun}
      />

      <FilaInfo
        icon="flask-outline"
        label="Nombre científico"
        value={plant.planta.nombre_cientifico ?? 'Sin datos'}
      />

      <FilaInfo
        icon="shape-outline"
        label="Tipo"
        value={formatearTipoPlanta(plant.planta.tipo)}
      />

      <FilaInfo
        icon="white-balance-sunny"
        label="Luz recomendada"
        value={formatearLuz(plant.planta.luz_recomendada)}
      />

      <FilaInfo
        icon="water-percent"
        label="Humedad recomendada"
        value={formatearHumedad(plant.planta.humedad_recomendada)}
      />

      <FilaInfo
        icon="thermometer"
        label="Temperatura recomendada"
        value={formatearRangoTemperatura(
          plant.planta.temp_minima,
          plant.planta.temp_maxima
        )}
      />

      <FilaInfo
        icon="weather-sunny-alert"
        label="Tolerancia al sol"
        value={formatearToleranciaSol(plant.planta.tolerancia_sol)}
      />

      <FilaInfo
        icon="home-thermometer-outline"
        label="Apta para exterior"
        value={formatearBooleano(plant.planta.apta_exterior_temp)}
      />
    </View>
  );
}

type InfoRowProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
};

function FilaInfo({ icon, label, value }: InfoRowProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);

  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.primaryDark}
        />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginTop: 24,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },

  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  textBlock: {
    flex: 1,
  },

  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },

  value: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 2,
  },
  });
}

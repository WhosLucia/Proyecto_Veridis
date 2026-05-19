// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { Ubicacion } from '../types/profile.types';
import { EstadoVacioUbicaciones } from './EstadoVacioUbicaciones';
import { TarjetaCuadriculaUbicacion } from './TarjetaCuadriculaUbicacion';

type ProfileLocationsSectionProps = {
  locations: Ubicacion[];
  onAddLocation: () => void;
  onSelectLocation: (location: Ubicacion) => void;
};

function agruparUbicaciones(locations: Ubicacion[]) {
  const rows: Ubicacion[][] = [];

  for (let index = 0; index < locations.length; index += 2) {
    rows.push(locations.slice(index, index + 2));
  }

  return rows;
}

// Componente publico que renderiza una parte de la interfaz.
export function SeccionUbicacionesPerfil({
  locations,
  onAddLocation,
  onSelectLocation,
}: ProfileLocationsSectionProps) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const rows = agruparUbicaciones(locations);
  const exteriorCount = locations.filter((location) => location.es_exterior === 1).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Ubicaciones</Text>
            <Text style={styles.counter}>{locations.length}</Text>
          </View>
          <Text style={styles.subtitle}>
            Define los espacios donde viven tus plantas para ajustar luz, humedad
            y futuros avisos meteorologicos.
          </Text>
        </View>

        <Pressable style={styles.addButton} onPress={onAddLocation}>
          <MaterialCommunityIcons name="plus" size={21} color={colors.textInverse} />
        </Pressable>
      </View>



      {locations.length === 0 ? (
        <EstadoVacioUbicaciones onAddLocation={onAddLocation} />
      ) : (
        <View style={styles.grid}>
          {rows.map((row) => (
            <View key={row.map((location) => location.id_ubicacion).join('-')} style={styles.row}>
              {row.map((location) => (
                <TarjetaCuadriculaUbicacion
                  key={location.id_ubicacion}
                  location={location}
                  onPress={() => onSelectLocation(location)}
                />
              ))}
              {row.length === 1 ? <View style={styles.placeholder} /> : null}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 12,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 14,
      marginBottom: 14,
    },

    headerText: {
      flex: 1,
    },

    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    title: {
      color: colors.text,
      fontSize: 22,
      fontWeight: '900',
    },

    counter: {
      minWidth: 27,
      minHeight: 24,
      borderRadius: 999,
      backgroundColor: colors.surfaceSoft,
      color: colors.text,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 12,
      fontWeight: '900',
      paddingHorizontal: 7,
    },

    subtitle: {
      color: colors.textSoft,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 6,
    },

    addButton: {
      width: 42,
      height: 42,
      borderRadius: 16,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },

    grid: {
      gap: 10,
      marginTop : 10
    },

    row: {
      flexDirection: 'row',
      gap: 10,
    },

    placeholder: {
      flex: 1,
    },
  });
}

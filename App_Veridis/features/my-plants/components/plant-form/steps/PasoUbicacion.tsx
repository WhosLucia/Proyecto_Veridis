// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, Text, View } from 'react-native';

import { useColoresTema } from '@/theme/useColoresTema';
import type { UbicacionOption } from '../../../types/myPlants.types';
import { obtenerIconoUbicacion } from '../../../utils/obtenerIconoUbicacion';
import { crearEstilos } from '../plantForm.styles';

type Props = {
  locations: UbicacionOption[];
  selectedLocationId: number | null;
  loading: boolean;
  error: string | null;
  onSelectLocation: (id: number | null) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function PasoUbicacion({
  locations,
  selectedLocationId,
  loading,
  error,
  onSelectLocation,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const showEmptyState = !loading && !error && locations.length === 0;

  return (
    <View>
      <Text style={styles.stepTitle}>Elige la ubicación</Text>
      <Text style={styles.stepText}>
        Indica dónde estará colocada la planta para organizarla dentro de tu casa.
      </Text>

      {loading ? (
        <View style={styles.formMessageCard}>
          <Text style={styles.formMessageTitle}>Cargando ubicaciones</Text>
          <Text style={styles.formMessageText}>
            Estamos consultando las ubicaciones registradas en tu cuenta.
          </Text>
        </View>
      ) : null}

      {error ? (
        <View style={styles.formMessageCard}>
          <Text style={styles.formMessageTitle}>No se han podido cargar las ubicaciones.</Text>
          <Text style={styles.formMessageText}>
            Puedes volver atrás y entrar de nuevo al formulario para reintentarlo.
          </Text>
        </View>
      ) : null}

      {showEmptyState ? (
        <View style={styles.formMessageCard}>
          <Text style={styles.formMessageTitle}>No tienes ubicaciones registradas todavía.</Text>
          <Text style={styles.formMessageText}>
            La API permite guardar la planta sin ubicación. Después podrás asignarla desde tus
            ubicaciones.
          </Text>
        </View>
      ) : null}

      <View style={styles.locationGrid}>
        {locations.map((location) => {
          const active = selectedLocationId === location.id_ubicacion;

          return (
            <Pressable
              key={location.id_ubicacion}
              style={[styles.locationCard, active && styles.selectedCard]}
              onPress={() => onSelectLocation(location.id_ubicacion)}
            >
              <View style={styles.locationIconBox}>
                <MaterialCommunityIcons
                  name={obtenerIconoUbicacion(location.nombre)}
                  size={25}
                  color={colors.primaryDark}
                />
              </View>

              <Text style={styles.locationName}>{location.nombre}</Text>

              {active ? (
                <MaterialCommunityIcons name="check-circle" size={20} color={colors.primary} />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

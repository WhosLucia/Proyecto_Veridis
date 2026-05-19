// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

import { useColoresTema } from '@/theme/useColoresTema';
import type { Planta } from '../../../types/myPlants.types';
import { formatearTipoPlanta } from '../../../utils/formateadoresPlanta';
import { crearEstilos } from '../plantForm.styles';

type Props = {
  plants: Planta[];
  selectedPlantId: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectPlant: (id: number) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function PasoEspecie({  plants,
  selectedPlantId,
  search,
  onSearchChange,
  onSelectPlant,
}: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  return (
    <View>
      <Text style={styles.stepTitle}>Elige la especie</Text>
      <Text style={styles.stepText}>
        Selecciona la planta base del catálogo. Sus cuidados recomendados se usarán como referencia.
      </Text>

      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />

        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Buscar especie"
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
        />
      </View>

      {plants.map((plant) => {
        const active = selectedPlantId === plant.id_planta;

        return (
          <Pressable
            key={plant.id_planta}
            style={[styles.speciesCard, active && styles.selectedCard]}
            onPress={() => onSelectPlant(plant.id_planta)}
          >
            {plant.url_img_default ? (
              <Image source={{ uri: plant.url_img_default }} style={styles.speciesImage} />
            ) : (
              <View style={styles.speciesImagePlaceholder}>
                <MaterialCommunityIcons name="leaf" size={28} color={colors.primaryDark} />
              </View>
            )}

            <View style={styles.speciesContent}>
              <Text style={styles.speciesName}>{plant.nombre_comun}</Text>
              <Text style={styles.speciesScientific}>
                {plant.nombre_cientifico ?? 'Sin nombre científico'}
              </Text>
              <Text style={styles.speciesMeta}>{formatearTipoPlanta(plant.tipo)}</Text>
            </View>

            {active ? (
              <MaterialCommunityIcons name="check-circle" size={22} color={colors.primary} />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
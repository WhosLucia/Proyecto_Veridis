// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';
import { useColoresTema } from '@/theme/useColoresTema';
import type { CatalogPlant, PlantFamily } from '../types/catalog.types';
import { TarjetaFamiliaPlanta } from './TarjetaFamiliaPlanta';

type FamilyGroup = {
  family: PlantFamily;
  plants: CatalogPlant[];
};

type Props = {
  groups: FamilyGroup[];
  expandedFamilyId: number | null;
  onToggleFamily: (id: number) => void;
  onPressPlant: (plant: CatalogPlant) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function ListaFamiliasPlantas({ groups, expandedFamilyId, onToggleFamily, onPressPlant }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  if (groups.length === 0) {
    return (
      <View style={styles.emptyCard}>
        <MaterialCommunityIcons name="leaf-off" size={34} color={colors.textMuted} />

        <Text style={styles.emptyTitle}>No hay plantas disponibles</Text>

        <Text style={styles.emptyText}>
          No se han encontrado plantas que coincidan con la búsqueda o el filtro seleccionado.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {groups.map((group) => (
        <TarjetaFamiliaPlanta
          key={group.family.id_familia}
          family={group.family}
          plants={group.plants}
          expanded={expandedFamilyId === group.family.id_familia}
          onToggle={() => onToggleFamily(group.family.id_familia)}
          onPressPlant={onPressPlant}
        />
      ))}
    </View>
  );
}

// Crea estilos dependientes del tema actual.
function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 12,
    textAlign: 'center',
  },

  emptyText: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 7,
  },
  });
}

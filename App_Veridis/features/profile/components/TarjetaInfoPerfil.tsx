// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import { useTemaApp } from '@/features/theme/context/AppThemeContext';
import type { UserProfileView } from '../types/profile.types';

type ProfileInfoCardProps = {
  user: UserProfileView;
};

// Componente publico que renderiza una parte de la interfaz.
export function TarjetaInfoPerfil({ user }: ProfileInfoCardProps) {
  const { themeColors } = useTemaApp();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColors.surface,
          borderColor: themeColors.border,
        },
      ]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Información de cuenta</Text>

      <FilaInfoPerfil icon="account-outline" label="Nombre" value={user.nombre} />

      <FilaInfoPerfil icon="email-outline" label="Correo electrónico" value={user.email} />

      <FilaInfoPerfil
        icon="map-marker-outline"
        label="Ubicación principal"
        value={user.localizacion_default}
      />

      <FilaInfoPerfil
        icon="translate"
        label="Idioma"
        value={user.idioma === 'es' ? 'Español' : 'Inglés'}
      />

      <FilaInfoPerfil
        icon="calendar-heart"
        label="Fecha de registro"
        value={new Date(user.fecha_registro).toLocaleDateString('es-ES')}
      />
    </View>
  );
}

type ProfileInfoRowProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
};

function FilaInfoPerfil({ icon, label, value }: ProfileInfoRowProps) {
  const { themeColors } = useTemaApp();

  return (
    <View style={styles.row}>
      <MaterialCommunityIcons name={icon} size={20} color={themeColors.primaryDark} />
      <View style={styles.textBlock}>
        <Text style={[styles.label, { color: themeColors.textMuted }]}>{label}</Text>
        <Text style={[styles.value, { color: themeColors.text }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    marginBottom: 18,
  },

  title: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },

  textBlock: {
    marginLeft: 12,
    flex: 1,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
  },

  value: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
});

// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTemaApp } from '@/features/theme/context/AppThemeContext';

export type ProfileSectionTabKey = 'info' | 'locations';

type ProfileSectionTab = {
  key: ProfileSectionTabKey;
  label: string;
};

type ProfileSectionTabsProps = {
  activeTab: ProfileSectionTabKey;
  onChangeTab: (tab: ProfileSectionTabKey) => void;
};

const tabs: ProfileSectionTab[] = [
  {
    key: 'info',
    label: 'Información',
  },
  {
    key: 'locations',
    label: 'Ubicaciones',
  },
];

// Componente publico que renderiza una parte de la interfaz.
export function PestanasSeccionPerfil({ activeTab, onChangeTab }: ProfileSectionTabsProps) {
  const { themeColors } = useTemaApp();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.surface,
          borderColor: themeColors.border,
        },
      ]}>
      {tabs.map((tab) => {
        const active = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            style={[styles.tabButton, active && { backgroundColor: themeColors.primary }]}
            onPress={() => onChangeTab(tab.key)}>
            <Text
              style={[
                styles.tabText,
                { color: themeColors.textSoft },
                active && { color: themeColors.textInverse },
              ]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 22,
    padding: 5,
    borderWidth: 1,
    marginBottom: 18,
  },

  tabButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  tabText: {
    fontSize: 12,
    fontWeight: '900',
  },
});

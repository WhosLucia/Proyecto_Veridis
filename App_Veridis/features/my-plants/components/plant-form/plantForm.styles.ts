// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { StyleSheet } from 'react-native';

import type { ThemeColors } from '@/theme/themeColors';

// Componente publico que renderiza una parte de la interfaz.
export function crearEstilos(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      paddingHorizontal: 22,
      paddingTop: 65,
      paddingBottom: 18,
    },

    eyebrow: {
      color: colors.textMuted,
      fontSize: 12,
      fontWeight: '800',
      marginBottom: 4,
    },

    title: {
      color: colors.text,
      fontSize: 25,
      fontWeight: '900',
    },

    subtitle: {
      color: colors.textSoft,
      fontSize: 13,
      fontWeight: '700',
      marginTop: 5,
    },

    progressContainer: {
      flexDirection: 'row',
      gap: 7,
      paddingHorizontal: 22,
      marginBottom: 12,
    },

    progressItem: {
      flex: 1,
      height: 6,
      borderRadius: 999,
      backgroundColor: colors.border,
    },

    progressItemActive: {
      backgroundColor: colors.primary,
    },

    formContent: {
      paddingHorizontal: 22,
      paddingBottom: 260,
    },

    stepTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '900',
      marginBottom: 6,
    },

    stepText: {
      color: colors.textSoft,
      fontSize: 13,
      lineHeight: 19,
      marginBottom: 18,
    },

    searchBox: {
      height: 46,
      borderRadius: 17,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },

    searchInput: {
      flex: 1,
      marginLeft: 8,
      color: colors.text,
      fontSize: 14,
      fontWeight: '700',
    },

    speciesCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 22,
      padding: 10,
      marginBottom: 12,
    },

    selectedCard: {
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft,
    },

    speciesImage: {
      width: 64,
      height: 64,
      borderRadius: 18,
      marginRight: 12,
    },

    speciesImagePlaceholder: {
      width: 64,
      height: 64,
      borderRadius: 18,
      backgroundColor: colors.surfaceSoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },

    speciesContent: {
      flex: 1,
    },

    speciesName: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
    },

    speciesScientific: {
      color: colors.textSoft,
      fontSize: 12,
      fontStyle: 'italic',
      marginTop: 2,
    },

    speciesMeta: {
      color: colors.accent,
      fontSize: 11,
      fontWeight: '900',
      marginTop: 5,
    },

    locationGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    locationCard: {
      width: '48%',
      minHeight: 118,
      borderRadius: 22,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      marginBottom: 12,
    },

    locationIconBox: {
      width: 46,
      height: 46,
      borderRadius: 17,
      backgroundColor: colors.surfaceSoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },

    locationName: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
      marginBottom: 8,
    },

    formMessageCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 18,
      padding: 14,
      marginBottom: 14,
    },

    formMessageTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '900',
      marginBottom: 5,
    },

    formMessageText: {
      color: colors.textSoft,
      fontSize: 13,
      lineHeight: 18,
    },

    formErrorText: {
      position: 'absolute',
      left: 22,
      right: 22,
      bottom: 172,
      color: colors.danger,
      fontSize: 12,
      fontWeight: '800',
      textAlign: 'center',
    },

    label: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '900',
      marginBottom: 7,
      marginLeft: 3,
    },

    input: {
      height: 48,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      paddingHorizontal: 14,
      color: colors.text,
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 14,
    },

    textArea: {
      height: 108,
      textAlignVertical: 'top',
      paddingTop: 13,
    },

    statusGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 14,
    },

    statusButton: {
      paddingHorizontal: 12,
      paddingVertical: 9,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },

    statusButtonText: {
      color: colors.textSoft,
      fontSize: 12,
      fontWeight: '900',
    },

    summaryCard: {
      backgroundColor: colors.surface,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
    },

    summaryImage: {
      width: '100%',
      height: 170,
      borderRadius: 22,
      marginBottom: 14,
    },

    summaryName: {
      color: colors.text,
      fontSize: 22,
      fontWeight: '900',
    },

    summaryScientific: {
      color: colors.textSoft,
      fontSize: 13,
      fontStyle: 'italic',
      marginTop: 3,
    },

    summaryInfoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 14,
    },

    summaryItem: {
      width: '48%',
      backgroundColor: colors.surfaceSoft,
      borderRadius: 16,
      padding: 11,
      marginBottom: 10,
    },

    summaryLabel: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: '900',
    },

    summaryValue: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '900',
      marginTop: 3,
    },

    notesPreview: {
      backgroundColor: colors.primarySoft,
      borderRadius: 18,
      padding: 13,
      marginTop: 4,
    },

    notesPreviewTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '900',
      marginBottom: 5,
    },

    notesPreviewText: {
      color: colors.textSoft,
      fontSize: 13,
      lineHeight: 18,
    },

    footer: {
      position: 'absolute',
      left: 22,
      right: 22,
      bottom: 115,
      flexDirection: 'row',
      gap: 10,
    },

    secondaryButton: {
      flex: 1,
      height: 50,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },

    disabledButton: {
      opacity: 0.45,
    },

    secondaryButtonText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '900',
    },

    primaryButton: {
      flex: 1.4,
      height: 50,
      borderRadius: 18,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },

    primaryButtonText: {
      color: colors.whiteSoft,
      fontSize: 14,
      fontWeight: '900',
    },

    photoPreviewCard: {
      height: 220,
      borderRadius: 28,
      overflow: 'hidden',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 16,
    },

    photoPreview: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },

    photoPlaceholder: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surfaceSoft,
    },

    photoActionsRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 10,
    },

    primaryPhotoButton: {
      flex: 1,
      minHeight: 50,
      borderRadius: 18,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 10,
    },

    primaryPhotoButtonText: {
      color: colors.whiteSoft,
      fontSize: 14,
      fontWeight: '900',
    },

    secondaryPhotoButton: {
      flex: 1,
      minHeight: 50,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 10,
    },

    secondaryPhotoButtonText: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '900',
    },

    defaultPhotoButton: {
      minHeight: 46,
      borderRadius: 17,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
    },

    defaultPhotoButtonText: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '900',
    },
  });
}

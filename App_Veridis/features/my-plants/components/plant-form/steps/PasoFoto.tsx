// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Pressable, Text, View } from 'react-native';

import { useColoresTema } from '@/theme/useColoresTema';
import type { Planta } from '../../../types/myPlants.types';
import { crearEstilos } from '../plantForm.styles';

type Props = {
  selectedPlant?: Planta;
  photoUri: string | null;
  onChangePhoto: (uri: string | null) => void;
};

// Componente publico que renderiza una parte de la interfaz.
export function PasoFoto({ selectedPlant, photoUri, onChangePhoto }: Props) {
  const colors = useColoresTema();
  const styles = crearEstilos(colors);
  const previewImage = photoUri || selectedPlant?.url_img_default || null;

  // Guarda la primera imagen devuelta por la camara o la galeria.
  function guardarImagenSeleccionada(result: ImagePicker.ImagePickerResult) {
    if (!result.canceled && result.assets[0]?.uri) {
      onChangePhoto(result.assets[0].uri);
    }
  }

  // Abre la galeria cuando el usuario prefiere elegir una foto existente.
  async function manejarSeleccionGaleria() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permiso necesario',
        'Necesitamos acceso a tus fotos para elegir una imagen de la galeria.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    guardarImagenSeleccionada(result);
  }

  // Abre la camara para crear una foto nueva en el momento.
  async function manejarUsoCamara() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permiso necesario',
        'Necesitamos acceso a la camara para tomar una foto de tu planta.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    guardarImagenSeleccionada(result);
  }

  return (
    <View>
      <Text style={styles.stepTitle}>Foto de portada</Text>

      <Text style={styles.stepText}>
        Puedes anadir una foto propia para identificar mejor tu planta. Si no anades ninguna, se
        usara la imagen por defecto de la especie.
      </Text>

      <View style={styles.photoPreviewCard}>
        {previewImage ? (
          <Image source={{ uri: previewImage }} style={styles.photoPreview} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <MaterialCommunityIcons name="camera-outline" size={42} color={colors.textMuted} />
          </View>
        )}
      </View>

      <View style={styles.photoActionsRow}>
        <Pressable style={styles.primaryPhotoButton} onPress={manejarUsoCamara}>
          <MaterialCommunityIcons name="camera-plus-outline" size={20} color={colors.whiteSoft} />

          <Text style={styles.primaryPhotoButtonText}>
            {photoUri ? 'Nueva foto' : 'Usar camara'}
          </Text>
        </Pressable>

        <Pressable style={styles.secondaryPhotoButton} onPress={manejarSeleccionGaleria}>
          <MaterialCommunityIcons name="image-plus" size={20} color={colors.text} />

          <Text style={styles.secondaryPhotoButtonText}>{photoUri ? 'Cambiar' : 'Galeria'}</Text>
        </Pressable>
      </View>

      {photoUri ? (
        <Pressable style={styles.defaultPhotoButton} onPress={() => onChangePhoto(null)}>
          <Text style={styles.defaultPhotoButtonText}>Usar imagen por defecto</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

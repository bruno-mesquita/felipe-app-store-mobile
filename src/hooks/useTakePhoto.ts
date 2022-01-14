import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const useTakePhoto = () => {
  const pickImage = async () => {
    const { cancelled, uri: originalUri }: any =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

    if (!cancelled) {
      const { base64, uri } = await manipulateAsync(
        originalUri,
        [{ resize: { height: 600, width: 600 } }],
        {
          base64: true,
          compress: 1,
          format: SaveFormat.PNG,
        }
      );

      const pathArray = uri.split('.');
      const ext = pathArray[pathArray.length - 1];
      const encoded = `data:image/${ext};base64,${base64}`;

      return encoded;
    }

    return false;
  };

  return pickImage;
};

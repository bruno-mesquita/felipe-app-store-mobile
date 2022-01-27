import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useTakePhoto = () => {
  const pickImage = useCallback(async () => {
    const { cancelled, uri, base64 }: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      base64: true,
    });

    if (!cancelled) {
      const pathArray = uri.split('.');
      const ext = pathArray[pathArray.length - 1];
      const encoded = `data:image/${ext};base64,${base64}`;

      return encoded;
    }

    return false;
  }, []);

  return pickImage;
};

import * as ImagePicker from 'expo-image-picker';

export const useTakePhoto = () => {
  const pickImage = async () => {
    const { base64, cancelled, type, uri }: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!cancelled) {
      const pathArray = uri.split('.');
      const ext = pathArray[pathArray.length - 1];
      const encoded = `data:image/${ext};base64,${base64}`;

      return encoded;
    }

    return false;
  };

  return pickImage;
}

import { useState, useCallback, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const usePermissionGallery = () => {
  const [permission, setPermission] = useState(false);

  const getPermission = useCallback(async () => {
    const resultMediaLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const resultCamera = await ImagePicker.requestCameraPermissionsAsync();

    if(resultMediaLibrary.status === 'granted' && resultCamera.status == 'granted') {
      setPermission(true);
    } else {
      setPermission(false);
    }
  }, []);

  useEffect(() => {
    getPermission()
  },[getPermission]);

  return permission;
}

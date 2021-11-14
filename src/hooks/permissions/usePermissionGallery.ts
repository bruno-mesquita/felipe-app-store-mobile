import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const usePermissionGallery = () => {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const resultMediaLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const resultCamera = await ImagePicker.requestCameraPermissionsAsync();

      if(resultMediaLibrary.status === 'granted' && resultCamera.status == 'granted') {
        setPermission(true);
      } else {
        setPermission(false);
      }
    })()
  },[]);

  return permission;
}

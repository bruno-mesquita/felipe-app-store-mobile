import { useState, useCallback, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

export const usePermissionGallery = () => {
  const [permission, setPermission] = useState(false);

  const getPermission = useCallback(async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if(status === 'granted') {
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

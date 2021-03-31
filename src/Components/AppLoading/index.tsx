
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import ExpoAppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';

export const AppLoading = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });

      setIsReady(true);
    })();
  }, []);

  return <>{isReady ? (<>{children}</>) : (<ExpoAppLoading />)}</>
};

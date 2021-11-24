import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import ExpoAppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';

export const AppLoading = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  useEffect(() => {
    (async () => {
      await Font.loadAsync({ ...Ionicons.font });

      setIsReady(true);
    })();
  }, []);

  return <>{isReady && fontsLoaded ? <>{children}</> : <ExpoAppLoading />}</>;
};

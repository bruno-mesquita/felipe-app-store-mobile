import type { ImageProps } from 'react-native';
import { Factory } from 'native-base';
import ExpoFastImage from 'expo-fast-image';

type FastImageProps = ImageProps & {
  cacheKey: string;
};

export const FastImage = Factory<FastImageProps>(ExpoFastImage);

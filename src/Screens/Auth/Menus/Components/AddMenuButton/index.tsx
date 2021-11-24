import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { FloatButton } from '../../../../../Components';

export const AddMenuButton = () => {
  const navigation = useNavigation();

  const onPress = () => navigation.navigate('RegisterMenu');

  return (
    <FloatButton onPress={onPress}>
      <Ionicons name="add" size={30} color="#fff" />
    </FloatButton>
  );
};

import { Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => (
  <Image
    style={{ width: 90, height: 43 }}
    source={require('../../assets/images/logo.png')}
  />
);

interface HeaderProps {
  name?: string | undefined,
  navigation?: any;
}

export default ({ name, navigation }: HeaderProps) => {

  const props: any = {
    headerTitleAlign: 'center' as any,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#9E0404',
    },
    headerTitle: name ? name : () => <Header />,
  }

  if(navigation) props.headerRight = ({ tintColor }) => <TouchableOpacity onPress={() => navigation.navigate('Configuration')}><Ionicons name="md-settings-sharp" size={30} color={tintColor} style={{ paddingRight: 15 }} /></ TouchableOpacity>

  return props;
}

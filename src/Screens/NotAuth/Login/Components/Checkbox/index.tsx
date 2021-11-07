import { Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { Container, ContainerCheckbox, ContainerCheckboxIcon } from './styles';
import { CheckboxProps } from './props';

export const Checkbox = ({ children, checked, onChange }: CheckboxProps) => {
  const { colors } = useTheme();

  return (
    <Container>
      <ContainerCheckbox onPress={() => onChange(!checked)}>
        <ContainerCheckboxIcon>
          <MaterialIcons
            name="check"
            size={20}
            color={!checked ? colors.primary : colors.secundary}
          />
        </ContainerCheckboxIcon>
      </ContainerCheckbox>
      <Text>{children}</Text>
    </Container>
  );
};

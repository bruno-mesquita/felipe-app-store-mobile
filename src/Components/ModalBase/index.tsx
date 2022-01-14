import { useImperativeHandle, forwardRef, useState } from 'react';
import { Modal, View } from 'react-native';

import { ModalBaseHandle, Props } from './props';
import { Container, styles } from './styles';

export const ModalBase = forwardRef<ModalBaseHandle, Props>(
  ({ children, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    useImperativeHandle(ref, () => ({ open, close }));

    return (
      <Modal animationType="slide" transparent={true} visible={visible} {...rest}>
        <Container>
          <View style={styles.modalView}>{children}</View>
        </Container>
      </Modal>
    );
  }
);

import { MutableRefObject } from 'react';
import { ModalProps } from 'react-native';

import { Props as DefaultProps } from '../../utils/props';

export interface Props extends DefaultProps, ModalProps {}
export interface ModalBaseHandle {
  open: () => void;
  close: () => void;
}

export interface ModalBaseProps {
  modalRef: MutableRefObject<ModalBaseHandle>;
}

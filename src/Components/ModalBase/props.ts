import type { MutableRefObject, FC } from 'react';
import { ModalProps } from 'react-native';

export type Props = FC<ModalProps>;
export interface ModalBaseHandle {
  open: () => void;
  close: () => void;
}

export interface ModalBaseProps {
  modalRef: MutableRefObject<ModalBaseHandle>;
}

import type { MutableRefObject, FC, ReactNode } from 'react';
import type { ModalProps } from 'react-native';

export type Props = ModalProps & { children: ReactNode };
export interface ModalBaseHandle {
  open: () => void;
  close: () => void;
}

export interface ModalBaseProps {
  modalRef: MutableRefObject<ModalBaseHandle>;
}

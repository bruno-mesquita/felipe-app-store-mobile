import { ReactNode } from 'react';

export interface CheckboxProps {
  children: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

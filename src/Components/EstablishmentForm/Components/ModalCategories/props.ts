import { ModalBaseProps } from '../../../ModalBase/props';

export interface ModalCategoriesProps extends ModalBaseProps {
  onPress: (categories: number[]) => void;
  categories: number[]
}

export interface Category {
  id: number;
  name: string;
}

import { ModalBaseProps } from '../ModalBase/props';

export interface ItemModalProps extends ModalBaseProps {
  id: number;
  reender: () => Promise<void> | void;
}

interface Product {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  total: number;
  order_status: string;
  note: string;
  transshipment: number;
}
export interface ItemOrder {
  id: number;
  quantity: number;
  total: number;
  product: Product;
}

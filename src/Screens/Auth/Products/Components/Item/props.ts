export interface ItemProps {
  id: number;
  name: string;
  price: number;
  photo: string;
  menu_id: number;
  reender: () => void;
}

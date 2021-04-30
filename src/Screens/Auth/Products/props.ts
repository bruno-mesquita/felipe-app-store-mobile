export interface Product {
  id: number;
  name: string;
  price: number;
  menu_id: number;
  photo: {
    encoded: string;
  };
}

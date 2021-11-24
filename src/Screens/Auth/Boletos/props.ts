export interface Boleto {
  id: number;
  barcode: string;
  link: string;
  price: number;
  status: string;
  date_of_expiration: string;
}

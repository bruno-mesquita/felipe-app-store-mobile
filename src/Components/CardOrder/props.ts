interface State {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  state: State
}

export interface Address {
  id: number;
  number: string;
  street: string;
  neighborhood: string;
  cep: string;
  city: City;
  client: Client;
}

export interface Client {
  id: number;
  name: string;
  cellphone: string;
}

export interface Order {
  id: number;
  address_client: Address;
  payment: string;
  total: number;
  order_status: string;
  client_order_status: string;
  createdAt: string;
}


export interface ItemProps extends Order {
  onPress: (id: number) => (Promise<void> | void)
}

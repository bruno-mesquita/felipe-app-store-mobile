interface Item {
  id: number;
  name: string;
}

export interface ItemProps {
  item: Item;
  reender: () => Promise<void>;
}

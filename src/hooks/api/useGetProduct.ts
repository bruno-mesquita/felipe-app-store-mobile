import useSWR from 'swr';

type IProductCommom = {
  id: number;
  name: string;
  price: number;
  description: string;
  active: boolean;
  unit: number;
  unitType: string;
};

export type IProductRequest = IProductCommom & {
  menu_id: number;
  photo: {
    encoded: string;
  };
};

export type IProduct = IProductCommom & {
  menu: string;
  image: string;
};

const useGetProduct = (productId: number): { product: IProduct } => {
  const { data } = useSWR<IProductRequest>(`/products/${productId}`, {
    fallbackData: {
      id: 0,
      name: '',
      price: 0,
      description: '',
      menu_id: 0,
      photo: {
        encoded: null,
      },
      active: false,
      unit: 1,
      unitType: 'Un',
    },
  });

  const { photo, menu_id, ...values } = data;

  return {
    product: {
      ...values,
      menu: menu_id.toString(),
      image: photo.encoded,
    },
  };
};

export default useGetProduct;

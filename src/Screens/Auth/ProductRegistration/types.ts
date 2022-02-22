import type { IProduct } from '@hooks-api/useGetProduct';

export type IValues = Omit<IProduct, 'id'>;

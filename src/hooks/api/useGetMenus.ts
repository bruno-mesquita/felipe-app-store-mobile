import useSWR from 'swr';

export type IMenu = {
  id: number;
  name: string;
};

const useGetMenus = () =>
  useSWR<IMenu[]>('/menus', {
    fallbackData: [],
  });

export default useGetMenus;

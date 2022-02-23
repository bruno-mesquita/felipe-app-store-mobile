import useSWR from 'swr';

export type IMenu = {
  id: number;
  name: string;
  active: boolean;
};

const useGetMenu = (menuId?: number) =>
  useSWR<IMenu>(menuId && `/menus/${menuId}`, {
    fallbackData: {
      id: 0,
      name: '',
      active: true,
    },
  });

export default useGetMenu;

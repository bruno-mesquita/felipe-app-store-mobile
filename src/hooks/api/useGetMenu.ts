import useSWR from 'swr';

export type IMenu = {
  id: number;
  name: string;
  active: boolean;
  priority: number;
};

const useGetMenu = (menuId?: number) =>
  useSWR<IMenu>(menuId && `/menus/${menuId}`, {
    fallbackData: {
      id: 0,
      name: '',
      active: true,
      priority: 1,
    },
  });

export default useGetMenu;

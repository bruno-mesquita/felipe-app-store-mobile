import type { IMenu } from '@hooks-api/useGetMenus';

export type ItemProps = Pick<IMenu, 'id' | 'name'>;

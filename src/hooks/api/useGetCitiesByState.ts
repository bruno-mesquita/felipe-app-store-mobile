import useSWR from 'swr';

export type ICity = {
  id: number;
  name: string;
};

const useGetCitiesByState = (stateId?: number | string) =>
  useSWR<ICity[]>(stateId && `/cities/${stateId}`, {
    fallbackData: [],
  });

export default useGetCitiesByState;

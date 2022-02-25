import useSWR from 'swr';

export type IState = {
  id: number;
  name: string;
};

const useGetStates = () =>
  useSWR<IState[]>('/states', {
    fallbackData: [],
  });

export default useGetStates;

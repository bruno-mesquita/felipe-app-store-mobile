import type { FC } from 'react';
import { SWRConfig } from 'swr';
import type { AxiosError } from 'axios';

import { useAppSelector, useAppDispatch } from '@store/hooks';
import { authActions } from '@store/reducers/auth';
import { fetcher } from '@services/api';

export const ApiConfig: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { signed } = useAppSelector(({ auth }) => auth);

  return (
    <SWRConfig
      value={{
        fetcher,
        onErrorRetry: async (
          error: AxiosError,
          key,
          config,
          revalidate,
          { retryCount }
        ) => {
          // Never retry on 404.
          if (error.response.status === 404) return;

          if (error.response.status === 401 && signed) {
            await dispatch(authActions.fetchRefreshToken()).unwrap();

            revalidate({ retryCount });
          }

          // Only retry up to 10 times.
          if (retryCount >= 10) return;

          // Retry after 5 seconds.
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

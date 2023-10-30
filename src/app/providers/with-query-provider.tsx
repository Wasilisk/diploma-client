import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();
export const withQueryProvider = (component: () => ReactNode) => () => {
  return <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>;
};

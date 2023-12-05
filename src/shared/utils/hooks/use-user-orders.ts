import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { OrdersService } from 'shared/services/orders-service';
import { useAuth } from 'shared/utils/hooks/use-auth';
import { GetOrdersParams } from 'shared/utils/types/orders.types';

export const useUserOrders = (params: GetOrdersParams) => {
  const { isAuth } = useAuth();
  return useQuery(
    [endpoints.orders, params],
    async () => {
      const response = await OrdersService.getUserOrders(params);
      return response.data;
    },
    {
      enabled: isAuth,
    },
  );
};

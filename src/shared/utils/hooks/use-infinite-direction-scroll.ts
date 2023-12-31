import { useInfiniteQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { DirectionsService } from 'shared/services/directions-service';
import { useDebounce } from '@uidotdev/usehooks';

interface useInfiniteDirectionScrollParams {
  filter?: {
    name: string | null;
  };
}
export const useInfiniteDirectionScroll = (
  { filter }: useInfiniteDirectionScrollParams = { filter: { name: null } },
) => {
  const searchParam = useDebounce({ ...filter! }, 500);
  return useInfiniteQuery(
    [endpoints.directions, 'infinite-query', searchParam],
    async ({ pageParam = 0 }) => {
      const response = await DirectionsService.getAll({
        paginationParams: { page: pageParam, size: 10 },
        filter: searchParam,
      });
      return response.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.items.length === 10 ? allPages.length : undefined;
        return nextPage;
      },
    },
  );
};

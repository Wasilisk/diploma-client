import { SelectorFilter } from 'shared/ui/filters';
import { SortingDirection } from 'shared/utils/types';
import { GuidePermissionRequestStatus } from 'shared/utils/types/guide-permission-request.types';
import {useRequestsFilters} from "features/guide-permission-request/requests-filters/use-requests-filters";

const requestsSorting: Record<SortingDirection, string> = {
  asc: 'Спочатку старіші',
  desc: 'Спочатку новіші',
};

const statusMapping: Record<keyof typeof GuidePermissionRequestStatus, string> = {
  [GuidePermissionRequestStatus.PENDING]: 'Очікуються',
  [GuidePermissionRequestStatus.ACCEPTED]: 'Прийняті',
  [GuidePermissionRequestStatus.DECLINED]: 'Відхилені',
};

export const RequestsFilters = () => {
  const { sorting, status, setStatus, setSorting } = useRequestsFilters();
  return (
    <div className='mb-4 flex flex-wrap items-center gap-x-8 gap-y-2 border-y border-zinc-100 py-2'>
      <div className='font-medium leading-relaxed text-zinc-700'>Фільтри:</div>
      <SelectorFilter
        value={status}
        onChange={setStatus}
        label='Статус'
        placeholder='Усі'
        items={Object.values(GuidePermissionRequestStatus)}
        renderItemValue={(item) => statusMapping[item]}
      />
      <SelectorFilter
        value={sorting}
        onChange={setSorting}
        label='Сортування'
        items={['asc', 'desc']}
        renderItemValue={(item) => requestsSorting[item as SortingDirection]}
      />
    </div>
  );
};

import { SelectorFilter } from 'shared/ui/filters';
import { useTechnicalSupportMessagesFilters } from 'features/technical-support/messages-filters/use-technical-support-messages-filters';
import { SortingDirection, SupportMessageStatus } from 'shared/utils/types';

const technicalSupportLettersSorting: Record<SortingDirection, string> = {
  asc: 'Спочатку старіші',
  desc: 'Спочатку новіші',
};

const statusMapping: Record<keyof typeof SupportMessageStatus, string> = {
  [SupportMessageStatus.ACTIVE]: 'Активні',
  [SupportMessageStatus.RESOLVED]: 'Вирішені',
};

export const TechnicalSupportLettersFilters = () => {
  const { sorting, status, setStatus, setSorting } = useTechnicalSupportMessagesFilters();
  return (
    <div className='mb-4 flex flex-wrap items-center gap-x-8 gap-y-2 border-y border-zinc-100 py-2'>
      <div className='font-medium leading-relaxed text-zinc-700'>Фільтри:</div>
      <SelectorFilter
        value={status}
        onChange={setStatus}
        label='Статус'
        placeholder='Усі'
        items={Object.values(SupportMessageStatus)}
        renderItemValue={(item) => statusMapping[item]}
      />
      <SelectorFilter
        value={sorting}
        onChange={setSorting}
        label='Сортування'
        items={['asc', 'desc']}
        renderItemValue={(item) => technicalSupportLettersSorting[item as SortingDirection]}
      />
    </div>
  );
};

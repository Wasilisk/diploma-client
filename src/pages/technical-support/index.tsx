import { useState } from 'react';
import { USERS_PAGE_SIZE } from 'shared/utils/constants';
import { parseContentState } from 'shared/ui/content-state/utils';
import { isEmpty } from 'shared/utils/libs';
import { ContentState } from 'shared/ui/content-state';
import { UserListItemSkeleton } from 'entities/user/ui/user-list-item-skeleton';
import { Pagination } from 'features/pagination';
import { SupportMessageListItem } from 'entities/support-message/ui/support-message-list-item';
import { useSupportMessages } from 'shared/utils/hooks/use-support-messages';
import { TechnicalSupportLettersFilters } from 'features/technical-support/messages-filters';
import { useTechnicalSupportMessagesFilters } from 'features/technical-support/messages-filters/use-technical-support-messages-filters';
import { ReplyForm } from 'features/technical-support/reply-form';

export const TechnicalSupport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { status, sorting } = useTechnicalSupportMessagesFilters();
  const {
    data: supportedMessages,
    isError,
    isLoading,
    refetch,
  } = useSupportMessages({
    paginationParams: { page: currentPage - 1, size: USERS_PAGE_SIZE },
    sort: {
      createdAt: sorting,
    },
    filter: {
      status,
    },
  });

  const contentStateValue = parseContentState(
    isLoading,
    isError,
    isEmpty(supportedMessages?.items),
  );

  return (
    <div>
      <TechnicalSupportLettersFilters />
      <ContentState
        state={contentStateValue}
        loadingPlaceholderComponent={
          <div className='flex flex-col divide-y divide-gray-200'>
            {Array.from({ length: USERS_PAGE_SIZE }).map(() => (
              <UserListItemSkeleton />
            ))}
          </div>
        }
        onReload={refetch}
      >
        <div className='flex flex-col gap-y-2 divide-y divide-gray-200'>
          {supportedMessages &&
            supportedMessages.items.map((supportedMessage) => (
              <SupportMessageListItem
                data={supportedMessage}
                action={
                  <ReplyForm messageId={supportedMessage.id} status={supportedMessage.status} />
                }
              />
            ))}
        </div>
      </ContentState>
      {supportedMessages && supportedMessages.totalItems > USERS_PAGE_SIZE && (
        <div className='f-wull flex justify-center py-4'>
          <Pagination
            onPageChange={setCurrentPage}
            totalCount={supportedMessages.totalItems}
            currentPage={currentPage}
            pageSize={USERS_PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
};

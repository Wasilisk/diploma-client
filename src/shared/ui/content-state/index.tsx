import { ContentStateEnum, ContentStateProps } from 'shared/ui/content-state/types';
import { EmptyState } from 'shared/ui/empty-state';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import {Button} from "shared/ui/button";

export function ContentState({
  state,
  loadingPlaceholderComponent,
  emptyPlaceholderComponent,
  errorComponent,
  children,
    onReload,
}: ContentStateProps) {
  switch (state) {
    case ContentStateEnum.showLoadingPlaceholder:
      return loadingPlaceholderComponent;
    case ContentStateEnum.showError:
      return (
        errorComponent || (
          <EmptyState
            icon={
              <ErrorOutlineOutlinedIcon
                style={{ height: '100px', width: '100px' }}
                className='text-gray-500'
              />
            }
            heading={'Сталася непередбачувана помилка. Будь ласка, оновіть сторінку.'}
            action={onReload && <Button variant='primary' onClick={onReload}>Оновити</Button>}
          />
        )
      );
    case ContentStateEnum.showEmptyPlaceholder:
      return emptyPlaceholderComponent || <EmptyState heading='Немає даних для відображення' />;
    case ContentStateEnum.showContent:
      return <>{children}</>;
    default:
      throw Error('Unsupported widget state');
  }
}

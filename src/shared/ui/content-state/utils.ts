import { ContentStateEnum } from 'shared/ui/content-state/types';

export function parseContentState(
  isLoading: boolean,
  isError: boolean,
  isEmpty: boolean,
): ContentStateEnum {
  if (isLoading) return ContentStateEnum.showLoadingPlaceholder;
  if (isError) return ContentStateEnum.showError;
  if (isEmpty) return ContentStateEnum.showEmptyPlaceholder;

  return ContentStateEnum.showContent;
}

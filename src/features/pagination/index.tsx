import { DOTS, usePagination } from 'shared/utils/hooks/use-pagination';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { PaginationButton } from 'features/pagination/pagination-button';

interface PaginationProps {
  onPageChange: (value: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 && paginationRange && paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange?.[paginationRange.length - 1];
  return (
    <ul className='flex w-fit gap-1 rounded-full bg-neutral-100 px-5 py-2'>
      <PaginationButton onClick={onPrevious} disabled={currentPage === 1}>
        <KeyboardArrowLeftIcon />
      </PaginationButton>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className='pagination-item dots'>
              &#8230;
            </li>
          );
        }

        return (
          <PaginationButton
            key={index}
            onClick={() => onPageChange(pageNumber as number)}
            selected={pageNumber === currentPage}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}
      <PaginationButton onClick={onNext} disabled={currentPage === lastPage}>
        <KeyboardArrowRightIcon />
      </PaginationButton>
    </ul>
  );
};

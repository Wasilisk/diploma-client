import { OrdersFilters } from 'features/orders/orders-filters';
import { useUserOrders } from 'shared/utils/hooks/use-user-orders';
import { useState } from 'react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Pagination } from 'features/pagination';
import { Link } from 'react-router-dom';
import { endpoints, ORDERS_PAGE_SIZE } from 'shared/utils/constants';
import { StyledLink } from 'shared/ui/styled-link';

const statusLocalization: Record<string, string> = {
  ACTIVE: 'Заброньовано',
  COMPLETED: 'Завершено',
  CANCELED: 'Відміненно',
};

export const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const { data } = useUserOrders({
    paginationParams: { page: currentPage - 1, size: ORDERS_PAGE_SIZE },
    status: activeFilter !== 'ALL' ? activeFilter : undefined,
  });
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <OrdersFilters activeFilter={activeFilter} onChange={handleFilterClick} />
      <div>
        {data &&
          data.items.map((order) => (
            <div
              className='grid grid-cols-12 gap-x-2 gap-y-4 py-5 sm:flex-row sm:items-center'
              key={order.id}
            >
              <div className='col-span-3 flex items-center gap-x-5'>
                <Link to={`/${endpoints.tours}/${order.tour.id}`}>
                  <img
                    className='h-20 w-20 rounded-2xl'
                    src={order.tour.gallery[0]}
                    alt='Tour image'
                  />
                </Link>
                <StyledLink to={`/${endpoints.directions}/${order.tour.directionId}`}>
                  {order.tour.direction.name}
                </StyledLink>
              </div>
              <div className='col-span-3 flex items-center gap-x-5'>
                <StyledLink to={`/${endpoints.tours}/${order.tour.id}`}>
                  {order.tour.name}
                </StyledLink>
              </div>
              <div className='col-span-3'>
                <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                  Дата і час
                  <br />
                </span>
                <span className='text-base leading-relaxed text-neutral-800'>
                  {format(new Date(order.date), "d MMMM 'в' HH:mm | EEEE", { locale: uk })}
                </span>
              </div>
              <div>
                <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                  Кількість
                  <br />
                </span>
                <span className='text-base leading-relaxed text-neutral-800'>{order.count}</span>
              </div>
              <div>
                <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                  Передоплата
                  <br />
                </span>
                <span className='text-base leading-relaxed text-neutral-800'>100 ₴</span>
              </div>
              <div className='flex items-center justify-between gap-x-5'>
                <div
                  className={`${
                    order.status !== 'ACTIVE' ? 'bg-neutral-200' : 'bg-yellow-400'
                  } w-full rounded-full py-2 text-center text-xs font-semibold`}
                >
                  {statusLocalization[order.status]}
                </div>
              </div>
            </div>
          ))}
        {data && data.totalItems > ORDERS_PAGE_SIZE && (
          <div className='f-wull flex justify-center'>
            <Pagination
              onPageChange={setCurrentPage}
              totalCount={data.totalItems}
              currentPage={currentPage}
              pageSize={ORDERS_PAGE_SIZE}
            />
          </div>
        )}
      </div>
    </>
  );
};

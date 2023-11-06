import { FilterOption, PriceRange } from 'shared/utils/types';

export const prices: FilterOption<PriceRange>[] = [
  { label: 'до 500 ₴', value: { from: null, to: 500 } },
  { label: '500 - 1000 ₴', value: { from: 500, to: 1000 } },
  { label: '1000 - 1500 ₴', value: { from: 1000, to: 1500 } },
  { label: '1500 - 3000 ₴', value: { from: 1500, to: 3000 } },
  { label: 'від 3000 ₴', value: { from: 3000, to: null } },
];

export const paymentTypes: FilterOption<string>[] = [
  { label: 'Оплата на місці (без передоплати)', value: 'без' },
  { label: 'Оплата з передоплатою', value: 'з' },
];

export const tourTypes: FilterOption<string>[] = [
  { label: 'Індивідуальний', value: 'без' },
  { label: 'Груповий', value: 'з' },
];

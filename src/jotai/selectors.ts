import { getDateDiffInDays } from '@/utils/helpers';
import { selectAtom } from 'jotai/utils';
import { reservationInputAtom } from './atoms';

export const reservationDateRangeAtom = selectAtom(
	reservationInputAtom,
	(input) => getDateDiffInDays(input.startDate, input.endDate)
);

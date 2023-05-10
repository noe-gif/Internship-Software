import { formatDateToDDMMYYYY } from 'src/utils/logic/date/formattedDate';

export const isNewDateRangeSet = (newDateRange) => (
  newDateRange && newDateRange[0] !== null && newDateRange[1] !== null
);

export const hasDateRangeChanged = (dateRange, datePicked) => (
  (dateRange && datePicked) && formatDateToDDMMYYYY(dateRange[1]) !== formatDateToDDMMYYYY(datePicked[1])
);

export const isNewDateDifferentFromTheCurrentDate = (
  newDateRange,
  dateRange,
  datePicked,
  hasNewDateChanged,
) => (
  (isNewDateRangeSet(newDateRange)
  && hasDateRangeChanged(dateRange, datePicked))
  || hasNewDateChanged
);

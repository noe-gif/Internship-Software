import { dateRange } from 'src/utils/logic/date/dateRange';
import { filterTurnarounds } from 'src/utils/logic/turnaround/turnaroundFilters';

export const extractTurnaroundsByDate = (datePicked, turnarounds, searchBarValue, selectedTimezone) => ( // eslint-disable-line
  dateRange(datePicked[0], datePicked[1]).map((dateChosen) => (
    { turnarounds: filterTurnarounds(turnarounds, dateChosen, searchBarValue, selectedTimezone), date: dateChosen }
  ))
);

import representUTCDateToChosenTimezoneAndFormat from 'src/utils/logic/date/representUTCDateToChosenTimezoneAndFormat';

export const dateToUTCDate = (localDate, selectedTimezone) => { // eslint-disable-line
  if (localDate) {
    return new Date(
      representUTCDateToChosenTimezoneAndFormat(
        localDate,
        'YYYY-MM-DD HH:MM:SS',
        selectedTimezone,
      ),
    );
  }
  return null;
};

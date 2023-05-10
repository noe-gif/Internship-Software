import representUTCDateToChosenTimezoneAndFormat from 'src/utils/logic/date/representUTCDateToChosenTimezoneAndFormat';

export default function provideFormattedDateTiming(dateTiming, emptyValue, selectedTimezone) {
  return dateTiming
    ? representUTCDateToChosenTimezoneAndFormat(dateTiming, 'hh:mm', selectedTimezone)
    : emptyValue;
}

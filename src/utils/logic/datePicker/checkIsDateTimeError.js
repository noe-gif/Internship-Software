import { MIN_DATE_SELECTABLE } from 'src/constants/date';
import DATE_PICKER_TEXT from 'src/constants/datePicker/datePickerText.json';
import { TASK_TIMING_TARGET } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import { hasDatetimeFilledWithYYYYMMDDSyntax } from 'src/utils/logic/date/dateValidators';
import { isDateRepresentationOutOfUpdatableRange } from 'src/utils/logic/date/dateUpdatableRange';

export function isFormattedDateTimingEmpty(formattedDate) {
  if (formattedDate.timing === '--:--' || formattedDate.timing === '-:-') {
    return true;
  }
  return false;
}

export function convertFormattedDateToUTCDate(formattedDate) {
  const dateArray = formattedDate.date.split('-');
  const timingArray = formattedDate.timing.split(':');

  return new Date(
    dateArray[0],
    Number(dateArray[1]) - 1,
    dateArray[2],
    timingArray[0],
    timingArray[1],
    '00',
  );
}

export function isDateHigherThanActualDate(timingBlock, id, formattedDate) {
  if (timingBlock.includes(id)) {
    const actualDate = new Date();

    if (convertFormattedDateToUTCDate(formattedDate) > actualDate.getTime()) {
      return true;
    }
  }
  return false;
}

export function isFormattedDateLowerThanMinDateSelectable(formattedDate) {
  if (new Date(formattedDate.date) < MIN_DATE_SELECTABLE) {
    return true;
  }
  return false;
}

const isTaskProgressBarDatePickerValueOutOfUpdatableRange = (
  datePickerTarget,
  id,
  rawDateAndTimingFromDatePicker,
  task,
) => {
  const formattedDateTime = `${rawDateAndTimingFromDatePicker?.date}T${rawDateAndTimingFromDatePicker?.timing}:00Z`;

  return isDateRepresentationOutOfUpdatableRange(formattedDateTime, id, task)
  && datePickerTarget === TASK_TIMING_TARGET;
};

export function isDatetimeError(
  rawDateAndTimingFromDatePicker,
  id,
  setter,
  timingBlock,
  task,
  datePickerTarget,
) {
  if (rawDateAndTimingFromDatePicker.date === null) {
    setter(DATE_PICKER_TEXT.error_messages.datetime_null);
    return true;
  }
  if (rawDateAndTimingFromDatePicker.timing === null) {
    setter(DATE_PICKER_TEXT.error_messages.no_error_raise);
    return false;
  }
  if (isFormattedDateTimingEmpty(rawDateAndTimingFromDatePicker)) {
    setter(DATE_PICKER_TEXT.error_messages.timing_empty);
    return true;
  }
  if (isTaskProgressBarDatePickerValueOutOfUpdatableRange(
    datePickerTarget,
    id,
    rawDateAndTimingFromDatePicker,
    task,
  )) {
    setter(DATE_PICKER_TEXT.error_messages.date_updatable_range);
    return true;
  }
  if (hasDatetimeFilledWithYYYYMMDDSyntax(rawDateAndTimingFromDatePicker.date)) {
    setter(DATE_PICKER_TEXT.error_messages.date_format_not_valid);
    return true;
  }
  if (isFormattedDateLowerThanMinDateSelectable(rawDateAndTimingFromDatePicker)) {
    setter(DATE_PICKER_TEXT.error_messages.new_date_lower_than_min_limit);
    return true;
  }
  if (isDateHigherThanActualDate(timingBlock, id, rawDateAndTimingFromDatePicker)) {
    setter(DATE_PICKER_TEXT.error_messages.new_date_higher_actual_date);
    return true;
  }
  setter(DATE_PICKER_TEXT.error_messages.no_error_raise);
  return false;
}

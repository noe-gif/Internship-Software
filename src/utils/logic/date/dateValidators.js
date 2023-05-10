import { MIN_DATE_SELECTABLE } from 'src/constants/date';

export function hasDateRightFormat(date) {
  return Number.isNaN(date.getTime());
}

export function isDateHigherThanActualDate(date) {
  const actualDate = new Date();

  return (date.getTime() > actualDate.getTime());
}

export function isDateLowerThanMinDateSelectable(date) {
  const splittedDate = date.toISOString().split('T');

  return (new Date(splittedDate[0]) < MIN_DATE_SELECTABLE);
}

export function isDateValidToUpdate(date) {
  if (hasDateRightFormat(date)
  || isDateLowerThanMinDateSelectable(date)
  || isDateHigherThanActualDate(date)) {
    return false;
  }
  return true;
}

export function hasDatetimeFilledWithYYYYMMDDSyntax(dateTime) {
  if (dateTime === 'yyyy-mm-dd') {
    return true;
  }
  return false;
}

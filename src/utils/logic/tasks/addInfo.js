import formatDateToDateTimeLocal from 'src/utils/logic/date/formatDateToDateTimeLocal';

import {
  DEFAULT_ADD_INFO_CHECKBOX_VALUE,
  DEFAULT_ADD_INFO_DATE_VALUE,
  DEFAULT_ADD_INFO_NUMBER_VALUE,
  DEFAULT_ADD_INFO_TEXT_VALUE,
} from 'src/constants/tasks/tasksConstant';

export function getAutoValueIfExists(addInfo) {
  return addInfo.auto_value ? addInfo.auto_value : addInfo.value;
}

export function isTheRightAddInfoType(addInfo, addInfoType) {
  return addInfo.value !== null && addInfo.information_type === addInfoType;
}

export function setUseStateTextValue(addInfo) {
  return isTheRightAddInfoType(addInfo, 'TEXT') ? getAutoValueIfExists(addInfo) : DEFAULT_ADD_INFO_TEXT_VALUE;
}

export function setUseStateDateValue(addInfo, selectedTimezone) {
  return isTheRightAddInfoType(addInfo, 'DATETIME')
    ? formatDateToDateTimeLocal(getAutoValueIfExists(addInfo), selectedTimezone)
    : DEFAULT_ADD_INFO_DATE_VALUE;
}

export function setUseStateCheckBoxValue(addInfo) {
  return isTheRightAddInfoType(addInfo, 'CHECKBOX') ? getAutoValueIfExists(addInfo) : DEFAULT_ADD_INFO_CHECKBOX_VALUE;
}

export function setUseStateNumberValue(addInfo) {
  return isTheRightAddInfoType(addInfo, 'NUMBER') ? getAutoValueIfExists(addInfo) : DEFAULT_ADD_INFO_NUMBER_VALUE;
}

export function isValueOnlyNumberAndPositive(value) {
  return /^\d+$/.test(value);
}

export function isValueFilled(value) {
  return (value !== null && value !== '');
}

export function isValueFilledAndPositive(value) {
  return (value !== null && value >= 0 && isValueOnlyNumberAndPositive(value));
}

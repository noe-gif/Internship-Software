import COMPONENT_SIZE from 'src/constants/turnaroundDetail/turnaroundDetailText.json';
import TURNAROUND_DETAIL_HEADER_TEXT from 'src/constants/turnaroundDetail/turnaroundDetailHeaderText.json';

export function componentSizeIsNotLarge(componentSize) {
  return componentSize === COMPONENT_SIZE.componentSize.small
    || componentSize === COMPONENT_SIZE.componentSize.splitView;
}

export function getIataCode(turnaroundData) {
  return turnaroundData?.arrival_flight
    ? turnaroundData?.arrival_flight?.arrival_airport?.iata_code
    : turnaroundData?.departure_flight?.departure_airport?.iata_code;
}

export function getInitialValueIfParkingStandEmpty(parkingStand) {
  return !parkingStand ? '--' : parkingStand;
}

export function getParkingStandValueForModal(parkingStandTriggerValue) {
  if (parkingStandTriggerValue === '--') {
    return TURNAROUND_DETAIL_HEADER_TEXT.return_value.empty_quote;
  }
  return parkingStandTriggerValue;
}

export function regexOnlyNumberAndLetter(valueToCheck) {
  return /^[a-z0-9]+$/gi.test(valueToCheck);
}

export function isParkingStandNull(valueToCheck) {
  if (valueToCheck === null) {
    return true;
  }
  return false;
}

export function isParkingStandCorrectLength(valueToCheck) {
  if (valueToCheck.length === 0 || valueToCheck.length > 4) {
    return true;
  }
  return false;
}

export function isParkingStandCorrectFormat(valueToCheck) {
  if (!regexOnlyNumberAndLetter(valueToCheck)) {
    return true;
  }
  return false;
}

export function errorThrowByParkingStandNewValue(valueToCheck) {
  if (isParkingStandNull(valueToCheck)) {
    return TURNAROUND_DETAIL_HEADER_TEXT.return_value.empty_quote;
  }
  if (isParkingStandCorrectLength(valueToCheck)) {
    return TURNAROUND_DETAIL_HEADER_TEXT.error_message.wrong_length;
  }
  if (isParkingStandCorrectFormat(valueToCheck)) {
    return TURNAROUND_DETAIL_HEADER_TEXT.error_message.wrong_format;
  }
  return TURNAROUND_DETAIL_HEADER_TEXT.return_value.empty_quote;
}

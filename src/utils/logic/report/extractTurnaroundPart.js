import { commonFieldAircraft } from 'src/constants/report/turnaroundCommonField';
import REPORT_FIELD_ADAPTER from 'src/constants/report/turnaroundReportFieldAdapter.json';

import { extractKeyFromDictionary } from 'src/utils/parsing/extractKeyFromDictionary';
import provideDateTiming from 'src/utils/logic/date/provideDateTiming';

import { REPORT_TURNAROUND_INFO_EMPTY } from 'src/constants/report/reportConstant';
import { formatDateToYYYYMMDD } from 'src/utils/logic/date/formattedDate';

const isArrivalInfo = (turnaroundField) => (turnaroundField.value.includes('arrival'));
const isDepartureInfo = (turnaroundField) => (turnaroundField.value.includes('departure'));
const isCommonField = (turnaroundFieldValue) => commonFieldAircraft.includes(turnaroundFieldValue);

const checkDictionaryAvailability = (turnaroundData) => ((turnaroundData?.arrival_flight)
  ? turnaroundData.arrival_flight.aircraft
  : turnaroundData.departure_flight.aircraft
);

const extractCompleteDay = (completeDate, selectedTimezone) => ((completeDate)
  ? `(${formatDateToYYYYMMDD(completeDate, selectedTimezone)})`
  : REPORT_TURNAROUND_INFO_EMPTY
);

const getFieldDictionary = (turnaroundField, turnaroundData, selectedTimezone) => {
  const extractedData = extractKeyFromDictionary(turnaroundField.value, turnaroundData);

  return {
    name: turnaroundField.name,
    value: `${provideDateTiming(extractedData, REPORT_TURNAROUND_INFO_EMPTY, selectedTimezone)}`
    + ` ${extractCompleteDay(extractedData, selectedTimezone)}`,
  };
};

const getCommonFieldDictionary = (turnaroundField, turnaroundData) =>
  (
    {
      name: turnaroundField.name,
      value: extractKeyFromDictionary(turnaroundField.value, turnaroundData),
    }
  );

export default function extractTurnaroundPart(
  turnaroundFormat = [],
  turnaroundData = null,
  selectedTimezone,
) {
  const turnaroundFieldsInfos = [];

  if (!turnaroundFormat) {
    return [];
  }

  turnaroundFormat.forEach((turnaroundField) => {
    let turnaroundFieldToUse = turnaroundField;
    if (REPORT_FIELD_ADAPTER[turnaroundField.value]) {
      turnaroundFieldToUse = {
        name: turnaroundField.name, value: REPORT_FIELD_ADAPTER[turnaroundField.value],
      };
    }

    if (isArrivalInfo(turnaroundField)) {
      turnaroundFieldsInfos.push(getFieldDictionary(
        turnaroundFieldToUse,
        turnaroundData?.arrival_flight,
        selectedTimezone,
      ));
    } else if (isDepartureInfo(turnaroundField)) {
      turnaroundFieldsInfos.push(getFieldDictionary(
        turnaroundFieldToUse,
        turnaroundData?.departure_flight,
        selectedTimezone,
      ));
    } else if (isCommonField(turnaroundFieldToUse.value)) {
      turnaroundFieldsInfos.push(getCommonFieldDictionary(
        turnaroundFieldToUse,
        checkDictionaryAvailability(turnaroundData),
      ));
    } else {
      turnaroundFieldsInfos.push(getFieldDictionary(turnaroundFieldToUse, turnaroundData, selectedTimezone));
    }
  });

  return turnaroundFieldsInfos;
}

import { useState } from 'react';

import {
  ATA,
  ADO,
  ADC,
  ATD,
  RTA,
  RTD,
  TASK_TIMING_TARGET,
  acronymFlightTiming,
} from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import { formatDatePickerDateTime } from 'src/utils/logic/date/formattedDate';
import { isDatetimeError } from 'src/utils/logic/datePicker/checkIsDateTimeError';
import turnaroundDataToDetailObject from 'src/utils/logic/turnaroundDetail/turnaroundDataToDetailObject';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function turnaroundDetailTimingsHook(turnaroundData, updateFlightTiming, resetFlightTimingStatus) {//eslint-disable-line
  const { state: { selectedTimezone } } = useTimezoneFilter();
  const turnaroundDetailObject = turnaroundDataToDetailObject(turnaroundData, selectedTimezone);
  const [adcValue, setAdcValue] = useState(turnaroundDetailObject.adc);
  const [adoValue, setAdoValue] = useState(turnaroundDetailObject.ado);
  const [ataValue, setAtaValue] = useState(turnaroundDetailObject.ata);
  const [atdValue, setAtdValue] = useState(turnaroundDetailObject.atd);
  const [errorMessageDate, setErrorMessageDate] = useState('');
  const [rtaValue, setRtaValue] = useState(turnaroundDetailObject.rta);
  const [rtdValue, setRtdValue] = useState(turnaroundDetailObject.rtd);
  const timingBlock = [ATA, ATD, ADO, ADC];
  const [dateTimingTriggerId, setDateTimingTriggerId] = useState('');
  const [initialDateValue, setInitialDateValue] = useState('');
  const [initialTimingValue, setInitialTimingValue] = useState('');
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [pendingTiming, setPendingTiming] = useState({ flightTimingId: '', timing: '' });
  const [sendFlightStatus, setSendFlightStatus] = useState('default');

  const isCompleteTurnaround = () =>
    (turnaroundData.arrival_flight && turnaroundData.departure_flight);

  const changeTriggerSetterValue = (setter, valueToChange) => {
    if (valueToChange === null) {
      return setter('--:--');
    }
    return setter(valueToChange);
  };

  const updatePendingTiming = () => {
    switch (pendingTiming.flightTimingId) {
    case RTA:
      return changeTriggerSetterValue(setRtaValue, pendingTiming.timing);
    case ATA:
      return changeTriggerSetterValue(setAtaValue, pendingTiming.timing);
    case ATD:
      return changeTriggerSetterValue(setAtdValue, pendingTiming.timing);
    case RTD:
      return changeTriggerSetterValue(setRtdValue, pendingTiming.timing);
    case ADC:
      return changeTriggerSetterValue(setAdcValue, pendingTiming.timing);
    case ADO:
      return changeTriggerSetterValue(setAdoValue, pendingTiming.timing);
    default:
      return null;
    }
  };

  const updateFlightTimingData = (formattedDate, idTriggerValue) => {
    const turnaroundTiming = acronymFlightTiming[idTriggerValue];
    const turnaround = {};
    turnaround[turnaroundTiming] = formatDatePickerDateTime(formattedDate);
    updateFlightTiming(
      {
        turnaround,
        turnaroundId: turnaroundData.id,
      },
    );
    setPendingTiming({ flightTimingId: idTriggerValue, timing: formattedDate.timing });
  };

  const onChangeDateToSend = (formattedDate, id) => {
    if (isDatetimeError(
      formattedDate,
      id,
      setErrorMessageDate,
      timingBlock,
      TASK_TIMING_TARGET,
    )) return null;
    updateFlightTimingData(formattedDate, id);
    return null;
  };

  const showModal = (id, timingValue, dateValue) => {
    setIsDatePickerModalOpen(!isDatePickerModalOpen);
    setDateTimingTriggerId(id);
    setInitialTimingValue(timingValue);
    setInitialDateValue(dateValue);
    resetFlightTimingStatus();
    setErrorMessageDate('');
  };

  const refreshTimingValue = () => {
    setAdcValue(turnaroundDetailObject.adc);
    setAdoValue(turnaroundDetailObject.ado);
    setAtaValue(turnaroundDetailObject.ata);
    setAtdValue(turnaroundDetailObject.atd);
    setRtaValue(turnaroundDetailObject.rta);
    setRtdValue(turnaroundDetailObject.rtd);
  };

  return {
    adcValue,
    adoValue,
    ataValue,
    atdValue,
    dateTimingTriggerId,
    errorMessageDate,
    initialDateValue,
    initialTimingValue,
    isCompleteTurnaround,
    isDatePickerModalOpen,
    onChangeDateToSend,
    refreshTimingValue,
    rtaValue,
    rtdValue,
    sendFlightStatus,
    setPendingTiming,
    selectedTimezone,
    setSendFlightStatus,
    showModal,
    turnaroundDetailObject,
    updatePendingTiming,
  };
}

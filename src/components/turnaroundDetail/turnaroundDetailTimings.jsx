import React, { useEffect } from 'react';

import DatePicker from 'src/components/modal/datePicker';
import TimingEditor from 'src/components/timingEditor/timingEditor';
import TurnaroundDetailArrivalTimings from 'src/components/turnaroundDetail/turnaroundDetailArrivalTimings';
import TurnaroundDetailDepartureTiming from 'src/components/turnaroundDetail/turnaroundDetailDepartureTimings';
import TurnaroundDetailPlaneInformation from 'src/components/turnaroundDetail/turnaroundDetailPlaneInformation';

import { getFlightTimingDate, isComponentSizeLarge } from 'src/utils/component/turnaroundDetailTimings';

import turnaroundDetailTimingHook from 'src/hooks/turnaroundDetail/turnaroundDetailTimingsHook';

import { FAIL, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import 'src/styles/TurnaroundDetailTimings.css';

// TODO : move timing value to children and create two separate hooks for the children

export default function TurnaroundDetailTimings(props) {
  const {
    componentSize,
    resetFlightTimingStatus,
    updateFlightTiming,
    updateFlightTimingStatus,
    turnaroundData,
  } = props;

  const {
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
    selectedTimezone,
    setSendFlightStatus,
    setPendingTiming,
    showModal,
    turnaroundDetailObject,
    updatePendingTiming,
  } = turnaroundDetailTimingHook(turnaroundData, updateFlightTiming, resetFlightTimingStatus);

  useEffect(() => {
    if (updateFlightTimingStatus.status !== sendFlightStatus) {
      if (updateFlightTimingStatus.status === SUCCESS) {
        updatePendingTiming();
      } else {
        setPendingTiming({ flightTimingId: '', timing: '' });
      }
      setSendFlightStatus(updateFlightTimingStatus.status);
      if (updateFlightTimingStatus.status !== FAIL) {
        resetFlightTimingStatus();
      }
    } else {
      refreshTimingValue();
    }
  });

  const rtaEditor = () => (
    <TimingEditor
      className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsCursor
        turnaroundDetailTimingsBoxTextBold-${componentSize}`}
      showModal={() => showModal(
        'rta',
        rtaValue,
        getFlightTimingDate(turnaroundData?.arrival_flight.rescheduled_time_arrival_datetime, selectedTimezone),
      )}
      timingValue={rtaValue}
      timingType="rta"
    />
  );

  const ataEditor = () => (
    <TimingEditor
      className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsCursor
        turnaroundDetailTimingsBoxTextBold-${componentSize}`}
      showModal={() => showModal(
        'ata',
        ataValue,
        getFlightTimingDate(turnaroundData?.arrival_flight.actual_gate_arrival_datetime, selectedTimezone),
      )}
      timingValue={ataValue}
      timingType="ata"
    />
  );

  const adoEditor = () => (
    <TimingEditor
      className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsCursor
        turnaroundDetailTimingsBoxTextBold-${componentSize}`}
      showModal={() => showModal(
        'ado',
        adoValue,
        getFlightTimingDate(turnaroundData?.any_door_opened_datetime, selectedTimezone),
      )}
      timingValue={adoValue}
      timingType="ado"
    />
  );

  const adcEditor = () => (
    <TimingEditor
      className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsCursor
        turnaroundDetailTimingsBoxTextBold-${componentSize}`}
      showModal={() => showModal(
        'adc',
        adcValue,
        getFlightTimingDate(turnaroundData?.all_doors_closed_datetime, selectedTimezone),
      )}
      timingValue={adcValue}
      timingType="adc"
    />
  );

  const atdEditor = () => (
    <TimingEditor
      className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsCursor
        turnaroundDetailTimingsBoxTextBold-${componentSize}`}
      showModal={() => showModal(
        'atd',
        atdValue,
        getFlightTimingDate(turnaroundData?.departure_flight.actual_gate_departure_datetime, selectedTimezone),
      )}
      timingValue={atdValue}
      timingType="atd"
    />
  );

  const rtdEditor = () => (
    <TimingEditor
      className={`fontSizeDefaultBold fontColorDefault turnaroundDetailTimingsCursor
        turnaroundDetailTimingsBoxTextBold-${componentSize}`}
      showModal={() => showModal(
        'rtd',
        rtdValue,
        getFlightTimingDate(turnaroundData?.departure_flight.rescheduled_time_departure_datetime, selectedTimezone),
      )}
      timingValue={rtdValue}
      timingType="rtd"
    />
  );

  return (
    <div className={`turnaroundDetailTimingsWrapper-${componentSize}`}>
      <div
        className={`turnaroundDetailTimingsWrapperContent-${componentSize}`}
        style={{ height: (isCompleteTurnaround() ? null : '19%') }}
      >
        <TurnaroundDetailArrivalTimings
          adoEditor={adoEditor}
          ataEditor={ataEditor}
          componentSize={componentSize}
          rtaEditor={rtaEditor}
          turnaroundData={turnaroundData}
          turnaroundDetailObject={turnaroundDetailObject}
        />
        {isComponentSizeLarge(componentSize) && (
          <TurnaroundDetailPlaneInformation
            componentSize={componentSize}
            turnaroundDetailObject={turnaroundDetailObject}
          />
        )}
        <TurnaroundDetailDepartureTiming
          adcEditor={adcEditor}
          atdEditor={atdEditor}
          componentSize={componentSize}
          rtdEditor={rtdEditor}
          turnaroundData={turnaroundData}
          turnaroundDetailObject={turnaroundDetailObject}
        />
      </div>
      {isDatePickerModalOpen && (
        <DatePicker
          dateTimingTriggerId={dateTimingTriggerId}
          errorMessage={errorMessageDate}
          initialDateValue={initialDateValue}
          initialTimingValue={initialTimingValue}
          onChangeDateToSend={onChangeDateToSend}
          responseStatus={updateFlightTimingStatus}
          showModal={showModal}
        />
      )}
    </div>
  );
}

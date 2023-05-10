import { useState } from 'react';

import {
  errorThrowByParkingStandNewValue,
  getIataCode,
  getInitialValueIfParkingStandEmpty,
  getParkingStandValueForModal,
} from 'src/utils/component/turnaroundDetailHeader';
import {
  arrivalFlightIconColorConditions,
  departureFlightIconColorConditions,
} from 'src/utils/logic/flight/flightIconColorConditions';
import turnaroundDataToDetailObject from 'src/utils/logic/turnaroundDetail/turnaroundDataToDetailObject';

import {
  acronymParkingStand,
  EMPTY_PARKING_STAND_VALUE,
} from 'src/constants/turnaroundDetail/turnaroundDetailHeaderConstant';
import { DEFAULT as DEFAULT_STATUS, FAIL } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import TURNAROUND_DETAIL_HEADER_TEXT from 'src/constants/turnaroundDetail/turnaroundDetailHeaderText.json';

import { COMPLETED } from 'src/types/FlightStatus';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function turnaroundDetailHeaderHook(
  turnaroundData,
  resetParkingStandStatus,
  updateParkingStand,
) {
  const { state: { selectedTimezone } } = useTimezoneFilter();
  const [actualParkingStandStatus, setActualParkingStandStatus] = useState(DEFAULT_STATUS);
  const [isParkingStandModalOpen, setParkingStandModalOpen] = useState(false);
  const [parkingStandArrival, setParkingStandArrival] = useState(getInitialValueIfParkingStandEmpty(
    turnaroundData?.arrival_flight?.parking_stand_arrival,
  ));
  const [parkingStandErrorMessage, setParkingStandErrorMessage] = useState(EMPTY_PARKING_STAND_VALUE);
  const [parkingStandDeparture, setParkingStandDeparture] = useState(getInitialValueIfParkingStandEmpty(
    turnaroundData?.departure_flight?.parking_stand_departure,
  ));
  const [parkingStandType, setParkingStandType] = useState(EMPTY_PARKING_STAND_VALUE);
  const [parkingStandValue, setParkingStandValue] = useState(EMPTY_PARKING_STAND_VALUE);

  const turnaroundAirportIataCode = getIataCode(turnaroundData);
  const turnaroundDetailObject = turnaroundDataToDetailObject(turnaroundData, selectedTimezone);

  const areActualArrivalParkingStandAndTurnaroundParkingStandUnequal = (
    turnaroundData?.arrival_flight?.parking_stand_arrival
    && (parkingStandArrival !== turnaroundData?.arrival_flight?.parking_stand_arrival)
  );
  const areActualDepartureParkingStandAndTurnaroundParkingStandUnequal = (
    turnaroundData?.departure_flight?.parking_stand_departure
    && (parkingStandDeparture !== turnaroundData?.departure_flight?.parking_stand_departure)
  );

  let arrivalIcon;
  let departureIcon;

  if (turnaroundData.status && turnaroundData.arrival_flight) {
    arrivalIcon = arrivalFlightIconColorConditions(
      turnaroundData.status.category,
      turnaroundData.arrival_flight.actual_gate_arrival_datetime,
      turnaroundData.arrival_flight.estimated_gate_arrival_datetime,
      turnaroundData.arrival_flight.sta,
    );
  }

  if (turnaroundData.status && turnaroundData.departure_flight) {
    departureIcon = departureFlightIconColorConditions(
      turnaroundData.status.category,
      turnaroundData.departure_flight.actual_gate_departure_datetime,
      turnaroundData.departure_flight.std,
    );
  }

  const showModal = (parkingStandTriggerType, parkingStandTriggerValue) => {
    setParkingStandModalOpen(!isParkingStandModalOpen);
    setParkingStandType(parkingStandTriggerType);
    setParkingStandValue(getParkingStandValueForModal(parkingStandTriggerValue));
    resetParkingStandStatus();
    setParkingStandErrorMessage('');
  };

  const updateParkingStandData = (value, type, isOnBothParkingStand) => {
    const parkingStand = acronymParkingStand[type];
    const turnaround = {};

    if (isOnBothParkingStand) {
      updateParkingStand({
        turnaround: {
          parking_stand_departure: value,
          parking_stand_arrival: value,
        },
        turnaroundId: turnaroundData.id,
      });
    } else {
      turnaround[parkingStand] = value;
      updateParkingStand({ turnaround, turnaroundId: turnaroundData.id });
    }
  };

  const parkingStandToSend = (value, type, isOnBothParkingStand) => {
    const errorMessage = errorThrowByParkingStandNewValue(value);

    setParkingStandErrorMessage(errorMessage);
    if (errorMessage !== TURNAROUND_DETAIL_HEADER_TEXT.return_value.empty_quote) {
      return null;
    }
    updateParkingStandData(value, type, isOnBothParkingStand);
    return null;
  };

  const handleParkingStandChanged = () => {
    setParkingStandArrival(getInitialValueIfParkingStandEmpty(
      turnaroundData?.arrival_flight?.parking_stand_arrival,
    ));
    setParkingStandDeparture(getInitialValueIfParkingStandEmpty(
      turnaroundData?.departure_flight?.parking_stand_departure,
    ));
    return null;
  };

  const handleParkingStandChangedThroughHook = (parkingStandRequestStatus) => {
    if (parkingStandRequestStatus !== actualParkingStandStatus) {
      handleParkingStandChanged();
      setActualParkingStandStatus(parkingStandRequestStatus);
      if (parkingStandRequestStatus !== FAIL) {
        resetParkingStandStatus();
      }
    } else {
      if (areActualArrivalParkingStandAndTurnaroundParkingStandUnequal) {
        setParkingStandArrival(turnaroundData?.arrival_flight?.parking_stand_arrival);
      }
      if (areActualDepartureParkingStandAndTurnaroundParkingStandUnequal) {
        setParkingStandDeparture(turnaroundData?.departure_flight?.parking_stand_departure);
      }
    }
  };

  const isTurnaroundStatusCompleted = () => (turnaroundData.status.category === COMPLETED);

  return {
    arrivalIcon,
    departureIcon,
    handleParkingStandChangedThroughHook,
    isParkingStandModalOpen,
    isTurnaroundStatusCompleted,
    parkingStandArrival,
    parkingStandDeparture,
    parkingStandErrorMessage,
    parkingStandToSend,
    parkingStandType,
    parkingStandValue,
    selectedTimezone,
    showModal,
    turnaroundAirportIataCode,
    turnaroundDetailObject,
  };
}

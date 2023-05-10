import { TURNAROUND_DETAIL_EMPTY_TEXT, TURNAROUND_DETAIL_EMPTY_TIMING } from 'src/constants/emptyValues';
import provideDateTiming from 'src/utils/logic/date/provideDateTiming';
import secondsToHHMMFormat from 'src/utils/logic/date/secondsToHHMMFormat';

export default function turnaroundDataToDetailObject(turnaroundData, selectedTimezone) {
  const emptyTiming = TURNAROUND_DETAIL_EMPTY_TIMING;
  const emptyTextInformation = TURNAROUND_DETAIL_EMPTY_TEXT;

  const detailObject = {
    sta: emptyTiming,
    rta: emptyTiming,
    eta: emptyTiming,
    ata: emptyTiming,
    ado: emptyTiming,
    aircraft: emptyTextInformation,
    tail_number: emptyTextInformation,
    mtt: emptyTiming,
    adct: emptyTiming,
    adc: emptyTiming,
    atd: emptyTiming,
    std: emptyTiming,
    rtd: emptyTiming,
    ptd: emptyTiming,
  };

  if (!turnaroundData) {
    return detailObject;
  }

  detailObject.mtt = secondsToHHMMFormat(turnaroundData.minimum_turnaround_time_seconds);
  detailObject.tail_number = turnaroundData.arrival_flight
    ? turnaroundData.arrival_flight.aircraft.tail_number
    : turnaroundData.departure_flight.aircraft.tail_number;
  detailObject.aircraft = turnaroundData.arrival_flight
    ? turnaroundData.arrival_flight.aircraft.icao_code
    : turnaroundData.departure_flight.aircraft.icao_code;

  if (turnaroundData.arrival_flight) {
    const { arrival_flight: arrivalFlight, any_door_opened_datetime: anyDoorOpenedDatetime } = turnaroundData;

    detailObject.sta = provideDateTiming(arrivalFlight.sta, emptyTiming, selectedTimezone);
    detailObject.rta = provideDateTiming(
      arrivalFlight.rescheduled_time_arrival_datetime,
      emptyTiming,
      selectedTimezone,
    );
    detailObject.eta = provideDateTiming(arrivalFlight.estimated_gate_arrival_datetime, emptyTiming, selectedTimezone);
    detailObject.ata = provideDateTiming(arrivalFlight.actual_gate_arrival_datetime, emptyTiming, selectedTimezone);
    detailObject.ado = provideDateTiming(anyDoorOpenedDatetime, emptyTiming, selectedTimezone);
  }

  if (turnaroundData.departure_flight) {
    const {
      departure_flight: departureFlight,
      all_doors_closed_datetime: allDoorsClosedDatetime,
      all_doors_closed_target_datetime: allDoorsClosedTargetDatetime,
    } = turnaroundData;

    detailObject.adct = provideDateTiming(allDoorsClosedTargetDatetime, emptyTiming, selectedTimezone);
    detailObject.adc = provideDateTiming(allDoorsClosedDatetime, emptyTiming, selectedTimezone);
    detailObject.atd = provideDateTiming(departureFlight.actual_gate_departure_datetime, emptyTiming, selectedTimezone);
    detailObject.std = provideDateTiming(departureFlight.std, emptyTiming, selectedTimezone);
    detailObject.rtd = provideDateTiming(
      departureFlight.rescheduled_time_departure_datetime,
      emptyTiming,
      selectedTimezone,
    );
    detailObject.ptd = provideDateTiming(
      departureFlight.estimated_gate_departure_datetime,
      emptyTiming,
      selectedTimezone,
    );
  }

  return detailObject;
}

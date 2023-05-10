import { useState } from 'react';

import { arrivalFlightIconColorConditions } from 'src/utils/logic/flight/flightIconColorConditions';
import { formatDateToYYYYMMDD } from 'src/utils/logic/date/formattedDate';

import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function arrivalFlightHook(arrivalFlight, turnaroundStatus, turnaroundDate) {
  const [arrivalIcon, setArrivalIcon] = useState(null);
  const [fontArrivalFlight, setFontArrivalFlight] = useState('subtitle1');
  const { state: { selectedTimezone } } = useTimezoneFilter();

  const hasAirportIataCode = () => (arrivalFlight.departure_airport.iata_code);
  const hasCompleteFlightNumber = () => (arrivalFlight.carrier_code && arrivalFlight.flight_number);

  const extractArrivalIconFromFlight = () => {
    if (turnaroundStatus && arrivalFlight) {
      setArrivalIcon(arrivalFlightIconColorConditions(
        turnaroundStatus.category,
        arrivalFlight.actual_gate_arrival_datetime,
        arrivalFlight.estimated_gate_arrival_datetime,
        arrivalFlight.scheduled_time_arrival_datetime,
      ));
    }
  };

  const extractFontArrivalFlightFromFlight = () => {
    if (!arrivalFlight || !arrivalFlight.scheduled_time_arrival_datetime || !turnaroundDate) {
      setFontArrivalFlight('subtitle1');
    } else if (formatDateToYYYYMMDD(arrivalFlight.scheduled_time_arrival_datetime, selectedTimezone)
        !== formatDateToYYYYMMDD(turnaroundDate, selectedTimezone)
    ) {
      setFontArrivalFlight('subtitle2');
    }
  };

  const refreshArrivalDisplay = () => {
    extractArrivalIconFromFlight();
    extractFontArrivalFlightFromFlight();
  };

  return {
    arrivalIcon,
    fontArrivalFlight,
    hasAirportIataCode,
    hasCompleteFlightNumber,
    refreshArrivalDisplay,
    selectedTimezone,
  };
}

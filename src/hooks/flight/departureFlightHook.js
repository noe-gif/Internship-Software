import { useState } from 'react';

import { departureFlightIconColorConditions } from 'src/utils/logic/flight/flightIconColorConditions';
import { formatDateToYYYYMMDD } from 'src/utils/logic/date/formattedDate';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function departureFlightHook(departureFlight, turnaroundDate, turnaroundStatus) {
  const { state: { selectedTimezone } } = useTimezoneFilter();
  const [departureIcon, setDepartureIcon] = useState(null);
  const [fontDepartureFlight, setFontDepartureFlight] = useState('subtitle1');

  const extractDepartureIconFromFlight = () => {
    if (turnaroundStatus && departureFlight) {
      setDepartureIcon(departureFlightIconColorConditions(
        turnaroundStatus.category,
        departureFlight.actual_gate_departure_datetime,
        departureFlight.scheduled_time_departure_datetime,
      ));
    }
  };

  const extractFontDepartureFlightFromFlight = () => {
    if (formatDateToYYYYMMDD(departureFlight?.scheduled_time_departure_datetime, selectedTimezone)
      !== formatDateToYYYYMMDD(turnaroundDate, selectedTimezone)
    ) {
      setFontDepartureFlight('subtitle2');
    } else {
      setFontDepartureFlight('subtitle1');
    }
  };

  const refreshDepartureDisplay = () => {
    extractDepartureIconFromFlight();
    extractFontDepartureFlightFromFlight();
  };

  return {
    departureIcon,
    fontDepartureFlight,
    refreshDepartureDisplay,
    selectedTimezone,
  };
}

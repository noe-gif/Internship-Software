import React from 'react';

import CheckboxArrivalDeparture from 'src/components/filter/filtersArrivalDeparture';

import DASHBOARD_HEADER_TEXT from 'src/constants/header/dashboardHeaderText.json';

export default function TurnaroundDepartureOnlyFilter() {
  return (
    <CheckboxArrivalDeparture label={DASHBOARD_HEADER_TEXT.departures_button} name="departure" />
  );
}

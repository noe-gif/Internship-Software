import React from 'react';

import TurnaroundAirportPicker from 'src/containers/header/turnaroundAirportPickerContainer';
import TurnaroundDateRangePicker from 'src/containers/header/turnaroundDateRangePickerContainer';
import TurnaroundSearchBarFilter from 'src/containers/header/turnaroundSearchBarFilterContainer';

export default function DashboardFilters() {
  return (
    <div className="dashboardFiltersWrapper">
      <TurnaroundAirportPicker />
      <TurnaroundDateRangePicker />
      <TurnaroundSearchBarFilter />
    </div>
  );
}

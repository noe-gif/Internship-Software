import React from 'react';

import DashboardFilters from 'src/components/filter/dashboardFilters';
import DashboardTurnaroundRefreshTimer from 'src/components/filter/dashboardTurnaroundRefreshTimer';
import DashboardTimeZoneFilter from 'src/components/filter/DashboardTimeZoneFilter';

import 'src/styles/DashboardHeader.css';

export default function dashboardHeader(props) {
  const { airportPicked } = props;

  return (
    <div className="dashboardHeaderWrapper">
      <DashboardTimeZoneFilter airportPicked={airportPicked} />
      <DashboardFilters />
      <DashboardTurnaroundRefreshTimer />
    </div>
  );
}

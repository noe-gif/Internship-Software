import React from 'react';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';
import 'src/styles/DashboardTimeZoneFilter.css';

export default function DashboardTimeZoneFilterClientTimezone() {
  const { state: { selectedTimezone } } = useTimezoneFilter();

  const getTimezoneText = () => {
    if (selectedTimezone === 'UTC') {
      return '';
    }

    const timezoneOffset = new Date().getTimezoneOffset() / -60;
    return timezoneOffset > 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;
  };

  return (
    <h1 className="dashboardTimeZoneFilterUtcText">
      <em>{`UTC${getTimezoneText()}`}</em>
    </h1>
  );
}

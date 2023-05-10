import React from 'react';
import { TimezoneFilterContext } from 'src/context/timezoneFilterContext';

export default function useTimezoneFilter() {
  const timezoneFilterContext = React.useContext(TimezoneFilterContext);

  if (timezoneFilterContext === undefined) {
    throw new Error('useTimezoneFilter hook must be used within a TimezoneFilterProvider');
  }

  return timezoneFilterContext;
}

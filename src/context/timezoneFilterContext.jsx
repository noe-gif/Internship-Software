import React, { useMemo, createContext } from 'react';
import timezoneFilterReducer from 'src/reducers/timezoneFilterReducer';

export const TimezoneFilterContext = createContext();

export const timezoneFilterTypes = {
  UTC: 'SET_UTC',
  LOCAL: 'SET_LOCAL',
};

export const timezoneFilterValues = {
  UTC: 'UTC',
  LOCAL: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export function TimezoneFilterProvider({ children }) {
  const [state, selectTimezone] = React.useReducer(timezoneFilterReducer, {
    selectedTimezone: timezoneFilterValues.LOCAL,
  });

  const defaultContextValue = useMemo(() => ({ state, selectTimezone }), [state, selectTimezone]);

  return (
    <TimezoneFilterContext.Provider value={defaultContextValue}>
      {children}
    </TimezoneFilterContext.Provider>
  );
}

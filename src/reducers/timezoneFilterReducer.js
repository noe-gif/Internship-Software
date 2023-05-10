import { timezoneFilterTypes, timezoneFilterValues } from 'src/context/timezoneFilterContext';

export default function timezoneFilterReducer(state, action) {
  switch (action.type) {
  case timezoneFilterTypes.UTC:
    return {
      ...state,
      selectedTimezone: timezoneFilterValues.UTC,
    };

  case timezoneFilterTypes.LOCAL:
    return {
      ...state,
      selectedTimezone: timezoneFilterValues.LOCAL,
    };

  default:
    throw new Error(`Unhandled action type: ${action.type}`);
  }
}

/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { getNodeText, render, fireEvent } from '@testing-library/react';
import DashboardTimeZoneFilter from 'src/components/filter/DashboardTimeZoneFilter';
import { timezoneFilterValues, TimezoneFilterContext } from 'src/context/timezoneFilterContext';
import { removeAllAirportsToEnvVar } from 'tests/setEnvVars';

describe('testing the behavior of the time zone filter filter', () => {
  const airportPicked = 'MXP';
  it('should display UTC-3 as a text if the timezone filter is set to UTC-3', () => {
    render(
      <TimezoneFilterContext.Provider value={{ state: { selectedTimezone: timezoneFilterValues.LOCAL } }}>
        <DashboardTimeZoneFilter airportPicked={airportPicked} />
      </TimezoneFilterContext.Provider>,
    );

    const timezoneText = getNodeText(document.querySelector('.dashboardTimeZoneFilterUtcText em'));

    expect(timezoneText).toStrictEqual('UTC-3');
  });

  it('should display UTC as a text if the timezone filter is set to UTC', () => {
    render(
      <TimezoneFilterContext.Provider value={{ state: { selectedTimezone: timezoneFilterValues.UTC } }}>
        <DashboardTimeZoneFilter airportPicked={airportPicked} />
        ,
      </TimezoneFilterContext.Provider>,
    );

    const timezoneText = getNodeText(document.querySelector('.dashboardTimeZoneFilterUtcText em'));

    expect(timezoneText).toStrictEqual('UTC');
  });

  it('the state of filter should change to UTC if the utc button is clicked', () => {
    const dispatchFunction = jest.fn();
    render(
      <TimezoneFilterContext.Provider value={{
        state: { selectedTimezone: timezoneFilterValues.LOCAL },
        selectTimezone: dispatchFunction,
      }}
      >
        <DashboardTimeZoneFilter airportPicked={airportPicked} />
        ,
      </TimezoneFilterContext.Provider>,
    );

    const utcButton = document.querySelector('#dashboardTimeZoneFilterButtonUtc');

    fireEvent.click(utcButton);

    expect(dispatchFunction).toHaveBeenCalledTimes(1);
  });

  it('the state of filter should change to the local timezone if the my local timezone button is clicked', () => {
    const dispatchFunction = jest.fn();
    render(
      <TimezoneFilterContext.Provider value={{
        state: { selectedTimezone: timezoneFilterValues.LOCAL },
        selectTimezone: dispatchFunction,
      }}
      >
        <DashboardTimeZoneFilter airportPicked={airportPicked} />
        ,
      </TimezoneFilterContext.Provider>,
    );

    const utcButton = document.querySelector('#dashboardTimeZoneFilterButtonMyTimeZone');

    fireEvent.click(utcButton);

    expect(dispatchFunction).toHaveBeenCalledTimes(1);
  });

  it('should render the time zone filter if the airport picked is in the env file', () => {
    render(
      <TimezoneFilterContext.Provider value={{ state: { selectedTimezone: timezoneFilterValues.LOCAL } }}>
        <DashboardTimeZoneFilter airportPicked={airportPicked} />
      </TimezoneFilterContext.Provider>,
    );

    const component = document.querySelector('.dashboardTimeZoneFilterWrapper');

    expect(component).toBeInTheDocument();
  });

  it('should not render the time zone filter if the airport picked is not in the env file', () => {
    const dispatchFunction = jest.fn();
    render(
      <TimezoneFilterContext.Provider value={{
        state: { selectedTimezone: timezoneFilterValues.LOCAL },
        selectTimezone: dispatchFunction,
      }}
      >
        <DashboardTimeZoneFilter airportPicked="ACC" />
      </TimezoneFilterContext.Provider>,
    );

    const component = document.querySelector('.dashboardTimeZoneFilterWrapper');

    expect(component).toBe(null);
  });

  it('should render the time zone filter to all airports if the length of the env var is 0', () => {
    const dispatchFunction = jest.fn();
    removeAllAirportsToEnvVar();
    render(
      <TimezoneFilterContext.Provider value={{
        state: { selectedTimezone: timezoneFilterValues.LOCAL },
        selectTimezone: dispatchFunction,
      }}
      >
        <DashboardTimeZoneFilter airportPicked="ACC" />
      </TimezoneFilterContext.Provider>,
    );

    const component = document.querySelector('.dashboardTimeZoneFilterWrapper');

    expect(component).toBeInTheDocument();
  });
});

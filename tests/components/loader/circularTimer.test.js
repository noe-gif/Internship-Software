/**
 * @jest-environment jsdom
*/


import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import CircularTimer from 'src/components/loader/circularTimer';

const refreshTurnarounds = () => {};
const spyRefreshTurnarounds = jest.fn(refreshTurnarounds);

// mocking APP_AUTO_REFRESH_INTERVAL_MS do avoid test error caused by env dependencies
jest.mock('src/constants/globals',
  () => { return ({APP_AUTO_REFRESH_INTERVAL_MS: 30000}) },
);

const accessToken = "awesomeToken";
const airportPicked = "TTT";
const datePicked = "2021-12-25T13:00:00Z";
const isCurrentlyLoading = false;
const username = 'tarmac.dev';
const turnarounds = [];

describe('CircularTimer', () => {
  it('should call refreshTurnarounds when clicking on circularTimer component', () => {
    render(
      <CircularTimer
        accessToken={accessToken}
        airportPicked={airportPicked}
        datePicked={datePicked}
        isCurrentlyLoading={isCurrentlyLoading}
        refreshTurnarounds={spyRefreshTurnarounds}
        turnarounds={turnarounds}
        username={username}
      />
    );

    fireEvent.click(document.querySelector("#tarmacdevCircularTimer"));

    expect(spyRefreshTurnarounds).toHaveBeenCalledWith(
      "awesomeToken",
      "2021-12-25T13:00:00Z",
      "TTT",
    );

    spyRefreshTurnarounds.mockClear();
  });
});

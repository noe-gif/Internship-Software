/**
 * @jest-environment jsdom
*/

import React from "react";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import TurnaroundAirportPicker from 'src/components/filter/turnaroundAirportPicker';

const airportsAvailable = [
  {iata_code: 'TNR'},
  {iata_code: 'BOS'},
  {iata_code: 'SFO'},
  {iata_code: 'ORY'},
];
const airportPicked = 'ORY';
const datePicked = [
  "Mon Oct 18 2021 13:44:44 GMT+0200 (heure d’été d’Europe centrale)",
  "Mon Oct 18 2021 13:44:44 GMT+0200 (heure d’été d’Europe centrale)"
];

describe('AirportForm', () => {
  it('should display the airport picked', () => {
    render(
      <TurnaroundAirportPicker
        airportsAvailable={airportsAvailable}
        airportPicked={airportPicked}
        datePicked={datePicked}
        userAccessToken='1234FD34EDWsdfqsdfqe'
        requestUserAirportAction={() => {}}
        turnaroundRequestAction={() => {}}
      />
    );
    expect(screen.getByDisplayValue("ORY")).toBeInTheDocument();
  });

  it('should display empty quote because no airport has been picked', () => {
    render(
      <TurnaroundAirportPicker
        airportsAvailable={[]}
        airportPicked={''}
        datePicked={datePicked}
        userAccessToken='1234FD34EDWsdfqsdfqe'
        requestUserAirportAction={() => {}}
        turnaroundRequestAction={() => {}}
      />
    );
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });
});
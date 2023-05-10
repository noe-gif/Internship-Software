/**
 * @jest-environment jsdom
*/

import React from "react";
import {getNodeText, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import FlightHeader from 'src/components/header/flightHeader';

const turnaroundFlights = {
  arrival_flight: {
    carrier_code: "KL",
    flight_number: "605",
  },
  departure_flight : {
    carrier_code: "KL",
    flight_number: "606"
  }
}

describe('FlightHeader', () => {
  describe('with componentSize equal to large', () => {
    beforeEach(() => {
      render(<FlightHeader
        componentSize="large"
        turnaroundId={12345}
        turnaroundFlights={turnaroundFlights}
      />);
    });
  
    it('displays the arrival flight', () => {
      expect(getNodeText(document.querySelector("#flightHeaderArrivalTitle12345")))
      .toStrictEqual('KL 605');
    });
  
    it('displays the departure flight', () => {
      expect(getNodeText(document.querySelector("#flightHeaderDepartureTitle12345")))
      .toStrictEqual('KL 606');
    });
  
    it('displays the alt of landing plane', () => {
      expect(screen.getByAltText('landing plane icon')).toBeInTheDocument();
    });
  
    it('displays the alt of take off plane', () => {
      expect(screen.getByAltText('departure plane icon')).toBeInTheDocument();
    });
  });

  describe('with componentSize equal to small', () => {
    beforeEach(() => {
      render(<FlightHeader
        componentSize="small"
        turnaroundId={12345}
        turnaroundFlights={turnaroundFlights}
      />);
    });
  
    it('displays the arrival flight', () => {
      expect(getNodeText(document.querySelector("#flightHeaderArrivalTitle12345")))
      .toStrictEqual('KL 605');
    });
  
    it('displays the departure flight', () => {
      expect(getNodeText(document.querySelector("#flightHeaderDepartureTitle12345")))
      .toStrictEqual('KL 606');
    });
  
    it('displays the alt of landing plane', () => {
      expect(screen.getByAltText('landing plane icon')).toBeInTheDocument();
    });
  
    it('displays the alt of take off plane', () => {
      expect(screen.getByAltText('departure plane icon')).toBeInTheDocument();
    });
  });

  describe('with componentSize equal to large.splitView', () => {
    beforeEach(() => {
      render(<FlightHeader
        componentSize="large.splitView"
        turnaroundId={12345}
        turnaroundFlights={turnaroundFlights}
      />);
    });

    it('displays the arrival flight', () => {
      expect(getNodeText(document.querySelector("#flightHeaderArrivalTitle12345")))
      .toStrictEqual('KL 605');
    });

    it('displays the departure flight', () => {
      expect(getNodeText(document.querySelector("#flightHeaderDepartureTitle12345")))
      .toStrictEqual('KL 606');
    });

    it('displays the alt of landing plane', () => {
      expect(screen.getByAltText('landing plane icon')).toBeInTheDocument();
    });

    it('displays the alt of take off plane', () => {
      expect(screen.getByAltText('departure plane icon')).toBeInTheDocument();
    });
  });
});

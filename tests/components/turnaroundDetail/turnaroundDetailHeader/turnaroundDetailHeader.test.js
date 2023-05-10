/**
 * @jest-environment jsdom
*/

import React from "react";
import { getNodeText, render } from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import { COMPLETED } from 'src/types/FlightStatus';

import TurnaroundDetailHeader from 'src/components/turnaroundDetail/turnaroundDetailHeader';

const turnaround = {
  id: 12345,
  delays: [
    { code: "15D", duration: 20, id: 217771 },
    { code: "15B", duration: 11, id: 217770},
  ],
  arrival_flight: {
    departure_airport: { iata_code: 'FDF' },
    arrival_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-19T05:40:00Z",
    std: "2021-09-18T21:20:00Z",
    parking_stand_arrival: null,
  },
  departure_flight: {
    arrival_airport: { iata_code: 'SFO' },
    departure_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-20T19:05:00Z",
    std: "2021-09-20T10:20:00Z",
    parking_stand_departure: 'TT34',
  },
  status: { category: COMPLETED }
};

describe('TurnaroundDetailHeader', () => {
  describe("tests when it's a small component size", () => {
    beforeEach(() => {
      render(<TurnaroundDetailHeader
        componentSize="small"
        turnaroundData={turnaround}
        parkingStandRequestStatus={{status: 'success', statusCode: 200}}
        updateParkingStand={() => {}}
        resetParkingStandStatus={() => {}}
      />);
    });

    it('should display arrival airport: SFO', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderArrivalAirportIataCode12345')))
      .toStrictEqual('SFO');
    });

    it('should display departure airport: FDF', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderDepartureAirportIataCode12345')))
      .toStrictEqual('FDF');
    });

    it('should display maintenance operation airport: ORY', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderHubAirportIataCode12345')))
      .toStrictEqual('ORY');
    });

    it('should display arrival time at hub airport: 19SEP21', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderSta12345')))
      .toStrictEqual('19SEP21');
    });

    it('should display departure time at hub airport: 20SEP21', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderStd12345')))
      .toStrictEqual('20SEP21');
    });

    it('should display aircraft data', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderTailNumber12345')))
      .toStrictEqual('FHTOO');

      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderAircraft12345')))
      .toStrictEqual('A35K');
    });

    it('should display arrival parking stand', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderParkingStandarrival12345')))
      .toStrictEqual('--');
    });

    it('should display departure parking stand', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderParkingStanddeparture12345')))
      .toStrictEqual('TT34');
    });

    it('should display delays code without additional infos', () => {
      expect(getNodeText(document.querySelector('#DelayId217771')))
      .toStrictEqual('15D');

      expect(getNodeText(document.querySelector('#DelayId217770')))
      .toStrictEqual('15B');
    });
  });
  describe("tests when it's a large splitView component size", () => {
    beforeEach(() => {
      render(<TurnaroundDetailHeader
        componentSize="large splitView"
        turnaroundData={turnaround}
        parkingStandRequestStatus={{status: 'success', statusCode: 200}}
        updateParkingStand={() => {}}
        resetParkingStandStatus={() => {}}
      />);
    });

    it('should display arrival airport: SFO', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderArrivalAirportIataCode12345')))
      .toStrictEqual('SFO');
    });

    it('should display departure airport: FDF', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderDepartureAirportIataCode12345')))
      .toStrictEqual('FDF');
    });

    it('should display maintenance operation airport: ORY', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderHubAirportIataCode12345')))
      .toStrictEqual('ORY');
    });

    it('should display arrival time at hub airport: 19SEP21', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderSta12345')))
      .toStrictEqual('19SEP21');
    });

    it('should display departure time at hub airport: 20SEP21', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderStd12345')))
      .toStrictEqual('20SEP21');
    });

    it('should display aircraft data', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderTailNumber12345')))
      .toStrictEqual('FHTOO');

      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderAircraft12345')))
      .toStrictEqual('A35K');
    });

    it('should display arrival parking stand', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderParkingStandarrival12345')))
      .toStrictEqual('--');
    });

    it('should display departure parking stand', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderParkingStanddeparture12345')))
      .toStrictEqual('TT34');
    });

    it('should display delays code without additional infos', () => {
      expect(getNodeText(document.querySelector('#DelayId217771')))
      .toStrictEqual('15D');

      expect(getNodeText(document.querySelector('#DelayId217770')))
      .toStrictEqual('15B');
    });
  });

  describe("tests when it's a large component size", () => {
    beforeEach(() => {
      render(<TurnaroundDetailHeader
        componentSize="large"
        turnaroundData={turnaround}
        parkingStandRequestStatus={{status: 'success', statusCode: 200}}
        updateParkingStand={() => {}}
        resetParkingStandStatus={() => {}}
      />);
    });

    it('should display arrival airport: SFO', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderArrivalAirportIataCode12345')))
      .toStrictEqual('SFO');
    });

    it('should display departure airport: FDF', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderDepartureAirportIataCode12345')))
      .toStrictEqual('FDF');
    });

    it('should display maintenance operation airport: ORY', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderHubAirportIataCode12345')))
      .toStrictEqual('ORY');
    });

    it('should display arrival time at hub airport: 19SEP21', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderSta12345')))
      .toStrictEqual('19SEP21');
    });

    it('should display departure time at hub airport: 20SEP21', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderStd12345')))
      .toStrictEqual('20SEP21');
    });

    it('should display arrival parking stand', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderParkingStandarrival12345')))
      .toStrictEqual('--');
    });

    it('should display departure parking stand', () => {
      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderParkingStanddeparture12345')))
      .toStrictEqual('TT34');
    });

    it('should display delays code with additional infos like the minutes of delays', () => {
      expect(getNodeText(document.querySelector('#DelayId217771')))
      .toStrictEqual('15D');

      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderDelayCodeAddText217771')))
      .toStrictEqual('(20min)');

      expect(getNodeText(document.querySelector('#DelayId217770')))
      .toStrictEqual('15B');

      expect(getNodeText(document.querySelector('#turnaroundDetailHeaderDelayCodeAddText217770')))
      .toStrictEqual('(11min)');
    });
  });
});

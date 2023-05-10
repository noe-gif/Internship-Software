/**
 * @jest-environment jsdom
*/

import React from "react";
import {getNodeText, render, screen} from 'tests/renderTimezoneFilter';
import '@testing-library/jest-dom';

import { COMPLETED, INCOMING } from 'src/types/FlightStatus';

import TurnaroundDetailHeader from 'src/components/turnaroundDetail/turnaroundDetailHeader';

const turnaround = {
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

describe('Testing Delay code render in turnaroundDetailHeader Component', () => {
  describe('Testing When componentSize is large', () => {
    it('should display one delay code when turnaround status is COMPLETED and turnaround has 1 delay code', () => {
      render(<TurnaroundDetailHeader
        componentSize="large"
        turnaroundData={{
          ...turnaround,
          status: { category: COMPLETED },
          delays: [ { code: "15D", duration: 20, id: 217771 } ],
        }}
        parkingStandRequestStatus={{status: 'success', statusCode: 200}}
        updateParkingStand={() => {}}
        resetParkingStandStatus={() => {}}
      />);

      expect(getNodeText(document.querySelector("#DelayId217771"))).toStrictEqual('15D');
      expect(document.querySelectorAll(".turnaroundDetailHeaderDelayCodeTextWrapper-large")).toHaveLength(1);
    });

    it('should not display delay code when turnaround status is not COMPLETED and turnaround has delay code', () => {
      render(<TurnaroundDetailHeader
        componentSize="large"
        turnaroundData={{
          ...turnaround,
          status: { category: INCOMING },
          delays: [ { code: "15D", duration: 20, id: 217771 } ],
        }}
        parkingStandRequestStatus={{status: 'success', statusCode: 200}}
        updateParkingStand={() => {}}
        resetParkingStandStatus={() => {}}
      />);

      expect(document.querySelectorAll(".turnaroundDetailHeaderDelayCodeTextWrapper-large")).toHaveLength(0);
    });

    it('should display n delays codes when turnaround status is COMPLETED and turnaround has n delay code', () => {
      render(<TurnaroundDetailHeader
        componentSize="large"
        turnaroundData={{
          ...turnaround,
          status: { category: COMPLETED },
          delays: [ { code: "15D", duration: 20, id: 217771 }, { code: "15B", duration: 40, id: 217772 } ],
        }}
        parkingStandRequestStatus={{status: 'success', statusCode: 200}}
        updateParkingStand={() => {}}
        resetParkingStandStatus={() => {}}
      />);

      expect(getNodeText(document.querySelector("#DelayId217771"))).toStrictEqual('15D');
      expect(getNodeText(document.querySelector("#DelayId217772"))).toStrictEqual('15B');
      expect(document.querySelectorAll(".turnaroundDetailHeaderDelayCodeTextWrapper-large")).toHaveLength(2);
    });

    it('should display maximum delays codes when turnaround status is COMPLETED and turnaround has more than 3 delay codes', () => {
      render(<TurnaroundDetailHeader
        componentSize="large"
        turnaroundData={{
          ...turnaround,
          status: { category: COMPLETED },
          delays: [
            { code: "15A", duration: 20, id: 217771 },
            { code: "15B", duration: 30, id: 217772 },
            { code: "15C", duration: 40, id: 217773 },
            { code: "15D", duration: 50, id: 217774 },
          ],
        }}
        parkingStandRequestStatus={{status: 'success', statusCode: 200}}
        updateParkingStand={() => {}}
        resetParkingStandStatus={() => {}}
      />);

      expect(getNodeText(document.querySelector("#DelayId217771"))).toStrictEqual('15A');
      expect(getNodeText(document.querySelector("#DelayId217772"))).toStrictEqual('15B');
      expect(getNodeText(document.querySelector("#DelayId217773"))).toStrictEqual('15C');
      expect(document.querySelector("#DelayId217774")).toBeNull();
      expect(document.querySelectorAll(".turnaroundDetailHeaderDelayCodeTextWrapper-large")).toHaveLength(3);
    
    });
  });
});

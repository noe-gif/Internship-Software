/**
 * @jest-environment jsdom
*/

import { renderHook } from 'tests/renderTimezoneFilter'

import '@testing-library/jest-dom';

import turnaroundDetailTimingsHook from 'src/hooks/turnaroundDetail/turnaroundDetailTimingsHook';

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
    estimated_gate_arrival_datetime: "2021-09-19T05:36:00Z"
  },
  departure_flight: {
    arrival_airport: { iata_code: 'SFO' },
    departure_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-20T19:05:00Z",
    std: "2021-09-20T10:20:00Z",
    actual_gate_departure_datetime: "2021-09-20T10:51:00Z"
  }
};

const arrivalTurnaround = {
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
    estimated_gate_arrival_datetime: "2021-09-19T05:36:00Z"
  },
};

const departureTurnaround = {
  delays: [
    { code: "15D", duration: 20, id: 217771 },
    { code: "15B", duration: 11, id: 217770},
  ],
  departure_flight: {
    arrival_airport: { iata_code: 'SFO' },
    departure_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-20T19:05:00Z",
    std: "2021-09-20T10:20:00Z",
    actual_gate_departure_datetime: "2021-09-20T10:51:00Z"
  }
};

const updateFlightTiming = () => {};

describe('turnaroundDetailTimingsHook', () => {
  describe('isCompleteTurnaround function', () => {
    it('should return true when arrival and departure flight exist in the turnaround', () => {
      const { result } = renderHook(() => turnaroundDetailTimingsHook(turnaround, updateFlightTiming, () => {}));
  
      expect(result.current.isCompleteTurnaround()).toBeTruthy();
    });

    it('should return false when just arrival flight exist in the turnaround', () => {
      const { result } = renderHook(() => turnaroundDetailTimingsHook(arrivalTurnaround, updateFlightTiming, () => {}));
  
      expect(result.current.isCompleteTurnaround()).toBeFalsy();
    });

    it('should return false when just departure flight exist in the turnaround', () => {
      const { result } = renderHook(() => turnaroundDetailTimingsHook(departureTurnaround, updateFlightTiming, () => {}));
  
      expect(result.current.isCompleteTurnaround()).toBeFalsy();
    });
  });
});
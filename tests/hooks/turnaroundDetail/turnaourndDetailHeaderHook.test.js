/**
 * @jest-environment jsdom
*/

import '@testing-library/jest-dom';

import { renderHook } from 'tests/renderTimezoneFilter'

import turnaroundDetailHeaderHook from 'src/hooks/turnaroundDetail/turnaroundDetailHeaderHook';

const resetParkingStandStatus = () => {};
const updateParkingStand = () => {};

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
    estimated_gate_arrival_datetime: "2021-09-19T05:36:00Z",
    parking_stand_arrival: null,
  },
  departure_flight: {
    arrival_airport: { iata_code: 'SFO' },
    departure_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-20T19:05:00Z",
    std: "2021-09-20T10:20:00Z",
    actual_gate_departure_datetime: "2021-09-20T10:51:00Z",
    parking_stand_departure: 'TT45',
  },
  status: {
    category: 'completed',
  },
};

const turnaroundCategoryFailed = {
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
    estimated_gate_arrival_datetime: "2021-09-19T05:36:00Z",
    parking_stand_arrival: null,
  },
  departure_flight: {
    arrival_airport: { iata_code: 'SFO' },
    departure_airport: { iata_code: 'ORY' },
    aircraft: { icao_code: "A35K", tail_number: "FHTOO" },
    sta: "2021-09-20T19:05:00Z",
    std: "2021-09-20T10:20:00Z",
    actual_gate_departure_datetime: "2021-09-20T10:51:00Z",
    parking_stand_departure: 'TT45',
  },
  status: {
    category: 'failed',
  },
};


describe('turnaroundDetailHeaderHook', () => {
  describe('isTurnaroundStatusCompleted function', () => {
    it ('should return true if category status is equal to completed', () => {
      const { result } = renderHook(() => turnaroundDetailHeaderHook(
        turnaround,
        resetParkingStandStatus,
        updateParkingStand,
      ));

      expect(result.current.isTurnaroundStatusCompleted()).toBeTruthy()
    });

    it ('should return false if category status is equal to fail', () => {
      const { result } = renderHook(() => turnaroundDetailHeaderHook(
        turnaroundCategoryFailed,
        resetParkingStandStatus,
        updateParkingStand,
      ));

      expect(result.current.isTurnaroundStatusCompleted()).toBeFalsy();
    });
  });
});

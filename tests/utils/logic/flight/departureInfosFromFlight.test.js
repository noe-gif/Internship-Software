import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';

import departureInfosFromFlight from 'src/utils/logic/flight/departureInfosFromFlight';

import { CANCELED, COMPLETED, IN_PROGRESS, INCOMING } from 'src/types/FlightStatus';

import { TIMING_DEPARTURE_PRIMARY_COLOR, TIMING_DEPARTURE_SECONDARY_COLOR } from 'src/constants/colors';

const departureFlight = {
  sta: "2021-12-20T14:03:00Z",
  std: "2021-12-20T10:00:00Z",
};

const allDoorsClosedTargetDateTime = "2021-12-20T09:55:00Z";

describe('departureInfosFromFlight', () => {
  describe('departureInfosFromFlight function', () => {
    test('when turnaroundData is null', () => {
      let result = departureInfosFromFlight(null, null, INCOMING);

      expect(result).toStrictEqual({
        departureTimeText: '',
        departureTimeContent: '',
        departureTimeTextColor: '',
        departureTimeContentColor: '',
      });
    });

    test('when turnaroundData does not contain departure_flight', () => {
      let result = departureInfosFromFlight(allDoorsClosedTargetDateTime, null, INCOMING);

      expect(result).toStrictEqual({
        departureTimeText: '',
        departureTimeContent: '',
        departureTimeTextColor: '',
        departureTimeContentColor: '',
      });
    });

    test('when departureStatus is null', () => {
      let result = departureInfosFromFlight(allDoorsClosedTargetDateTime, departureFlight, null);

      expect(result).toStrictEqual({
        departureTimeText: '',
        departureTimeContent: '',
        departureTimeTextColor: TIMING_DEPARTURE_PRIMARY_COLOR,
        departureTimeContentColor: TIMING_DEPARTURE_PRIMARY_COLOR,
      });
    });

    describe('Testing when departureStatus is CANCELED', () => {
      test('when departureStatus is CANCELED', () => {
        let result = departureInfosFromFlight(allDoorsClosedTargetDateTime, departureFlight, CANCELED);

        expect(result).toStrictEqual({
          departureTimeText: '',
          departureTimeContent: '',
          departureTimeTextColor: '',
          departureTimeContentColor: '',
        });
      });
    });

    describe('Testing when departureStatus is IN_PROGRESS', () => {
      test('when departureStatus is IN_PROGRESS', () => {
        let result = departureInfosFromFlight(allDoorsClosedTargetDateTime, departureFlight, IN_PROGRESS);

        expect(result).toStrictEqual({
          departureTimeText: TIMING_ACRONYMS.departure_text.all_doors_closed_target,
          departureTimeContent: "2021-12-20T09:55:00Z",
          departureTimeTextColor: TIMING_DEPARTURE_SECONDARY_COLOR,
          departureTimeContentColor: TIMING_DEPARTURE_SECONDARY_COLOR,
        });
      });
    });

    describe('Testing when departureStatus is INCOMING', () => {
      test('when estimated_gate_departure_datetime is null', () => {
        let result = departureInfosFromFlight(allDoorsClosedTargetDateTime, departureFlight, INCOMING);

        expect(result).toStrictEqual({
          departureTimeText: '',
          departureTimeContent: '',
          departureTimeTextColor: TIMING_DEPARTURE_PRIMARY_COLOR,
          departureTimeContentColor: TIMING_DEPARTURE_PRIMARY_COLOR,
        });
      });

      test('when estimated_gate_departure_datetime is provide', () => {
        let result = departureInfosFromFlight(
          allDoorsClosedTargetDateTime,
          { ...departureFlight, estimated_gate_departure_datetime: "2021-12-20T10:03:00Z" },
          INCOMING,
        );

        expect(result).toStrictEqual({
          departureTimeText: TIMING_ACRONYMS.departure_text.estimated_departure,
          departureTimeContent: "2021-12-20T10:03:00Z",
          departureTimeTextColor: TIMING_DEPARTURE_PRIMARY_COLOR,
          departureTimeContentColor: TIMING_DEPARTURE_PRIMARY_COLOR,
        });
      });
    });

    describe('Testing when departureStatus is COMPLETED', () => {
      test('when departureStatus is COMPLETED', () => {
        let result = departureInfosFromFlight(
          allDoorsClosedTargetDateTime,
          { ...departureFlight, actual_gate_departure_datetime: "2021-12-20T10:01:00Z" },
          COMPLETED,
        );

        expect(result).toStrictEqual({
          departureTimeText: TIMING_ACRONYMS.departure_text.actual_time_departure,
          departureTimeContent: "2021-12-20T10:01:00Z",
          departureTimeTextColor: TIMING_DEPARTURE_PRIMARY_COLOR,
          departureTimeContentColor: TIMING_DEPARTURE_PRIMARY_COLOR,
        });
      });
    });
  });
});

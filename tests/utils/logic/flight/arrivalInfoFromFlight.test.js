import arrivalInfoFromFlight from 'src/utils/logic/flight/arrivalInfoFromFlight';

import { TIMING_ARRIVAL_PRIMARY_COLOR } from 'src/constants/colors';
import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';

import { CANCELED, COMPLETED, IN_PROGRESS, INCOMING } from 'src/types/FlightStatus';

const arrivalFlight = {
  sta: "2021-12-20T14:03:00Z",
  std: "2021-12-20T10:00:00Z",
};

describe('arrivalInfoFromFlight', () => {
  describe('arrivalInfoFromFlight function', () => {
    it('should return empty infos when arrival_flight is null', () => {
      let result = arrivalInfoFromFlight(null, INCOMING);

      expect(result).toStrictEqual({
        arrivalTimeText: '',
        arrivalTimeContent: '',
        arrivalTimeTextColor: '',
        arrivalTimeContentColor: '',
      });
    });

    it('should return empty infos when turnaroundStatus is null', () => {
      let result = arrivalInfoFromFlight(arrivalFlight, null);

      expect(result).toStrictEqual({
        arrivalTimeText: '',
        arrivalTimeContent: '',
        arrivalTimeTextColor: TIMING_ARRIVAL_PRIMARY_COLOR,
        arrivalTimeContentColor: TIMING_ARRIVAL_PRIMARY_COLOR,
      });
    });

    describe('Testing when turnaroundStatus is CANCELED', () => {
      it('should return empty infos when turnaroundStatus is CANCELED', () => {
        let result = arrivalInfoFromFlight(arrivalFlight, CANCELED);

        expect(result).toStrictEqual({
          arrivalTimeText: '',
          arrivalTimeContent: '',
          arrivalTimeTextColor: '',
          arrivalTimeContentColor: '',
        });
      });
    });

    describe('Testing when turnaroundStatus is IN_PROGRESS', () => {
      it('should return ETA infos when estimated_gate_arrival_datetime is provide', () => {
        let result = arrivalInfoFromFlight(
          { ...arrivalFlight, actual_gate_arrival_datetime: "2021-12-20T14:00:00Z" },
          IN_PROGRESS,
        );

        expect(result).toStrictEqual({
          arrivalTimeText: TIMING_ACRONYMS.arrival_text.actual_time_arrival,
          arrivalTimeContent: "2021-12-20T14:00:00Z",
          arrivalTimeTextColor: TIMING_ARRIVAL_PRIMARY_COLOR,
          arrivalTimeContentColor: TIMING_ARRIVAL_PRIMARY_COLOR,
        });
      });
    });

    describe('Testing when turnaroundStatus is INCOMING', () => {
      it('should return empty infos when estimated_gate_arrival_datetime is null', () => {
        let result = arrivalInfoFromFlight(arrivalFlight, INCOMING);

        expect(result).toStrictEqual({
          arrivalTimeText: '',
          arrivalTimeContent: '',
          arrivalTimeTextColor: TIMING_ARRIVAL_PRIMARY_COLOR,
          arrivalTimeContentColor: TIMING_ARRIVAL_PRIMARY_COLOR,
        });
      });

      it('should return ETA infos when estimated_gate_arrival_datetime is provide', () => {
        let result = arrivalInfoFromFlight(
          { ...arrivalFlight, estimated_gate_arrival_datetime: "2021-12-20T14:00:00Z" },
          INCOMING,
        );

        expect(result).toStrictEqual({
          arrivalTimeText: TIMING_ACRONYMS.arrival_text.estimated_time_arrival,
          arrivalTimeContent: "2021-12-20T14:00:00Z",
          arrivalTimeTextColor: TIMING_ARRIVAL_PRIMARY_COLOR,
          arrivalTimeContentColor: TIMING_ARRIVAL_PRIMARY_COLOR,
        });
      });
    });

    describe('Testing when turnaroundStatus is COMPLETED', () => {
      it('should return ATA infos when turnaroundStatus is COMPLETED', () => {
        let result = arrivalInfoFromFlight(
          { ...arrivalFlight, actual_gate_arrival_datetime: "2021-12-20T14:06:00Z" },
          COMPLETED,
        );

        expect(result).toStrictEqual({
          arrivalTimeText: TIMING_ACRONYMS.arrival_text.actual_time_arrival,
          arrivalTimeContent: "2021-12-20T14:06:00Z",
          arrivalTimeTextColor: TIMING_ARRIVAL_PRIMARY_COLOR,
          arrivalTimeContentColor: TIMING_ARRIVAL_PRIMARY_COLOR,
        });
      });
    });
  });
});

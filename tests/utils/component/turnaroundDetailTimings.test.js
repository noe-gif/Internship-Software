import {
  isComponentSizeLarge,
  isArrivalFlight,
  isDepartureFlight,
  getFlightTimingDate,
} from 'src/utils/component/turnaroundDetailTimings';

describe('turnaroundDetailTimings utils', () => {
  describe('isComponentSizeLarge function', () => {
    it('should return true when providing component size to large', () => {
      const result = isComponentSizeLarge('large');

      expect(result).toBeTruthy();
    });

    it('should return false when providing component size to small', () => {
      const result = isComponentSizeLarge('small');

      expect(result).toBeFalsy();
    });

    it('should return false when providing component size to large.splitView', () => {
      const result = isComponentSizeLarge('large.splitView');

      expect(result).toBeFalsy();
    });
  });

  describe('isArrivalFlight function', () => {
    it('should return true when providing a turnaround with a arrival flight', () => {
      const result = isArrivalFlight({ arrival_flight: { id: 1334 }});

      expect(result).toBeTruthy();
    });

    it('should return false when providing a turnaround with no arrival flight', () => {
      const result = isArrivalFlight({ arrival_flight: null});

      expect(result).toBeFalsy();
    });
  });

  describe('isDepartureFlight function', () => {
    it('should return true when providing a turnaround with a departure flight', () => {
      const result = isDepartureFlight({ departure_flight: { id: 1334 }});

      expect(result).toBeTruthy();
    });

    it('should return false when providing a turnaround with no departure flight', () => {
      const result = isDepartureFlight({ departure_flight: null});

      expect(result).toBeFalsy();
    });
  });

  describe('getFlightTimingDate function', () => {
    it('should return 2021-01-01 when providing a real date in first parameter', () => {
      const result = getFlightTimingDate('2021-01-01T09:21:00Z');

      expect(result).toStrictEqual('2021-01-01');
    });

    it('should return 2021-05-01 when providing a real date in first parameter', () => {
      const result = getFlightTimingDate(null, '2021-05-01T09:21:00Z');

      expect(result).toBeNull();
    });
  });
});
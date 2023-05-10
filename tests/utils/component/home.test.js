import { isNoAirportSelected, hasTurnaroundData } from 'src/utils/component/home';

describe('home utils', () => {
  describe('isNoAirportSelected function', () => {
    it('should return true when providing airportPicked to empty value', () => {
      const result = isNoAirportSelected('');

      expect(result).toBeTruthy();
    });

    it('should return false when providing airportPicked to ORY', () => {
      const result = isNoAirportSelected('ORY');

      expect(result).toBeFalsy();
    });
  });

  describe('hasTurnaroundData function', () => {
    it('should return true when providing turnaround with flight', () => {
      const result = hasTurnaroundData([{ id: 1234 }]);

      expect(result).toBeTruthy();
    });

    it('should return false when providing turnaround with no data', () => {
      const result = hasTurnaroundData([]);

      expect(result).toBeFalsy();
    });

    it('should return false when providing turnaround null', () => {
      const result = hasTurnaroundData(null);

      expect(result).toBeFalsy();
    });
  });
});
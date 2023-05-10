import { hasAirportSelectedCorrectCriteriaToLaunchRequest } from 'src/utils/component/turnaround/turnaroundAirportPicker';

describe('turnaroundAirportPicked', () => {
  describe('hasAirportSelectedCorrectCriteriaToLaunchRequest function', () => {
    it('should return true when providing an airport that fit the criteria', () => {
      const isAirportValid = hasAirportSelectedCorrectCriteriaToLaunchRequest('ORY');

      expect(isAirportValid).toBeTruthy();
    });

    it('should return false when providing an airport that is empty', () => {
      const isAirportValid = hasAirportSelectedCorrectCriteriaToLaunchRequest('');

      expect(isAirportValid).toBeFalsy();
    });

    it('should return false when providing an airport where it length is not correct', () => {
      const isAirportValid = hasAirportSelectedCorrectCriteriaToLaunchRequest('TT');

      expect(isAirportValid).toBeFalsy();
    });
  });
});
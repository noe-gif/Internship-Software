import { isParkingStandValidToBeDisplayed } from 'src/utils/component/turnaround/turnarounds';
import { CANCELED, COMPLETED, IN_PROGRESS, INCOMING } from 'src/types/FlightStatus';

describe('turnarounds utils', () => {
  describe('isParkingStandValidToBeDisplayed function', () => {
    it('should return true when providing a filled parking stand and a status equal to INCOMING', () => {
      const isParkingStandValid = isParkingStandValidToBeDisplayed('B01', INCOMING);

      expect(isParkingStandValid).toBeTruthy();
    });

    it('should return true when providing a filled parking stand and a status equal to IN_PROGRESS', () => {
      const isParkingStandValid = isParkingStandValidToBeDisplayed('B01', IN_PROGRESS);

      expect(isParkingStandValid).toBeTruthy();
    });

    it('should return false when providing a filled parking stand and a status equal to COMPLETED', () => {
      const isParkingStandValid = isParkingStandValidToBeDisplayed('B01', COMPLETED);

      expect(isParkingStandValid).toBeFalsy();
    });
    
    it('should return false when providing a filled parking stand and a status equal to CANCELED', () => {
      const isParkingStandValid = isParkingStandValidToBeDisplayed('B01', CANCELED);

      expect(isParkingStandValid).toBeFalsy();
    });

    it('should return false when providing a nil parking stand and a status equal to IN_PROGRESS', () => {
      const isParkingStandValid = isParkingStandValidToBeDisplayed(null, IN_PROGRESS);

      expect(isParkingStandValid).toBeFalsy();
    });
  })
});
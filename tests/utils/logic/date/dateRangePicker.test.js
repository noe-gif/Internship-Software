import {
  isNewDateRangeSet,
  hasDateRangeChanged,
} from 'src/utils/logic/date/dateRangePicker';
  
describe('Testing dateRangePicker utils', () => {
  describe('isNewDateRangeSet function', () => {
    it('should return true if newDateRange and its content exists', function() {
      const newDateRange = ['10/10/2001', '11/10/2001'];

      expect(isNewDateRangeSet(newDateRange)).toBeTruthy();
    });
    it('should return false if newDateRange doesnt exists', function() {
      const newDateRange = null;

      expect(isNewDateRangeSet(newDateRange)).toBeFalsy();
    });
    it('should return false if newDateRange content doesnt exists', function() {
      const newDateRange = [null, '10/10/2001'];

      expect(isNewDateRangeSet(newDateRange)).toBeFalsy();
    });
  });

  describe('hasDateRangeChanged function', () => {
    it('should return true if both dates arguments are different', function() {
      const dateRange = [null, '10/10/2001'];
      const datePicked = [null, '09/10/2001'];

      expect(hasDateRangeChanged(dateRange, datePicked)).toBeTruthy();
    });
    it('should return false if both dates arguments are the same', function() {
      const dateRange = [null, '10/10/2001'];
      const datePicked = [null, '10/10/2001'];

      expect(hasDateRangeChanged(dateRange, datePicked)).toBeFalsy();
    });
    it('should return false if both dates arguments doesnt exist', function() {
      expect(hasDateRangeChanged(null, null)).toBeFalsy();
    });
  });
});

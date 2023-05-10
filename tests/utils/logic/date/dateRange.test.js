import { calculateNumberOfDaysBetweenTwoDates, dateRange } from "src/utils/logic/date/dateRange";

describe('Testing dateRange utils', () => {
  describe('dateRange function', () => {
    it('should return the dates range between the interval when providing an interval date', function() {
      const localStartDate = new Date('2021-06-16T00:00:00');
      const localEndDate = new Date('2021-06-18T23:59:59');
      let result = dateRange(localStartDate, localEndDate);

      const UTCDatesBetweenLocalStartAndLocalEnd = [
        new Date('2021-06-16T03:00:00Z'), 
        new Date("2021-06-17T03:00:00.000Z"), 
        new Date("2021-06-18T03:00:00.000Z"), 
        new Date("2021-06-19T03:00:00.000Z")
      ];

      expect(result).toStrictEqual(UTCDatesBetweenLocalStartAndLocalEnd);
    });
  
    it('should return the actual date provided and the next when providing the same date twice', function() {
      const localStartDate = new Date('2021-06-18T00:00:00');
      const localEndDate = new Date('2021-06-18T23:59:59');
      let result = dateRange(localStartDate, localEndDate);

      const UTCDatesBetweenLocalStartAndLocalEnd = [ new Date('2021-06-18T03:00:00Z'), new Date('2021-06-19T03:00:00Z')];

      expect(result).toStrictEqual(UTCDatesBetweenLocalStartAndLocalEnd);
    });
  
    it('should return the same date as provided', function() {
      const localStartDate = new Date('2021-06-18T00:00:00');
      let result = dateRange(localStartDate);

      const UTCDatesBetweenLocalStartAndLocalEnd = [new Date('2021-06-18T03:00:00Z')];

      expect(result).toStrictEqual(UTCDatesBetweenLocalStartAndLocalEnd);
    });
  
    it('should return null when providing null as parameter', function() {
      let result = dateRange(null);
  
      expect(result).toStrictEqual([null]);
    });
  });
 
  describe('calculateNumberOfDaysBetweenTwoDates function', () => {
    it('should return the number of days between 2 dates provided', () => {
      const numberOfDays = calculateNumberOfDaysBetweenTwoDates(new Date('Sat Dec 17 2021 22:00:00 GMT-6'), new Date('Sat Dec 01 2021 22:00:00 GMT-6'))

      expect(numberOfDays).toStrictEqual(16);
    })
  });
});

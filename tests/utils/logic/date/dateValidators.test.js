import {
  hasDatetimeFilledWithYYYYMMDDSyntax,
  hasDateRightFormat,
  isDateHigherThanActualDate,
  isDateLowerThanMinDateSelectable,
  isDateValidToUpdate,
} from 'src/utils/logic/date/dateValidators';

describe('isDateValidToUpdate utils', () => {
  describe('hasDateRightFormat function', () => {
    it('should return true when providing a date without this format: yyyy-mm-dd', () => {
      const dateFormat = hasDateRightFormat(new Date('20222-01-01T12:12:00.000Z'));

      expect(dateFormat).toBeTruthy();
    });

    it('should return false when providing a date with this format: yyyy-mm-dd', () => {
      const dateFormat = hasDateRightFormat(new Date('2022-01-01T12:12:00.000Z'));

      expect(dateFormat).toBeFalsy();
    });
  });

  describe('isDateHigherThanActualDate function', () => {
    it('should return true when providing a date which is higher than the actual date', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 1, 2, 20, 37)));
      
      const date = isDateHigherThanActualDate(new Date('2022-02-11T12:12:00.000Z'));

      expect(date).toBeTruthy();
      
      jest.useRealTimers();
    });

    it('should return false when providing a date which is lower than the actual date', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 1, 2, 20, 37)));
      
      const date = isDateHigherThanActualDate(new Date('2022-01-11T12:12:00.000Z'));

      expect(date).toBeFalsy();
      
      jest.useRealTimers();
    });
  });

  describe('isDateLowerThanMinDateSelectable function', () => {
    it('should return true when providing a date which is lower than the limit in the function: 2018-01-01', () => {
      const date = isDateLowerThanMinDateSelectable(new Date('2017-12-31T12:12:00.000Z'));

      expect(date).toBeTruthy();
    });

    it('should return false when providing a date which is higher than the limit in the function: 2018-01-01', () => {
      const date = isDateLowerThanMinDateSelectable(new Date('2020-12-31T12:12:00.000Z'));

      expect(date).toBeFalsy();
    });
  });

  describe('isDateValidToUpdate function', () => {
    it('should return true when the date is valid', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 1, 2, 20, 37)));
      
      const date = isDateValidToUpdate(new Date('2022-01-11T12:12:00.000Z'));

      expect(date).toBeTruthy();
      
      jest.useRealTimers();
    });

    it('should return false when the date has not the right format', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 1, 2, 20, 37)));
      
      const date = isDateValidToUpdate(new Date('20222-01-11T12:12:00.000Z'));

      expect(date).toBeFalsy();
      
      jest.useRealTimers();
    });

    it('should return false when the date is higher than the actual date', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 1, 2, 20, 37)));
      
      const date = isDateValidToUpdate(new Date('2022-04-11T12:12:00.000Z'));

      expect(date).toBeFalsy();
      
      jest.useRealTimers();
    });

    it('should return false when the date is higher than the actual date', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 1, 2, 20, 37)));
      
      const date = isDateValidToUpdate(new Date('2017-04-11T12:12:00.000Z'));

      expect(date).toBeFalsy();
      
      jest.useRealTimers();
    });
  });

  describe('hasDatetimeFilledWithYYYYMMDDSyntax function', () => {
    it('should return true when providing the date equal to yyyy-mm-dd', () => {
      const date = hasDatetimeFilledWithYYYYMMDDSyntax('yyyy-mm-dd');

      expect(date).toBeTruthy();
    });

    it('should return false when providing the date equal to 2018-12-12', () => {
      const date = hasDatetimeFilledWithYYYYMMDDSyntax('2018-12-12');

      expect(date).toBeFalsy();
    });
  });
});
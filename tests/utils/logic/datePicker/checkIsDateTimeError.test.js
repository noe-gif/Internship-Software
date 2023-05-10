import {
  convertFormattedDateToUTCDate,
  isDatetimeError,
  isDateHigherThanActualDate,
  isFormattedDateLowerThanMinDateSelectable,
  isFormattedDateTimingEmpty,
} from 'src/utils/logic/datePicker/checkIsDateTimeError';

describe('checkDateTimeError', () => {
  describe('isDateTimeError function', () => {
    it('test return false when formattedDate.timing is null', () => {
      let result = isDatetimeError({date: '2021-11-29', timing: null}, 'ata', () => {}, ['ata', 'atd']);

      expect(result).toEqual(false);
    });

    it('test return true when formattedDate.timing is --:--', () => {
      let result = isDatetimeError({date: '2021-11-29', timing: '--:--'}, 'ata', () => {}, ['ata', 'atd']);

      expect(result).toEqual(true);
    });

    it('test return true when formattedDate.timing is -:-', () => {
      let result = isDatetimeError({date: '2021-11-29', timing: '-:-'}, 'ata', () => {}, ['ata', 'atd']);

      expect(result).toEqual(true);
    });

    it('test return true when formattedDate.date is yyyy-mm-dd', () => {
      let result = isDatetimeError({date: 'yyyy-mm-dd', timing: '12:12'}, 'ata', () => {}, ['ata', 'atd']);

      expect(result).toEqual(true);
    });

    it('test return true when formattedDate is higher than the actual date', () => {
      let result = isDatetimeError({date: '2023-11-30', timing: '19:19'}, 'ata', () => {}, ['ata', 'atd']);

      expect(result).toEqual(true);
    });

    it('test return false when formattedDate is correct', () => {
      let result = isDatetimeError({date: '2021-29-11', timing: '12:12'}, 'rta', () => {}, ['ata', 'atd']);

      expect(result).toEqual(false);
    });
  }); 

  describe('isFormattedDateTimingEmpty function', () => {
    it('test return true when formattedDate.timing is equal to --:--', () => {
      let result = isFormattedDateTimingEmpty({timing: '--:--'});

      expect(result).toStrictEqual(true);
    });

    it('test return true when formattedDate.timing is equal to -:-', () => {
      let result = isFormattedDateTimingEmpty({timing: '-:-'});

      expect(result).toStrictEqual(true);
    });

    it('test return false when formattedDate.timing is equal to null', () => {
      let result = isFormattedDateTimingEmpty({timing: null});

      expect(result).toStrictEqual(false);
    });

    it('test return false when formattedDate.timing is equal to 12:12', () => {
      let result = isFormattedDateTimingEmpty({timing: '12:12'});

      expect(result).toStrictEqual(false);
    });
  });

  describe('isDateHigherThanActualDate function', () => {
    it('should return true when providing a date higher than actual date', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 1, 2, 20, 37)));

      const date = isDateHigherThanActualDate(['ado', 'adc'], 'ado', {date: '2022-11-29', timing: '12:12'});

      expect(date).toBeTruthy();

      jest.useRealTimers();
    });

    it('should return false when providing a date lower than actual date', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 1, 2, 20, 37)));

      const date = isDateHigherThanActualDate(['ado', 'adc'], 'ado', {date: '2022-01-29', timing: '12:12'});

      expect(date).toBeFalsy();

      jest.useRealTimers();
    });

    it('should return false when providing an id which is not in the timingBlock ', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 1, 2, 20, 37)));

      const date = isDateHigherThanActualDate(['ado', 'adc'], 'rta', {date: '2022-01-29', timing: '12:12'});

      expect(date).toBeFalsy();

      jest.useRealTimers();
    });
  });

  describe('isFormattedDateLowerThanMinDateSelectable function', () => {
    it('should return false when providing a date higher than the min limit: 01JAN18 ', () => {
      const date = isFormattedDateLowerThanMinDateSelectable({date: '2022-01-29', timing: '12:12'});

      expect(date).toBeFalsy();
    });

    it('should return true when providing a date lower than the min limit: 01JAN18 ', () => {
      const date = isFormattedDateLowerThanMinDateSelectable({date: '2017-01-29', timing: '12:12'});

      expect(date).toBeTruthy();
    });
  });

  describe('convertFormattedDateToUTCDate function', () => {
    it('should return the completed date in UTC', () => {
      const utcDate = convertFormattedDateToUTCDate({ date: '2018-12-12', timing: '12:34' });

      expect(utcDate).toStrictEqual(new Date('2018-12-12T15:34:00.000Z'));
    });
  });
});

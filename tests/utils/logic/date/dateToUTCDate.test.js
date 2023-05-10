import { dateToUTCDate } from 'src/utils/logic/date/dateToUTCDate';

describe('dateToUTCDate utils', () => {
  describe('dateToUTCDate function', () => {
    it('should return an UTC date when providing a local date with GMT+3', () => {
      const utcDate = dateToUTCDate(new Date('Sat Dec 18 2021 13:00:00 GMT+3'));

      expect(utcDate).toStrictEqual(new Date('2021-12-18T10:00:00.000Z'));
    });

    it('should return an UTC date when providing a local date with GMT-6', () => {
      const utcDate = dateToUTCDate(new Date('Sat Dec 17 2021 22:00:00 GMT-6'));

      expect(utcDate).toStrictEqual(new Date('2021-12-18T04:00:00.000Z'));
    });

    it('should return null date when providing date equal to null', () => {
      const utcDate = dateToUTCDate(null);

      expect(utcDate).toStrictEqual(null);
    });
  });
})
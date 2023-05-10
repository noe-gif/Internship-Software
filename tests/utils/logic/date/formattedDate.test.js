import {
  dateToFormatWithWords,
  formatDatePickerDateTime,
  formatDateToDDMMYYYY,
  formatDateToHHmm,
  formatDateToStringDDMMMYY,
  formatDateToYYYYMMDD,
} from 'src/utils/logic/date/formattedDate';

describe('Testing formattedDate.js file functions', function () {
  it('testing formatDateToDDMMYYYY with correct date provide', function () {
    let formattedDate = formatDateToDDMMYYYY(new Date(2021, 5, 16, 0, 0, 0)); //Using 5 as month because of months indexes

    expect(formattedDate).toStrictEqual('16/06/2021');
  });

  it('testing formatDateToDDMMYYYY with null provide', function () {
    let formattedDate = formatDateToDDMMYYYY(null);

    expect(formattedDate).toStrictEqual(null);
  });

  it('testing formatDateToYYYYMMDD with correct date provide', function () {
    let formattedDate = formatDateToYYYYMMDD(new Date(2021, 5, 16, 0, 0, 0));

    expect(formattedDate).toStrictEqual('2021-06-16');
  });

  it('testing formatDateToYYYMMDD with null provide', function () {
    let formattedDate = formatDateToYYYYMMDD(null);

    expect(formattedDate).toStrictEqual(null);
  });

  it('testing dateToFormatWithWords with correct date provide', function () {
    let formattedDate = dateToFormatWithWords(new Date(2021, 5, 16, 0, 0, 0));

    expect(formattedDate).toStrictEqual('16 JUNE 2021 - WEDNESDAY');
  });

  it('testing dateToFormatWithWords with null provide', function () {
    let formattedDate = dateToFormatWithWords(null);

    expect(formattedDate).toStrictEqual(null);
  });

  describe('formatDatePickerDateTIme function', () => {
    it('tests return null when formatted.timing is null', () => {
      let formattedDateTime = formatDatePickerDateTime({
        date: '2021-11-26',
        timing: null,
      });

      expect(formattedDateTime).toStrictEqual(null);
    });

    it('tests return correct date when providing all data', () => {
      let formattedDate = formatDatePickerDateTime({
        date: '2021-11-26',
        timing: '12:12',
      });

      expect(formattedDate).toEqual(new Date('2021-11-26T15:12:00.000Z'));
    });
  });

  describe('formatDateToStringDDMMMYY function', () => {
    it('should return 09DEC21 when providing the correct date', () => {
      const formattedDate = formatDateToStringDDMMMYY(
        new Date(2021, 11, 9, 0, 0, 0)
      );

      expect(formattedDate).toStrictEqual("09DEC21");
    });

    it("should return null when providing an empty date", () => {
      const formattedDate = formatDateToStringDDMMMYY(null);

      expect(formattedDate).toBeNull();
    });
  });

  describe('formatDateToHHmm function', () => {
    it('should return formatted datetime', () => {
      const formattedDateTime = formatDateToHHmm(
        new Date('2022-01-26T11:27:00Z')
      );

      expect(formattedDateTime).toStrictEqual('08:27');
    });
  });
});

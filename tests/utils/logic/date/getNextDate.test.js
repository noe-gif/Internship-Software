import getNextDate from "../../../../src/utils/logic/date/getNextDate";

describe('Testing getNextDate function', function() {
  it('provide correct date', function() {
    let result = getNextDate(new Date(2021, 6, 20));// 20/07/2021

    expect(result).toStrictEqual(new Date(2021, 6, 21));// 21/0è/2021
  });

  it('provide null', function() {
    let result = getNextDate(null);

    result.setMilliseconds(0);

    expect(result).toStrictEqual(new Date(new Date().setMilliseconds(0)));// Actual date
  });
});

import getExtendedRangeDates from "../../../../src/utils/logic/date/getExtendedRangeDates";

describe('Testing getExtendedRangeDates function', function () {
  it('provide array of 3 elements', function() {
    let result = getExtendedRangeDates([new Date(2021, 6, 19, 0, 0, 0), new Date(2021, 6, 20, 0, 0, 0), new Date(2021, 6, 21, 0, 0, 0)]);// [19/07/2021, 20/07/2021, 21/07/2021]

    expect(result).toStrictEqual([new Date(2021, 6, 18, 0, 0, 0), new Date(2021, 6, 22, 0, 0, 0)]);// [18/07/2021, 22/07/2021]
  });

  it('provide empty array', function() {
    let result = getExtendedRangeDates([]);

    result[0].setMilliseconds(0);

    expect(result).toStrictEqual([new Date(new Date().setMilliseconds(0))]);
  });

  it('provide null', function() {
    let result = getExtendedRangeDates(null);

    result[0].setMilliseconds(0);

    expect(result).toStrictEqual([new Date(new Date().setMilliseconds(0))]);
  });
});

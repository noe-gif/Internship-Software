import dateStringToUTCDate from 'src/utils/logic/date/dateStringToUTCDate';

describe('Testing dateStringToUTCDate', function() {
  it('provide with valid Date string', function() {
    let result = dateStringToUTCDate('2021-06-16T22:25:31Z');

    expect(result instanceof Date).toBeTruthy();
    expect(result.getUTCFullYear()).toStrictEqual(2021);
    expect(result.getUTCMonth()).toStrictEqual(5);
    expect(result.getUTCDate()).toStrictEqual(16);
    expect(result.getUTCHours()).toStrictEqual(22);
    expect(result.getUTCMinutes()).toStrictEqual(25);
    expect(result.getUTCSeconds()).toStrictEqual(31);
    expect(result.getUTCMilliseconds()).toStrictEqual(0);
  });

  it('provide null param', function() {
    let result = dateStringToUTCDate(null);
    const comparisonDate = new Date();

    expect(result instanceof Date).toBeTruthy();
    expect(result.getUTCFullYear()).toStrictEqual(comparisonDate.getUTCFullYear());
    expect(result.getUTCMonth()).toStrictEqual(comparisonDate.getUTCMonth());
    expect(result.getUTCDate()).toStrictEqual(comparisonDate.getUTCDate());
    expect(result.getUTCHours()).toStrictEqual(comparisonDate.getUTCHours());
    expect(result.getUTCMinutes()).toStrictEqual(comparisonDate.getUTCMinutes());
    expect(result.getUTCSeconds()).toStrictEqual(comparisonDate.getUTCSeconds());
  });
})

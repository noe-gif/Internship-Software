import provideTimeDifference from '../../../../src/utils/logic/date/provideTimeDifference';

describe('Testing provideTimeDifference', function() {
  it('test with correct dates provide', function() {
    let result = provideTimeDifference("2021-08-13T06:00:00Z", "2021-08-13T06:23:00Z", '-');

    expect(result).toStrictEqual('+23min');
  });

  it('test with null dates provide', function() {
    let result = provideTimeDifference(null, null, '-:-');

    expect(result).toStrictEqual('-:-');
  });

  it('test with null date provide and null emptyValue', function() {
    let result = provideTimeDifference(null, "2021-08-13T06:00:00Z", null);

    expect(result).toStrictEqual(null);
  });
});

import provideDateTiming from 'src/utils/logic/date/provideDateTiming';

describe('Testing provideDateTiming function', function () {
  it('test with correct date provide', function () {
    let result = provideDateTiming('2021-08-13T06:00:00Z', '-');

    expect(result).toStrictEqual('03:00');
  });

  it('test with null date provide', function () {
    let result = provideDateTiming(null, '--:--');

    expect(result).toStrictEqual("--:--");
  });
});

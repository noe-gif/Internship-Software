import secondsToHHMMFormat from '../../../../src/utils/logic/date/secondsToHHMMFormat';

describe('Testing secondsToHHMMFormat', function() {
  it('provide seconds', function() {
    let result = secondsToHHMMFormat(1020); // 1020s -> 17m

    expect(result).toStrictEqual('00:17');
  });

  it('provide seconds greater than 1h', function() {
    let result = secondsToHHMMFormat(4560); // 4560s -> 01h16m

    expect(result).toStrictEqual('01:16');
  });

  it('provide null', function() {
    let result = secondsToHHMMFormat(null);

    expect(result).toStrictEqual('-');
  });
});

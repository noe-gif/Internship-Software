import { areArraysEquals } from 'src/utils/logic/areArraysEquals';

describe('Testing areArraysEquals function', () => {
  it('should return true when arrays are equals', () => {
    const result = areArraysEquals(['first'], ['first']);

    expect(result).toBeTruthy();
  });

  it('should return false when arrays are not equals', () => {
    const result = areArraysEquals(['first'], ['second']);

    expect(result).toBeFalsy();
  });
});

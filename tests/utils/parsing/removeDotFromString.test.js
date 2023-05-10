import removeDotFromString from 'src/utils/parsing/removeDotFromString';

import { ERROR_PARAMETER_NULL_PROVIDE } from 'src/errors/utils/parametersErrors';

describe('Testing removeDotFromString function', () => {
  it('should return the string without dots', () => {
    const stringWithoutDot = removeDotFromString("a.complete.string.with.dot");

    expect(stringWithoutDot).toStrictEqual("acompletestringwithdot");
  });

  it('should return complete string when no dots are in the string', () => {
    const stringWithoutDot = removeDotFromString("abcde");

    expect(stringWithoutDot).toStrictEqual("abcde");
  });

  it('should return string without unique dot', () => {
    const stringWithoutDot = removeDotFromString("tarmac.dev");

    expect(stringWithoutDot).toStrictEqual("tarmacdev");
  });

  it('should raise an error when an null is provide', () => {
    expect(() => {
      removeDotFromString(null);
    }).toThrow('removeDotFromString : Null provide as parameter');
  });
});

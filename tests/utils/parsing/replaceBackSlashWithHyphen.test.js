import replaceBackSlashWithHyphen from 'src/utils/parsing/replaceBackSlashWithHyphen';

import { EMPTY_STRING } from 'src/constants/emptyValues';

describe('Testing replaceBackSlashWithHyphen function', () => {
  it('should return string with backslash replace by hyphen', () => {
    let result = replaceBackSlashWithHyphen('25/12/2021');

    expect(result).toStrictEqual('25-12-2021');
  });

  it('should return empty string when null is provide', () => {
    expect(() => replaceBackSlashWithHyphen(null)).toThrow();
  });

  it('should return empty string when undefined is provide', () => {
    expect(() => replaceBackSlashWithHyphen()).toThrow();
  });
});

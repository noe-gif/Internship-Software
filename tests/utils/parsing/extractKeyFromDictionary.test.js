import {
  checkIndexAndExtractFromArray,
  dictionaryArrayToKeyArray,
  extractKeyFromDictionary,
} from 'src/utils/parsing/extractKeyFromDictionary';

const arrayOfDictionary = [
  { id: 12345 },
  { id: 23456 },
  { id: 34567 }
];

const arrayOfKey = [ 12345, 23456, 34567 ];

describe('Testing extractKeyFromDictionary function', () => {
  it('test when key exist in dictionary', () => {
    let result = extractKeyFromDictionary('any_door_open', { any_door_open: "2021-09-25T00:00:00T" });

    expect(result).toStrictEqual("2021-09-25T00:00:00T");
  });

  it('test when key is not in dictionary', () => {
    let result = extractKeyFromDictionary('any_door_open', { all_door_closed: "2021-09-25T00:00:00T" });

    expect(result).toStrictEqual(undefined);
  });

  it('test when undefined provide', () => {
    let result = extractKeyFromDictionary();

    expect(result).toStrictEqual('');
  });

  it('test when null provide', () => {
    let result = extractKeyFromDictionary(null, null);

    expect(result).toStrictEqual('');
  });
});

describe('Testing checkIndexAndExtractFromArray function', () => {
  it('test with indexToExtract in array', () => {
    let result = checkIndexAndExtractFromArray(['A', 'B', 'C'], 2, 'Empty response');

    expect(result).toStrictEqual('C');
  });

  it('test with indexToExtract not in array', () => {
    let result = checkIndexAndExtractFromArray(['A', 'B', 'C'], 4, 'Empty response');

    expect(result).toStrictEqual('Empty response');
  });

  it('test with array undefined', () => {
    let result = checkIndexAndExtractFromArray(undefined, 2, 'Empty response');

    expect(result).toStrictEqual('Empty response');
  });

  it('test with indexToExtract undefined', () => {
    let result = checkIndexAndExtractFromArray(['A', 'B', 'C'], undefined, 'Empty response');

    expect(result).toStrictEqual('Empty response');
  });

  it('test with all parameters null', () => {
    let result = checkIndexAndExtractFromArray(null, null, null);

    expect(result).toStrictEqual(null);
  });
});

describe('Testing dictionaryArrayToKeyArray', () => {
  it('should return array of id when array of dictionary is provide and id as parameter', () => {
    let arrayWithKey = dictionaryArrayToKeyArray(arrayOfDictionary, 'id');

    expect(arrayWithKey).toStrictEqual(arrayOfKey);
  });

  it('should return empty array when array provide as parameter is empty', () => {
    let arrayEmpty = dictionaryArrayToKeyArray([], 'id');

    expect(arrayEmpty).toStrictEqual([]);
  });

  it('should return array of undefined when array provide does not contain keyToExtract', () => {
    let arrayEmpty = dictionaryArrayToKeyArray(arrayOfDictionary, 'notAKey');

    expect(arrayEmpty).toStrictEqual([undefined, undefined, undefined]);
  });

  it('should throw error when parameter provide are null', () => {
    expect(() => { dictionaryArrayToKeyArray(null, null); })
    .toThrow('dictionaryArrayToKeyArray : Null provide as parameter');
  });
});

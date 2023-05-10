import compareArrayByKeyAndRemoveDeletedElement from 'src/utils/parsing/compareArrayByKeyAndRemoveDeletedElement';

const arrayToUpdate = [
  {
    id: 1,
    flightNumber: 1234,
  },
  {
    id: 2,
    flightNumber: 3456,
  },
  {
    id: 3,
    flightNumber: 5678,
  }
];

const dataBasedArray = [
  {
    id: 1,
    name: 'Element1',
  },
  {
    id: 3,
    name: 'Element3',
  }
];

const keyToCheck = 'id';

const expectedUpdatedArray = [
  {
    id: 1,
    flightNumber: 1234,
  },
  {
    id: 3,
    flightNumber: 5678,
  }
]

describe('Testing compareArrayByKeyAndRemoveDeletedElement function', () => {
  it('should return the same amount of element based on specific key', () => {
    const updatedArray = compareArrayByKeyAndRemoveDeletedElement(arrayToUpdate, dataBasedArray, keyToCheck);

    expect(updatedArray).toStrictEqual(expectedUpdatedArray);
  });

  it('should return empty array when dataBasedArray is empty', () => {
    const updatedArray = compareArrayByKeyAndRemoveDeletedElement(arrayToUpdate, [], keyToCheck);

    expect(updatedArray).toStrictEqual([]);
  });

  it('should return empty array when arrayToUpdate is empty', () => {
    const updatedArray = compareArrayByKeyAndRemoveDeletedElement([], dataBasedArray, keyToCheck);

    expect(updatedArray).toStrictEqual([]);
  });

  it('should throw error when arrayToUpdate is null', () => {
    expect(() => compareArrayByKeyAndRemoveDeletedElement(null, dataBasedArray, keyToCheck))
    .toThrow('compareArrayByKeyAndRemoveDeletedElement : Null provide as parameter');
  });

  it('should throw error when dataBasedArray is null', () => {
    expect(() => compareArrayByKeyAndRemoveDeletedElement(arrayToUpdate, null, keyToCheck))
    .toThrow('compareArrayByKeyAndRemoveDeletedElement : Null provide as parameter');
  });
});

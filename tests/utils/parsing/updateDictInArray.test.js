import {
  turnaroundCompleteInfoDictContainId,
  turnaroundDetailDictContainsId,
  updateDictInArray,
} from 'src/utils/parsing/updateDictInArray';

const spyturnaroundDetailDictContainsId = jest.fn(turnaroundDetailDictContainsId);

describe('UpdateDictInArray', () => {
  describe('Testing updateDictInArray function', () => {
    test('with complete data', () => {
      const expected = [
        {
          id: 12345,
          name: 'Complete Testing',
        },
      ];

      const arrayToUpdate = [
        {
          id: 12345,
          name: 'Incomplete Testing',
        },
      ];

      const updatedDict = { id: 12345, name: 'Complete Testing' };

      const result = updateDictInArray(arrayToUpdate, turnaroundDetailDictContainsId, updatedDict, 'id');

      expect(result).toStrictEqual(expected);
    });

    test('when arrayToUpdate does not contain updatedDict', () => {
      const expected = [
        {
          id: 12345,
          name: 'Incomplete Testing',
        },
      ];

      const arrayToUpdate = [
        {
          id: 12345,
          name: 'Incomplete Testing',
        },
      ];

      const updatedDict = { id: 67890, name: 'Complete Testing' };

      const result = updateDictInArray(arrayToUpdate, turnaroundDetailDictContainsId, updatedDict, 'id');

      expect(result).toStrictEqual(expected);
    });

    it('should call turnaroundDetailDictContainsId', () => {
      const arrayToUpdate = [
        {
          id: 12345,
          name: 'Incomplete Testing',
        },
        {
          id: 67890,
          name: 'Testing function call',
        },
      ];

      const updatedDict = { id: 67890, name: 'Complete Testing' };

      updateDictInArray(arrayToUpdate, spyturnaroundDetailDictContainsId, updatedDict, 'id');

      expect(spyturnaroundDetailDictContainsId).toHaveBeenCalledTimes(2);

      spyturnaroundDetailDictContainsId.mockClear();
    });
  });

  describe('Testing turnaroundDetailDictContainsId function', () => {
    test('when turnaroundDetail contain id in param', () => {
      const result = turnaroundDetailDictContainsId({ id: 12345 }, 12345);

      expect(result).toBeTruthy();
    });

    test('when turnaroundDetail does not contain id in param', () => {
      const result = turnaroundDetailDictContainsId({ id: 12345 }, 67890);

      expect(result).toBeFalsy();
    });

    test('when turnaroundDetail is null', () => {
      const result = turnaroundDetailDictContainsId(null, 12345);

      expect(result).toBeFalsy();
    });

    test('when params are undefined', () => {
      const result = turnaroundDetailDictContainsId();

      expect(result).toBeFalsy();
    });
  });

  describe('Testing turnaroundCompleteInfoDictContainId', () => {
    test('when turnaroundCompleteInfo contain id in param', () => {
      const result = turnaroundCompleteInfoDictContainId({ turnaroundId: 12345 }, 12345);

      expect(result).toBeTruthy();
    });

    test('when turnaroundCompleteInfo does not contain id in param', () => {
      const result = turnaroundCompleteInfoDictContainId({ turnaroundId: 12345 }, 67890);

      expect(result).toBeFalsy();
    });

    test('when turnaroundCompleteInfo is null', () => {
      const result = turnaroundCompleteInfoDictContainId(null, 12345);

      expect(result).toBeFalsy();
    });

    test('when params are undefined', () => {
      const result = turnaroundCompleteInfoDictContainId();

      expect(result).toBeFalsy();
    });
  });
});

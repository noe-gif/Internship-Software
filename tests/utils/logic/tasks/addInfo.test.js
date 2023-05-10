import {
  isValueOnlyNumberAndPositive,
  isValueFilled,
  isValueFilledAndPositive,
  isTheRightAddInfoType,
  setUseStateTextValue,
  setUseStateDateValue,
  setUseStateCheckBoxValue,
  setUseStateNumberValue,
  getAutoValueIfExists,
} from 'src/utils/logic/tasks/addInfo';

describe('addInfo utils', () => {
  describe('isTheRightAddInfoType function', () => {
    it('Tests is return true when providing all correct data', () => {
      const addInfo = {
        value: 'toto',
        information_type: 'TEXT',
      };

      let result = isTheRightAddInfoType(addInfo, 'TEXT');

      expect(result).toEqual(true);
    });

    it('Tests is return false when value is null', () => {
      const addInfo = {
        value: null,
        information_type: 'TEXT',
      };

      let result = isTheRightAddInfoType(addInfo, 'TEXT');

      expect(result).toEqual(false);
    });

    it('Tests is return false when information_type is not TEXT', () => {
      const addInfo = {
        value: 'tto',
        information_type: 'CHECKBOX',
      };

      let result = isTheRightAddInfoType(addInfo, 'TEXT');

      expect(result).toEqual(false);
    });
  });

  describe('setUseStateTextValue function', () => {
    it('Tests is return toto when providing all correct data', () => {
      const addInfo = {
        value: 'toto',
        information_type: 'TEXT',
      };

      let result = setUseStateTextValue(addInfo);

      expect(result).toEqual('toto');
    });

    it("Tests is return '' when providing value is null", () => {
      const addInfo = {
        value: null,
        information_type: 'TEXT',
      };

      let result = setUseStateTextValue(addInfo);

      expect(result).toEqual('');
    });

    it("Tests is return '' when information_type is not TEXT", () => {
      const addInfo = {
        value: null,
        information_type: 'CHECKBOX',
      };

      let result = setUseStateTextValue(addInfo);

      expect(result).toEqual('');
    });
  });

  describe('setUseStateDateValue function', () => {
    it('Tests is return true when providing all correct data', () => {
      const addInfo = {
        value: '2021-11-22T10:25:00Z',
        information_type: 'DATETIME',
      };

      let result = setUseStateDateValue(addInfo);

      expect(result).toEqual('2021-11-22T07:25:00');
    });

    it('Tests is return true when value is null', () => {
      const addInfo = {
        value: null,
        information_type: 'DATETIME',
      };

      let result = setUseStateDateValue(addInfo);

      expect(result).toEqual('');
    });

    it('Tests is return true when information_type is not DATETIME', () => {
      const addInfo = {
        value: '2021-11-22T10:25:00Z',
        information_type: 'TEXT',
      };

      let result = setUseStateDateValue(addInfo);

      expect(result).toEqual('');
    });
  });

  describe('setUseStateCheckBoxValue', () => {
    it('Tests is return true when providing all correct data', () => {
      const addInfo = {
        value: true,
        information_type: 'CHECKBOX',
      };

      let result = setUseStateCheckBoxValue(addInfo);

      expect(result).toEqual(true);
    });

    it('Tests is return true when value is null', () => {
      const addInfo = {
        value: null,
        information_type: 'CHECKBOX',
      };

      let result = setUseStateCheckBoxValue(addInfo);

      expect(result).toEqual(null);
    });

    it('Tests is return true when information_type is not DATETIME', () => {
      const addInfo = {
        value: null,
        information_type: 'TEXT',
      };

      let result = setUseStateCheckBoxValue(addInfo);

      expect(result).toEqual(null);
    });
  });

  describe('setUseStateNumberValue', () => {
    it('Tests is return true when providing all correct data', () => {
      const addInfo = {
        value: 12,
        information_type: 'NUMBER',
      };

      let result = setUseStateNumberValue(addInfo);

      expect(result).toEqual(12);
    });

    it('Tests is return true when value is null', () => {
      const addInfo = {
        value: null,
        information_type: 'NUMBER',
      };

      let result = setUseStateNumberValue(addInfo);

      expect(result).toEqual('');
    });

    it('Tests is return true when information_type is not NUMBER', () => {
      const addInfo = {
        value: 12,
        information_type: 'TEXT',
      };

      let result = setUseStateNumberValue(addInfo);

      expect(result).toEqual('');
    });
  });

  describe('isValueFilled function', () => {
    it('should return true when value is filled', () => {
      const value = isValueFilled('test 1 2');

      expect(value).toBeTruthy();
    });

    it('should return false when value is equal to null', () => {
      const value = isValueFilled(null);

      expect(value).toBeFalsy();
    });

    it('should return false when value is equal to empty quote', () => {
      const value = isValueFilled('');

      expect(value).toBeFalsy();
    });
  });

  describe('isValueFilledAndPositive function', () => {
    it('should return true when value fit all criteria (positive and higher than 0', () => {
      const numberValue = isValueFilledAndPositive(12);

      expect(numberValue).toBeTruthy();
    });

    it('should return false when value is -12', () => {
      const numberValue = isValueFilledAndPositive(-12);

      expect(numberValue).toBeFalsy();
    });

    it('should return false when value is null', () => {
      const numberValue = isValueFilledAndPositive(null);

      expect(numberValue).toBeFalsy();
    });
  });

  describe('isValueOnlyNumberAndPositive function', () => {
    it('should return true when providing 12 as value', () => {
      const value = isValueOnlyNumberAndPositive(12);

      expect(value).toBeTruthy();
    });

    it('should return true when providing 0 as value', () => {
      const value = isValueOnlyNumberAndPositive(0);

      expect(value).toBeTruthy();
    });

    it('should return false when providing e as value', () => {
      const value = isValueOnlyNumberAndPositive('e');

      expect(value).toBeFalsy();
    });

    it('should return false when providing -32 as value', () => {
      const value = isValueOnlyNumberAndPositive(-32);

      expect(value).toBeFalsy();
    });
  });

  describe('getAutoValueIfExists function ', () => {
    it('should return the auto value if it exists', () => {
        const addInfo = {
          auto_value: '05:31',
          value: '-:-'
        }
        const returnValueWithoutNullParam = getAutoValueIfExists(addInfo);

        expect(returnValueWithoutNullParam).toStrictEqual('05:31');
    });

    it('should return the second parameter if the first one doesnt exists', () => {
        const addInfo = {
          auto_value: null,
          value: '-:-'
        }
        const returnValueWithNullParam = getAutoValueIfExists(addInfo);

        expect(returnValueWithNullParam).toStrictEqual('-:-');
    });
  });
});
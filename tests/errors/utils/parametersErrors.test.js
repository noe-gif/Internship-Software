import { ERROR_PARAMETER_NULL_PROVIDE } from 'src/errors/utils/parametersErrors';

describe('Testing parametersErrors Errors', () => {
  describe('ERROR_PARAMETER_NULL_PROVIDE', () => {
    it('should create a custom error with source provide and static error message', () => {
      const errorParameterNullProvide = ERROR_PARAMETER_NULL_PROVIDE('my source');

      expect(errorParameterNullProvide).toStrictEqual(new Error('my source : Null provide as parameter'));
    });
  });
});

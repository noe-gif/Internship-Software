import hasTextExists from 'src/utils/component/turnaroundHeader';

describe('turnaroundHeader utils', () => {
  describe('hasTextExists function', () => {
    it('should return true when text is equal to test', () => {
      const result = hasTextExists('test');

      expect(result).toBeTruthy();
    });

    it('should return true when text is equal to test', () => {
      const result = hasTextExists('');

      expect(result).toBeFalsy();
    });
  });
})
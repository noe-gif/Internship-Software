import { convertPxToVmax } from 'src/utils/logic/style/cssUnityCalculation';

describe('cssUnityCalculation utils', () => {
  describe('convertPxToVmax function', () => {
    it('should return the conversion to vmax when providing 300px', () => {
      const vmaxResult = convertPxToVmax(300, 18);

      expect(vmaxResult).toStrictEqual(16.666666666666668);
    });
  });
});
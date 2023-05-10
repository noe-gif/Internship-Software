import { onEnterKeyPress } from 'src/utils/logic/keyboardPress/onKeyPress';

const mockedFunction = jest.fn();

describe('Testing onKeyPress functions', () => {
  describe('Testing onEnterKeyPress function', () => {
    it('should call mockedFunction when keyPressed is Enter', () => {
      onEnterKeyPress('Enter', mockedFunction);

      expect(mockedFunction).toHaveBeenCalled();

      mockedFunction.mockClear();
    });

    it('should not call mockedFunction when keyPressed is not Enter', () => {
      onEnterKeyPress('not Enter', mockedFunction);

      expect(mockedFunction).not.toHaveBeenCalled();

      mockedFunction.mockClear();
    });
  });
});

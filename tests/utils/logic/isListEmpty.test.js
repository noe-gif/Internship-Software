import isListEmpty from 'src/utils/logic/isListEmpty';

describe('Testing isListEmpty function', () => {
  it('should return true when empty array is provide', () => {
    const result = isListEmpty([]);

    expect(result).toBeTruthy();
  });

  it('should return false when not empty array is provide', () => {
    const result = isListEmpty(['element']);

    expect(result).toBeFalsy();
  });

  it('should return true when array is null', () => {
    const result = isListEmpty(null);

    expect(result).toBeTruthy();
  });

  it('should return true when array is undefined', () => {
    const result = isListEmpty();

    expect(result).toBeTruthy();
  });
});

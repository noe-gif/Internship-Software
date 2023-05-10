import CustomError from 'src/errors/customError';

describe('Testing CustomError', () => {
  it('should return an error with provided parameters', () => {
    const myCustomError = new CustomError('my source', 'a long message about error');

    expect(myCustomError).toStrictEqual(new Error('my source : a long message about error'));
  });
});

import hasTokenNotExpired from 'src/utils/userSaga';

describe('userSaga utils', () => {
  describe('hasTokenNotExpired function', () => {
    it('should return false when providing an access token expired', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 6, 1, 10, 35)));

      const result = hasTokenNotExpired({ access_token_expiry: '2022-03-14T09:26:15.333642' } );

      expect(result).toBeFalsy();

      jest.useRealTimers();
    });

    it('should return true when providing an access token not expired', () => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.UTC(2022, 0, 1, 10, 35)));

      const result = hasTokenNotExpired({ access_token_expiry: '2022-01-09T09:26:15.333642' } );

      expect(result).toBeTruthy();
      jest.useRealTimers();
    });
  });
}); 
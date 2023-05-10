/**
 * @jest-environment jsdom
*/

import { renderHook, act } from '@testing-library/react-hooks'

import '@testing-library/jest-dom';

import circularTimerHook from 'src/hooks/loader/circularTimerHook';

const refreshTurnarounds = () => {};
const spyRefreshTurnarounds = jest.fn(refreshTurnarounds);

// mocking APP_AUTO_REFRESH_INTERVAL_MS do avoid test error caused by env dependencies
jest.mock('src/constants/globals',
  () => { return ({APP_AUTO_REFRESH_INTERVAL_MS: 30000}) },
);

const turnaroundsData = {
  datePicked: "2021-12-25T13:00:00Z",
  airportPicked: "TTT",
};

const userData = {
  user: {
    access_token: "awesomeToken",
  },
};

const accessToken = "awesomeToken";
const datePicked = "2021-12-25T13:00:00Z";
const airportPicked = "TTT";
const isCurrentlyLoading = false;
const username = 'tarmac.dev';

describe('CIRCULAR TIMER HOOK', () => {
  describe('manualRefresh function', () => {
    it('should set timeLeftBeforeRefresh state to max value and set isTimerActive to false', () => {
      const { result } = renderHook(
        () => circularTimerHook(
          accessToken,
          datePicked,
          airportPicked,
          isCurrentlyLoading,
          spyRefreshTurnarounds,
          username,  
        ),
      );

      act(() => {
        result.current.manualRefresh();
      });

      expect(result.current.timeLeftBeforeRefresh).toStrictEqual(1);
      expect(result.current.isTimerActive).toStrictEqual(false);
      expect(spyRefreshTurnarounds).toHaveBeenCalledWith(
        accessToken,
        datePicked,
        airportPicked,
      );

      spyRefreshTurnarounds.mockClear();
    });
  });

  describe('updateTimer function', () => {
    it('should increment timeLeftBeforeRefresh when timeLeftBeforeRefresh is not equal to max value', () => {
      const { result } = renderHook(
        () => circularTimerHook(
          accessToken,
          datePicked,
          airportPicked,
          isCurrentlyLoading,
          spyRefreshTurnarounds,
          username,
        ),
      );

      expect(result.current.timeLeftBeforeRefresh).not.toStrictEqual(30);
      expect(result.current.timeLeftBeforeRefresh).toStrictEqual(1);

      act(() => {
        result.current.updateTimer();
      });

      expect(result.current.timeLeftBeforeRefresh).toStrictEqual(2);
      expect(spyRefreshTurnarounds).not.toHaveBeenCalled();

      spyRefreshTurnarounds.mockClear();
    });

    it('should call refreshTurnarounds when timeLeftBeforeRefresh is max value', () => {
      const { result } = renderHook(
        () => circularTimerHook(
          accessToken,
          datePicked,
          airportPicked,
          isCurrentlyLoading,
          spyRefreshTurnarounds,
          username,
        ),
      );

      for (let seconds = 1; seconds < 30; seconds++) {
        act(() => {
          result.current.updateTimer();
        });
      }

      expect(result.current.timeLeftBeforeRefresh).toStrictEqual(30);

      act(() => {
        result.current.updateTimer();
      });

      expect(spyRefreshTurnarounds).toHaveBeenCalledWith(
        accessToken,
        datePicked,
        airportPicked,
      );

      expect(result.current.timeLeftBeforeRefresh).toStrictEqual(1);

      spyRefreshTurnarounds.mockClear();
    });
  });

  describe('resetTimer function', () => {
    it('should set timeLeftBeforeRefresh state to 1 and isTimerActive state to false', () => {
      const { result } = renderHook(
        () => circularTimerHook(refreshTurnarounds, turnaroundsData, userData),
      );

      act(() => {
        result.current.updateTimer();
      });

      expect(result.current.timeLeftBeforeRefresh).toStrictEqual(2);

      act(() => {
        result.current.resetTimer();
      });

      expect(result.current.timeLeftBeforeRefresh).toStrictEqual(1);
      expect(result.current.isTimerActive).toStrictEqual(false);
    });
  });
});

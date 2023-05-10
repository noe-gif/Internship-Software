import { useState } from 'react';

import { APP_AUTO_REFRESH_INTERVAL_MS } from 'src/constants/globals';
import { INITIAL_TIMER_VALUE } from 'src/utils/component/loader/circularTimer';
import removeDotFromString from 'src/utils/parsing/removeDotFromString';

export default function circularTimerHook(
  accessToken,
  datePicked,
  airportPicked,
  isCurrentlyLoading,
  refreshTurnarounds,
  username,
) {
  const [timeLeftBeforeRefresh, setTimeLeftBeforeRefresh] = useState(INITIAL_TIMER_VALUE);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const isTimerComplete = (timeLeftBeforeRefresh >= APP_AUTO_REFRESH_INTERVAL_MS / 1000);

  const updateTimer = () => {
    if (isTimerComplete) {
      setTimeLeftBeforeRefresh(INITIAL_TIMER_VALUE);
      refreshTurnarounds(
        accessToken,
        datePicked,
        airportPicked,
      );
    } else {
      setTimeLeftBeforeRefresh(timeLeftBeforeRefresh + 1);
    }
  };

  const resetTimer = () => {
    setTimeLeftBeforeRefresh(INITIAL_TIMER_VALUE);
    setIsTimerActive(false);
  };

  const manualRefresh = () => {
    refreshTurnarounds(
      accessToken,
      datePicked,
      airportPicked,
    );
    setTimeLeftBeforeRefresh(INITIAL_TIMER_VALUE);
    setIsTimerActive(false);
  };

  const calcPercentageLeftBeforeRefresh = () => {
    const percentageLeftBeforeRefresh = (timeLeftBeforeRefresh * 100) / (APP_AUTO_REFRESH_INTERVAL_MS / 1000);

    return percentageLeftBeforeRefresh;
  };

  const circularTimerBackground = () => (
    {
      background:
        `conic-gradient(
          #1B2E4B ${calcPercentageLeftBeforeRefresh()}%,
          #ffffff 0
        )`,
    }
  );

  const handleActiveTimer = () => {
    let interval = null;

    if (isTimerActive) {
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    } else if (!isTimerActive && timeLeftBeforeRefresh !== 0) {
      clearInterval(interval);
      setIsTimerActive(true);
    }

    return () => clearInterval(interval);
  };

  const extractUniqueUsernameId = () => {
    if (username) {
      return removeDotFromString(username);
    } else {
      return null;
    }
  };

  const handleTurnaroundsDataChanges = () => {
    if (isCurrentlyLoading) {
      resetTimer();
    }
  };

  return {
    circularTimerBackground,
    extractUniqueUsernameId,
    handleActiveTimer,
    handleTurnaroundsDataChanges,
    isTimerActive,
    manualRefresh,
    resetTimer,
    timeLeftBeforeRefresh,
    updateTimer,
  };
}

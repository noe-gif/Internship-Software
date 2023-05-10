import React, { useEffect } from 'react';

import circularTimerHook from 'src/hooks/loader/circularTimerHook';

import 'src/styles/CircularTimer.css';

export default function CircularTimer(props) {
  const {
    accessToken,
    airportPicked,
    datePicked,
    isCurrentlyLoading,
    refreshTurnarounds,
    username,
  } = props;

  const {
    circularTimerBackground,
    extractUniqueUsernameId,
    handleActiveTimer,
    handleTurnaroundsDataChanges,
    isTimerActive,
    manualRefresh,
    timeLeftBeforeRefresh,
  } = circularTimerHook(
    accessToken,
    datePicked,
    airportPicked,
    isCurrentlyLoading,
    refreshTurnarounds,
    username,
  );

  useEffect(() => (
    handleActiveTimer()
  ), [isTimerActive, timeLeftBeforeRefresh]);

  useEffect(() => {
    handleTurnaroundsDataChanges();
  }, [airportPicked, datePicked]);

  return (
    <div
      className="circularTimer"
      style={circularTimerBackground()}
    >
      <div
        id={`${extractUniqueUsernameId()}CircularTimer`}
        aria-hidden="true"
        className="circularTimerCenter"
        onClick={manualRefresh}
      />
    </div>
  );
}

import React, { useEffect } from 'react';

import NoAirportSelected from 'src/components/turnaround/noAirportSelected';
import NoTurnaroundMessage from 'src/components/turnaround/noTurnaroundMessage';
import Turnarounds from 'src/containers/turnaround/turnaroundsContainer';
import TurnaroundsDetails from 'src/containers/turnaroundDetail/turnaroundsDetailsContainer';
import TurnaroundsLoader from 'src/components/loader/turnaroundsLoader';

import homeContentHook from 'src/hooks/home/homeContentHook';

import { extractTurnaroundsByDate } from 'src/utils/component/home/homeContent';
import { isNoAirportSelected, hasTurnaroundData } from 'src/utils/component/home';

import 'src/styles/HomeContent.css';

export default function HomeContent(props) {
  const {
    airportPicked,
    datePicked,
    isCurrentlyLoading,
    isInDetailsView,
    searchBarValue,
    selectedTurnaroundDate,
    turnarounds,
  } = props;

  const {
    contentClass,
    detailViewVisibility,
    handleAutoScrollPosition,
    selectedTimezone,
  } = homeContentHook(isInDetailsView, selectedTurnaroundDate);

  useEffect(() => {
    handleAutoScrollPosition();
  }, [isInDetailsView, selectedTurnaroundDate]);

  let turnaroundCategoriesPerDate = [];

  const displayLoadingAndEmptyTurnaround = () => {
    if (isCurrentlyLoading) {
      return <TurnaroundsLoader />;
    } else if (isNoAirportSelected(airportPicked)) {
      return <NoAirportSelected />;
    } else if (hasTurnaroundData(turnarounds)) {
      turnaroundCategoriesPerDate = extractTurnaroundsByDate(datePicked, turnarounds, searchBarValue, selectedTimezone);
      return null;
    } else {
      return <NoTurnaroundMessage />;
    }
  };

  return (
    <>
      {displayLoadingAndEmptyTurnaround()}
      <Turnarounds
        contentClass={contentClass}
        turnaroundCategoriesPerDate={turnaroundCategoriesPerDate}
      />
      <div className={detailViewVisibility}>
        <TurnaroundsDetails />
      </div>
    </>
  );
}

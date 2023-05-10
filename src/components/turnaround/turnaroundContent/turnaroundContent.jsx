import React from 'react';

import TurnaroundMainInformation from 'src/components/turnaround/turnaroundContent/turnaroundMainInformation';
import TurnaroundArrivalFlight from 'src/components/turnaround/turnaroundContent/turnaroundArrivalFlight';
import TurnaroundDepartureFlight from 'src/components/turnaround/turnaroundContent/turnaroundDepartureFlight';

export default function TurnaroundContent(props) {
  const {
    classes,
    iconSize,
    isSmall,
    turnaround,
    turnaroundDate,
  } = props;

  return (
    <>
      <TurnaroundArrivalFlight
        arrivalFlight={turnaround.arrival_flight}
        classes={classes}
        iconSize={iconSize}
        isSmall={isSmall}
        turnaroundDate={turnaroundDate}
        turnaroundId={turnaround.id}
        turnaroundStatus={turnaround.status}
      />
      <TurnaroundMainInformation
        classes={classes}
        isSmall={isSmall}
        turnaround={turnaround}
      />
      <TurnaroundDepartureFlight
        classes={classes}
        departureFlight={turnaround.departure_flight}
        iconSize={iconSize}
        isSmall={isSmall}
        turnaroundDate={turnaroundDate}
        turnaroundId={turnaround.id}
        turnaroundStatus={turnaround.status}
      />
    </>
  );
}

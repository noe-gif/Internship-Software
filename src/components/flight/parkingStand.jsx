import React, { useEffect, useState } from 'react';
import { isParkingStandValidToBeDisplayed } from 'src/utils/component/turnaround/turnarounds';

export default function ParkingStand(props) {
  const {
    parkingStand,
    turnaroundId,
    turnaroundStatus,
    turnaroundType,
  } = props;

  const [backgroundColor, setBackgroundColor] = useState('');
  const parkingStandBackgroundWhenDisplayed = '#1F2673';
  const parkingStandBackgroundWhenNotDisplayed = 'transparent';

  useEffect(() => {
    setBackgroundColor(isParkingStandValidToBeDisplayed(parkingStand, turnaroundStatus)
      ? parkingStandBackgroundWhenDisplayed
      : parkingStandBackgroundWhenNotDisplayed);
  }, [parkingStand]);

  return (
    <>
      <div className="turnaroundsParkingStandContentContainer" style={{ backgroundColor }}>
        {isParkingStandValidToBeDisplayed(parkingStand, turnaroundStatus) && (
          <p
            id={`turnaround${turnaroundType}FlightParkingStand${turnaroundId}`}
            className="fontSizeDefault turnaroundDetailHeaderParkingStandText"
          >
            {parkingStand}
          </p>
        )}
      </div>
    </>
  );
}

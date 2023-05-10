import { IN_PROGRESS, INCOMING } from 'src/types/FlightStatus';

export const isParkingStandValidToBeDisplayed = (parkingStand, turnaroundStatus) => { //eslint-disable-line
  const validStatusForDisplaying = [INCOMING, IN_PROGRESS];

  return parkingStand && validStatusForDisplaying.includes(turnaroundStatus);
};

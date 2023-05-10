import { NO_AIRPORT_PICKED } from 'src/constants/home/homeConstant';

export function isNoAirportSelected(airportPicked) {
  return (airportPicked === NO_AIRPORT_PICKED);
}

export function hasTurnaroundData(turnarounds) {
  return (turnarounds?.length > 0);
}

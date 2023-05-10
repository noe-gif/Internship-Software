import { IATA_CODE_AIRPORT_LENGTH } from 'src/constants/fieldLength';

export const hasAirportSelectedCorrectCriteriaToLaunchRequest = (airportSelected) => { // eslint-disable-line
  const airportSelectedEmpty = '';

  if (airportSelected !== airportSelectedEmpty && airportSelected.length === IATA_CODE_AIRPORT_LENGTH) {
    return true;
  }
  return false;
};

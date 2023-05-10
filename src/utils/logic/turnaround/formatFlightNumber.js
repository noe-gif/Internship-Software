import { EMPTY_FLIGHT_NUMBER } from 'src/constants/emptyValues';

export default function formatFlightNumber(turnaroundData) {
  return (turnaroundData
    ? `${turnaroundData?.carrier_code} ${turnaroundData?.flight_number}`
    : EMPTY_FLIGHT_NUMBER);
}

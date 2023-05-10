import { ERROR_PARAMETER_NULL_PROVIDE } from 'src/errors/utils/parametersErrors';

export function extractTasksFromTurnaround(turnaround) {
  try {
    return {
      tasks: turnaround.normal_tasks_above_wing.concat(turnaround.normal_tasks_below_wing),
    };
  } catch (error) {
    throw ERROR_PARAMETER_NULL_PROVIDE('extractTasksFromTurnaround');
  }
}

export function extractCarrierCodesFromTurnaround(turnaround) {
  try {
    return {
      arrivalCarrierCode: turnaround.arrival_flight?.carrier_code,
      departureCarrierCode: turnaround.departure_flight?.carrier_code,
    };
  } catch (error) {
    throw ERROR_PARAMETER_NULL_PROVIDE('extractCarrierCodesFromTurnaround');
  }
}

export function extractFlightsInformationFromTurnaround(turnaround) {
  if (turnaround?.arrival_flight && turnaround?.departure_flight) {
    return {
      arrival_flight: {
        carrier_code: turnaround?.arrival_flight?.carrier_code,
        flight_number: turnaround?.arrival_flight?.flight_number,
        aircraft: turnaround?.arrival_flight?.aircraft,
      },
      departure_flight: {
        carrier_code: turnaround?.departure_flight?.carrier_code,
        flight_number: turnaround?.departure_flight?.flight_number,
        aircraft: turnaround?.departure_flight?.aircraft,
      },
    };
  } else if (turnaround?.arrival_flight) {
    return {
      arrival_flight: {
        carrier_code: turnaround?.arrival_flight?.carrier_code,
        flight_number: turnaround?.arrival_flight?.flight_number,
        aircraft: turnaround?.arrival_flight?.aircraft,
      },
    };
  } else if (turnaround?.departure_flight) {
    return {
      departure_flight: {
        carrier_code: turnaround?.departure_flight?.carrier_code,
        flight_number: turnaround?.departure_flight?.flight_number,
        aircraft: turnaround?.departure_flight?.aircraft,
      },
    };
  }

  return {
    arrival_flight: {
      carrier_code: '',
      flight_number: '',
      aircraft: '',
    },
    departure_flight: {
      carrier_code: '',
      flight_number: '',
      aircraft: '',
    },
  };
}

export function extractTailNumberFromTurnaround(turnaround) {
  return (turnaround.arrival_flight && turnaround.arrival_flight.aircraft)
    ? turnaround.arrival_flight.aircraft.tail_number
    : turnaround.departure_flight.aircraft.tail_number;
}

export function extractAircraftFromTurnaround(turnaround) {
  try {
    return (turnaround.arrival_flight && turnaround.arrival_flight.aircraft)
      ? turnaround.arrival_flight.aircraft.icao_code
      : turnaround.departure_flight.aircraft.icao_code;
  } catch (error) {
    throw ERROR_PARAMETER_NULL_PROVIDE('extractAircraftFromTurnaround');
  }
}

export function extractAircraftCharacteristicsFromTurnaround(turnaround) {
  return {
    aircraft: extractAircraftFromTurnaround(turnaround),
    carrierCodes: extractCarrierCodesFromTurnaround(turnaround),
    tailNumber: extractTailNumberFromTurnaround(turnaround),
  };
}

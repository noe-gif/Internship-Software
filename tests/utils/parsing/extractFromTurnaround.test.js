import {
  extractAircraftFromTurnaround,
  extractAircraftCharacteristicsFromTurnaround,
  extractCarrierCodesFromTurnaround,
  extractFlightsInformationFromTurnaround,
  extractTailNumberFromTurnaround,
  extractTasksFromTurnaround,
} from 'src/utils/parsing/extractFromTurnaround';

const flightAircraftInfo = {
  tail_number: 'FRBOD',
  icao_code: 'A323',
};

const turnaround = {
  normal_tasks_above_wing: [
    {
      id: 1,
    },
    {
      id: 2,
    }
  ],
  normal_tasks_below_wing: [
    {
      id: 1,
    },
    {
      id: 2,
    }
  ],
  arrival_flight: {
    carrier_code: 'TT',
    flight_number: '323',
    aircraft: flightAircraftInfo,
  },
  departure_flight: {
    carrier_code: 'BX',
    flight_number: '401',
    aircraft: flightAircraftInfo,
  },
};

describe('extractFromTurnaround utils', () => {
  describe('extractTasksFromTurnaround function', () => {
    it('should return the tasks', () => {
      const tasks = extractTasksFromTurnaround(turnaround);

      expect(tasks).toStrictEqual({ tasks: turnaround.normal_tasks_above_wing.concat(turnaround.normal_tasks_below_wing)});
    });

    it('should throw an error when parameter is null', () => {
      expect(() => { extractTasksFromTurnaround(null); })
      .toThrow('extractTasksFromTurnaround : Null provide as parameter');
    });
  });

  describe('extractCarrierCodesFromTurnaround function', () => {
    it('should return the carriersCode', () => {
      const carriersCode = extractCarrierCodesFromTurnaround(turnaround);

      expect(carriersCode).toStrictEqual({
        arrivalCarrierCode: 'TT',
        departureCarrierCode: 'BX',
      });
    });

    it('should throw an error when parameter is null', () => {
      expect(() => { extractCarrierCodesFromTurnaround(null); })
      .toThrow('extractCarrierCodesFromTurnaround : Null provide as parameter');
    });
  });

  describe('extractFlightsInformationFromTurnaround function', () => {
    it('should return the planes information when departure and arrival flight exists', () => {
      const planesInformation = extractFlightsInformationFromTurnaround(turnaround);

      expect(planesInformation).toStrictEqual({
        arrival_flight: {
          carrier_code: 'TT',
          flight_number: '323',
          aircraft: flightAircraftInfo,
        },
        departure_flight: {
          carrier_code: 'BX',
          flight_number: '401',
          aircraft: flightAircraftInfo,
        },
      });
    });

    it('should return the planes information when only departure flight exists', () => {
      const planesInformation = extractFlightsInformationFromTurnaround({
        departure_flight: {
          carrier_code: 'BX',
          flight_number: '401',
          aircraft: flightAircraftInfo,
        },
      });

      expect(planesInformation).toStrictEqual({
        departure_flight: {
          carrier_code: 'BX',
          flight_number: '401',
          aircraft: flightAircraftInfo,
        },
      });
    });

    it('should return the planes information when only arrival flight exists', () => {
      const planesInformation = extractFlightsInformationFromTurnaround({
        arrival_flight: {
          carrier_code: 'TT',
          flight_number: '323',
          aircraft: flightAircraftInfo,
        },
      });

      expect(planesInformation).toStrictEqual({
        arrival_flight: {
          carrier_code: 'TT',
          flight_number: '323',
          aircraft: flightAircraftInfo,
        },
      });
    });

    it('should return empty values when param is undefined', () => {
      const planesInformation = extractFlightsInformationFromTurnaround({});

      expect(planesInformation).toStrictEqual({
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
      });
    });
  });

  describe('extractTailNumberFromTurnaround function', () => {
    it('should return tailNumber from arrival_flight when arrival_flight exist and has an aircraft field', () => {
      const tailNumber = extractTailNumberFromTurnaround(turnaround);

      expect(tailNumber).toStrictEqual('FRBOD');
    });

    it('should return tailNumber from departure_flight when arrival_flight does not exist', () => {
      const tailNumber = extractTailNumberFromTurnaround({
        ...turnaround,
        arrival_flight: null,
      });

      expect(tailNumber).toStrictEqual('FRBOD');
    });
  });

  describe('extractAircraftFromTurnaround', () => {
    it('should return aircraft from arrival flight when arrival flight exist', () => {
      const aircraft = extractAircraftFromTurnaround(turnaround);

      expect(aircraft).toStrictEqual('A323');
    });

    it('should return aircraft from departure flight when arrival does not exist', () => {
      const aircraft = extractAircraftFromTurnaround({
        ...turnaround,
        arrival_flight: null,
      });

      expect(aircraft).toStrictEqual('A323');
    });

    it('should throw an error when param is null', () => {
      expect(() => { extractAircraftFromTurnaround(null) })
      .toThrow('extractAircraftFromTurnaround : Null provide as parameter')
    });
  });

  describe('extractAircraftCharacteristicsFromTurnaround', () => {
    it('should return aircraftCharacteristics', () => {
      const aircraftCharacteristics = extractAircraftCharacteristicsFromTurnaround(turnaround);

      expect(aircraftCharacteristics).toStrictEqual({
        aircraft: 'A323',
        carrierCodes: { arrivalCarrierCode: 'TT', departureCarrierCode: 'BX' },
        tailNumber: 'FRBOD',
      });
    });
  });
});
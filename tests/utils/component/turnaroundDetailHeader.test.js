import {
  componentSizeIsNotLarge,
  errorThrowByParkingStandNewValue,
  getIataCode,
  isParkingStandCorrectFormat,
  isParkingStandCorrectLength,
  isParkingStandNull,
  regexOnlyNumberAndLetter,
  getInitialValueIfParkingStandEmpty,
  getParkingStandValueForModal,
} from 'src/utils/component/turnaroundDetailHeader';

describe('turnaroundDetailHeader utils', () => {
  describe('componentSizeIsNotLarge function', () => {
    it('should return true when passing componentSize to small', () => {
      const result = componentSizeIsNotLarge('small');

      expect(result).toBeTruthy();
    });

    it('should return true when passing componentSize to splitView', () => {
      const result = componentSizeIsNotLarge('large splitView');

      expect(result).toBeTruthy();
    });

    it('should return false when passing componentSize to large', () => {
      const result = componentSizeIsNotLarge('large');

      expect(result).toBeFalsy();
    });

    it('should return true when passing componentSize to null', () => {
      const result = componentSizeIsNotLarge(null);

      expect(result).toBeFalsy();
    });

    it('should return true when passing componentSize to undefined', () => {
      const result = componentSizeIsNotLarge(undefined);

      expect(result).toBeFalsy();
    });
  });

  describe('getIataCode function', () => {
    const turnaroundData = {
      arrival_flight: {
        arrival_airport: {
          iata_code: 'TTT'
        },
      },
      departure_flight: {
        departure_airport: {
          iata_code: 'ORY',
        },
      },
    };

    const turnaroundDataDeparture = {
      departure_flight: {
        departure_airport: {
          iata_code: 'ORY',
        },
      },
    }

    it('should return TTT because arrival iata code exists', () => {
      const result = getIataCode(turnaroundData);

      expect(result).toStrictEqual('TTT');
    });

    it('should return ORY because arrival iata code does not exists', () => {
      const result = getIataCode(turnaroundDataDeparture);

      expect(result).toStrictEqual('ORY');
    });

    it('should return undefined because arrival flight is empty', () => {
      const result = getIataCode({...turnaroundData, arrival_flight: {}});

      expect(result).toStrictEqual(undefined);
    });
  });

  describe('setInitialValueIfParkingStandEmpty function', () => {
    it('should return -- when providing null', () => {
      const result = getInitialValueIfParkingStandEmpty(null);

      expect(result).toStrictEqual('--');
    });

    it('should return CC09 when providing CC09', () => {
      const result = getInitialValueIfParkingStandEmpty('CC09');

      expect(result).toStrictEqual('CC09');
    });
  });

  describe('setParkingStandValueForModal function', () => {
    it("should return '' when providing parkingStandTriggerValue to --", () => {
      const result = getParkingStandValueForModal('--');

      expect(result).toStrictEqual('');
    });

    it("should return CC09 when providing parkingStandTriggerValue to CC09", () => {
      const result = getParkingStandValueForModal('CC09');

      expect(result).toStrictEqual('CC09');
    });
  });

  describe('errorThrowByParkingStandNewValue function', () => {
    it('should return empty quote when providing value to null (case of the reset button)', () => {
      const result = errorThrowByParkingStandNewValue(null);

      expect(result).toStrictEqual('');
    });

    it('should return the correct error message when providing value equal to TTT455', () => {
      const result = errorThrowByParkingStandNewValue('TTT455');

      expect(result).toStrictEqual('The text has to be between 1 and 4 characters');
    });

    it('should return the correct error message when providing value equal to empty', () => {
      const result = errorThrowByParkingStandNewValue('');

      expect(result).toStrictEqual('The text has to be between 1 and 4 characters');
    });

    it('should return the correct error message when providing value equal to TTT;', () => {
      const result = errorThrowByParkingStandNewValue('TTT;');

      expect(result).toStrictEqual('The text has to contain only letter and number');
    });
  });

  describe('regexOnlyNumberAndLetter function', () => {
    it('should return true when providing AZE1', () => {
      const result = regexOnlyNumberAndLetter('AZE1');

      expect(result).toBeTruthy();
    });

    it('should return false when providing AZ1;', () => {
      const result = regexOnlyNumberAndLetter('AZ1;');

      expect(result).toBeFalsy();
    });
  });

  describe('isParkingStandNull function', () => {
    it('should return true when providing value to null', () => {
      const result = isParkingStandNull(null);

      expect(result).toBeTruthy();
    });

    it('should return false when providing value to AZE', () => {
      const result = isParkingStandNull('AZE');

      expect(result).toBeFalsy();
    });
  });

  describe('isParkingStandCorrectLength function', () => {
    it('should return true when providing value to have a length to 0', () => {
      const result = isParkingStandCorrectLength('');

      expect(result).toBeTruthy();
    });

    it('should return true when providing value to have a length higher than 4', () => {
      const result = isParkingStandCorrectLength('AZERT');

      expect(result).toBeTruthy();
    });

    it('should return false when providing value to have a length higher than 2', () => {
      const result = isParkingStandCorrectLength('AZ');

      expect(result).toBeFalsy();
    });
  });

  describe('isParkingStandCorrectFormat function', () => {
    it('return true when providing value to AZE;', () => {
      const result = isParkingStandCorrectFormat('AZE;');

      expect(result).toBeTruthy();
    });

    it('return false when providing value to AZE1', () => {
      const result = isParkingStandCorrectFormat('AZE1');

      expect(result).toBeFalsy();
    });
  })
  
});
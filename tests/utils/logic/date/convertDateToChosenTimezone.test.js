import representUTCDateToChosenTimezoneAndFormat from 'src/utils/logic/date/representUTCDateToChosenTimezoneAndFormat';

describe('Checking the date convertion to the correct timezone', () => {
  it('should return an UTC date when providing an UTC date and "UTC" as parameters', () => {
    const dateToConvert = '2021-12-18T10:00:00.000Z';
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'UTC',
    );

    const expectedDate = '2021-12-18 10:00:00';

    expect(convertedDate).toStrictEqual(expectedDate);
  });

  it('should return an Pacific/Pago_Pago date when providing an UTC date and "Pacific/Pago_Pago" as parameters', () => {
    const dateToConvert = '2021-12-18T10:00:00.000Z';
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'Pacific/Pago_Pago',
    );

    const expectedDate = '2021-12-17 23:00:00';

    expect(convertedDate).toStrictEqual(expectedDate);
  });

  it('should return an Antarctica/McMurdo date when providing an UTC date and "Antarctica/McMurdo" as parameters', () => {
    const dateToConvert = '2021-12-18T15:00:00.000Z';
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'Antarctica/McMurdo',
    );

    const expectedDate = '2021-12-19 04:00:00';

    expect(convertedDate).toStrictEqual(expectedDate);
  });

  it('should return an Antarctica/McMurdo date when providing an UTC date and "Antarctica/McMurdo" as parameters', () => {
    const dateToConvert = '2021-12-18T15:00:00.000Z';
    const dateFormat = 'DD-MM-YYYY';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'Antarctica/McMurdo',
    );

    const expectedDate = '19-12-2021';

    expect(convertedDate).toStrictEqual(expectedDate);
  });

  it('should return a local date when providing an UTC date and no timezone as parameters', () => {
    const dateToConvert = '2021-12-18T15:00:00.000Z';
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';

    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat
    );

    const expectedDate = '2021-12-18 12:00:00';

    expect(convertedDate).toStrictEqual(expectedDate);
  });
});

describe('testing the date format', () => { 
  
  it('should return dd-mm-yyyy if the date format is dd-mm-yyyy', () => {
    const dateToConvert = '2021-12-18T10:00:00.000Z';
    const dateFormat = 'dd-mm-yyyy';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'UTC',
    );

    const expectedDate = '18-12-2021';

    expect(convertedDate).toStrictEqual(expectedDate);
  });

  it('should return hh:mm:ss if the date format is hh:mm:ss', () => {
    const dateToConvert = '2021-12-18T10:32:45.000Z';
    const dateFormat = 'hh:mm:ss';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'UTC',
    );

    const expectedDate = '10:32:45';

    expect(convertedDate).toStrictEqual(expectedDate);
  });

  it('should return yyyy:mm:dd if the date format is yyyy:mm:dd', () => {
    const dateToConvert = '2021-12-18T10:32:45.000Z';
    const dateFormat = 'yyyy-mm-dd';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'UTC',
    );

    const expectedDate = '2021-12-18';

    expect(convertedDate).toStrictEqual(expectedDate);
  });

  it('should return mm-dd-yyyy if the date format is mm-dd-yyyy', () => {
    const dateToConvert = '2021-12-18T10:32:45.000Z';
    const dateFormat = 'mm-dd-yyyy';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'UTC',
    );

    const expectedDate = '12-18-2021';

    expect(convertedDate).toStrictEqual(expectedDate);
  });

  it('should return HH:mm if the date format is HH:mm (next day)', () => {  
    const dateToConvert = '2021-03-01T23:03:00.000Z';
    const dateFormat = 'hh:mm';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'Europe/Paris',
    );

    const expectedDate = '00:03';

    expect(convertedDate).toStrictEqual(expectedDate); 
  })

  it('should return HH:mm if the date format is HH:mm (previous day)', () => {  
    const dateToConvert = '2021-03-01T02:03:00.000Z';
    const dateFormat = 'hh:mm';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'America/Boa_Vista',
    );

    const expectedDate = '22:03';

    expect(convertedDate).toStrictEqual(expectedDate); 
  })

  it('should return DD MMMM YYYY - DDDD if the date format is DD MMMM YYYY - DDDD (previous day)', () => { 
    const dateToConvert = '2021-04-15T02:03:00.000Z';
    const dateFormat = 'DD MMMM YYYY - DDDD';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'America/Boa_Vista',
    );

    const expectedDate = '14 APRIL 2021 - WEDNESDAY';

    expect(convertedDate).toStrictEqual(expectedDate); 
  })

  it('should return DD MMMM YYYY - DDDD if the date format is DD MMMM YYYY - DDDD (next day)', () => {  
    const dateToConvert = '2021-04-15T23:03:00.000Z';
    const dateFormat = 'DD MMMM YYYY - DDDD';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'Europe/Paris',
    );

    const expectedDate = '16 APRIL 2021 - FRIDAY';

    expect(convertedDate).toStrictEqual(expectedDate); 
  })

    it('should return DD DDMMMYY if the date format is DD DDMMMYY (previous day)', () => { 
    const dateToConvert = '2021-04-15T02:03:00.000Z';
    const dateFormat = 'DDMMMYY';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'America/Boa_Vista',
    );

    const expectedDate = '14APR21';

    expect(convertedDate).toStrictEqual(expectedDate); 
  })

  it('should return DD DDMMMYY if the date format is DD DDMMMYY (next day)', () => {  
    const dateToConvert = '2021-04-15T23:03:00.000Z';
    const dateFormat = 'DDMMMYY';
    const convertedDate = representUTCDateToChosenTimezoneAndFormat(
      dateToConvert,
      dateFormat,
      'Europe/Paris',
    );

    const expectedDate = '16APR21';

    expect(convertedDate).toStrictEqual(expectedDate); 
  })
});

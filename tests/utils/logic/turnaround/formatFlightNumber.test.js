import formatFlightNumber from 'src/utils/logic/turnaround/formatFlightNumber';

const turnaround = {
  departure_flight : {
    carrier_code: "KL",
    flight_number: "606"
  }
}

const turnaroundWithOneValue = {
  arrival_flight : {
    flight_number: "606",
    carrier_code: '',
  }
}

const turnaroundEmpty = {
  arrival_flight : {
    flight_number: '',
    carrier_code: '',
  }
}

describe('formatFlightNumber', () => {
  it('test with flight number and carrier code', () => {
    let result = formatFlightNumber(turnaround.departure_flight);

    expect(result).toStrictEqual('KL 606');
  });

  it('test with only flight number', () => {
    let result = formatFlightNumber(turnaroundWithOneValue.arrival_flight);

    expect(result).toStrictEqual(' 606');
  });

  it('test with no value', () => {
    let result = formatFlightNumber(turnaroundEmpty.arrival_flight);

    expect(result).toStrictEqual(' ');
  })

})
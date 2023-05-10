import extractCarrierCodeFromTurnaroundCarrierCodes from 'src/utils/logic/airline/extractCarrierCodeFromTurnaroundCarrierCodes';

const turnaround = {
  arrivalCarrierCode: 'TT',
  departureCarrierCode: 'BX',
};

describe('Testing extractCarrierCodeFromTurnaroundCarrierCodes Function', () => {
  it('should return arrival and departure carrier code when they are different', () => {
    let carriersCode = extractCarrierCodeFromTurnaroundCarrierCodes(turnaround);

    expect(carriersCode).toStrictEqual(['TT', 'BX']);
  });

  it('should return a single carrier code when arrivalFlight and departureFlight equal carrier code', () => {
    let carriersCode = extractCarrierCodeFromTurnaroundCarrierCodes({ ...turnaround, departureCarrierCode: 'TT' });

    expect(carriersCode).toStrictEqual(['TT']);
  });

  it('should return a single carrier code when only arrivalFlight carrier code provide', () => {
    let carriersCode = extractCarrierCodeFromTurnaroundCarrierCodes({ ...turnaround, departureCarrierCode: null });

    expect(carriersCode).toStrictEqual(['TT']);
  });

  it('should return a single carrier code when only departureFlight carrier code provide', () => {
    let carriersCode = extractCarrierCodeFromTurnaroundCarrierCodes({ ...turnaround, arrivalCarrierCode: null });

    expect(carriersCode).toStrictEqual(['BX']);
  });

  it('should return an empty array when no carrier code provide', () => {
    let carriersCode = extractCarrierCodeFromTurnaroundCarrierCodes({ arrivalCarrierCode: null, departureCarrierCode: null });

    expect(carriersCode).toStrictEqual([]);
  });

  it('should return an empty array when all params null', () => {
    let carriersCode = extractCarrierCodeFromTurnaroundCarrierCodes(null, null);

    expect(carriersCode).toStrictEqual([]);
  })
})

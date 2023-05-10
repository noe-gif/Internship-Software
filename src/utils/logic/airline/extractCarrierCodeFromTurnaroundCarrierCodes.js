const isTurnaroundWithoutCarrierCode = (turnaroundCarrierCodes) => (
  !turnaroundCarrierCodes?.arrivalCarrierCode && !turnaroundCarrierCodes?.departureCarrierCode
);

const extractArrivalCarrierCode = (arrivalCarrierCode) => (arrivalCarrierCode ? arrivalCarrierCode : null); //eslint-disable-line

const isDepartureCarrierCodeAlreadyExtracted = (departureCarrierCode, extractedCarrierCodes) => (
  departureCarrierCode && !extractedCarrierCodes.includes(departureCarrierCode)
);

export default function extractCarrierCodeFromTurnaroundCarrierCodes(turnaroundCarrierCodes) {
  const carrierCodes = [];

  if (isTurnaroundWithoutCarrierCode(turnaroundCarrierCodes)) {
    return [];
  }

  carrierCodes.push(extractArrivalCarrierCode(turnaroundCarrierCodes?.arrivalCarrierCode));

  if (isDepartureCarrierCodeAlreadyExtracted(turnaroundCarrierCodes?.departureCarrierCode, carrierCodes)) {
    carrierCodes.push(turnaroundCarrierCodes?.departureCarrierCode);
  }

  const carriersCodesFiltered = carrierCodes.filter((code) => code !== null);

  return carriersCodesFiltered;
}

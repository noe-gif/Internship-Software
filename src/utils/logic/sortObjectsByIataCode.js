export function sortObjectsByIataCode(objectA, objectB) {
  if (objectA.iata_code < objectB.iata_code) {
    return -1;
  } else if (objectA.iata_code > objectB.iata_code) {
    return 1;
  } else {
    return 0;
  }
}
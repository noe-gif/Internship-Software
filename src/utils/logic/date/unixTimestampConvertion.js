export const dateRepresentationToUnixTimestamp = (dateRepresentation) => (
  Date.parse(dateRepresentation)
);

export const unixTimestampToHourRepresentation = (unixTimestamp) => (
  (unixTimestamp / (1000 * 60 * 60))
);

export default function secondsToHHMMFormat(seconds) {
  if (!seconds) {
    return '-';
  } else {
    return new Date(seconds * 1000).toISOString().substr(11, 5);
  }
}

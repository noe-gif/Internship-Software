export default function dateToTimeString(date) {
  if (!date) {
    return '00:00';
  }

  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = String(hours).length === 2 ? hours : `0${hours}`;
  minutes = String(minutes).length === 2 ? minutes : `0${minutes}`;

  return (`${hours}:${minutes}`);
}

import hasAgoaStringDateFormat from './hasAgoaStringDateFormat';

export default function parseAgoaStringDate(dateStringToParse) {
  if (!dateStringToParse) {
    return null;
  }
  if (!hasAgoaStringDateFormat(dateStringToParse)) {
    throw new Error('Date String doesn\'t match Agoa format');
  }

  let cleanDateString = dateStringToParse.replace(/T|:/g, '-');
  cleanDateString = cleanDateString.replace('Z', '');

  const separatedDate = cleanDateString.split('-');

  return ({
    year: parseInt(separatedDate[0], 10),
    month: parseInt(separatedDate[1], 10),
    day: parseInt(separatedDate[2], 10),
    hours: parseInt(separatedDate[3], 10),
    minutes: parseInt(separatedDate[4], 10),
    seconds: parseInt(separatedDate[5], 10),
  });
}

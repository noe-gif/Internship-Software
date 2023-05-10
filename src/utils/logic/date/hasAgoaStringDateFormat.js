import { DATE_FORMAT_PATTERN } from '../../../types/RegexPattern';

export default function hasAgoaStringDateFormat(dateStringToCheck) {
  const isMatching = DATE_FORMAT_PATTERN.test(dateStringToCheck);

  if (!isMatching) {
    throw Error('Date String doesn\'t match Agoa format');
  } else {
    return isMatching;
  }
}

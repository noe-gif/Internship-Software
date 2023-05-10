export default function stringFromArrayOfObject(arrayToParse = [], keyToExtract = null) {
  if (!arrayToParse) {
    return '';
  }

  const arrayParsed = arrayToParse.map((element) => {
    if (element[keyToExtract]) {
      return `${element[keyToExtract]}`;
    } else {
      return '';
    }
  });

  const stringFromArray = arrayParsed.join('\n');

  return stringFromArray;
}

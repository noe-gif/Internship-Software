export default function parseDictionaryToArray(dataWithDictionaryType = {}) {
  const dataToArray = [];

  if (!dataWithDictionaryType) {
    return [];
  }

  Object.entries(dataWithDictionaryType).forEach((entry) => {
    dataToArray.push({ name: entry[0], value: entry[1] });
  });

  return dataToArray;
}

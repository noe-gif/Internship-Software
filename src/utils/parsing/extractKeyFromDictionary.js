import { ERROR_PARAMETER_NULL_PROVIDE } from 'src/errors/utils/parametersErrors';

export function extractKeyFromDictionary(key = '', dictionary = null) {
  if (!dictionary) {
    return '';
  }

  return dictionary[key];
}

export function checkIndexAndExtractFromArray(array = [], indexToExtract = null, emptyResponse = null) {
  if (!array) {
    return emptyResponse;
  }

  if (array[indexToExtract]) {
    return array[indexToExtract];
  } else {
    return emptyResponse;
  }
}

export function dictionaryArrayToKeyArray(array = [], keyToExtract) {
  try {
    return array.map((element) => element[keyToExtract]);
  } catch (error) {
    throw ERROR_PARAMETER_NULL_PROVIDE('dictionaryArrayToKeyArray');
  }
}

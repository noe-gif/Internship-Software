import { ERROR_PARAMETER_NULL_PROVIDE } from 'src/errors/utils/parametersErrors';

export default function removeDotFromString(stringToReplace) {
  try {
    const stringWithoutDot = stringToReplace.replace(/\./g, '');

    return stringWithoutDot;
  } catch (error) {
    throw ERROR_PARAMETER_NULL_PROVIDE('removeDotFromString');
  }
}

import { ERROR_PARAMETER_NULL_PROVIDE } from 'src/errors/utils/parametersErrors';

export default function compareArrayByKeyAndRemoveDeletedElement(arrayToUpdate, dataBasedArray, keyToCheck) {
  try {
    const dataBasedArrayKeyToCheckValues = dataBasedArray.map((element) => element[keyToCheck]);

    const updatedArray = arrayToUpdate.filter(
      (arrayToUpdateElement) => dataBasedArrayKeyToCheckValues.includes(arrayToUpdateElement[keyToCheck]),
    );

    return (updatedArray);
  } catch (error) {
    throw ERROR_PARAMETER_NULL_PROVIDE('compareArrayByKeyAndRemoveDeletedElement');
  }
}

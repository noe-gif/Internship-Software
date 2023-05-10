export const turnaroundDetailDictContainsId = (turnaroundDetail = null, id = null) => {
  if (!turnaroundDetail) {
    return false;
  } else {
    return turnaroundDetail.id === id;
  }
};

export const turnaroundCompleteInfoDictContainId = (turnaroundCompleteInfo = null, id = null) => {
  if (!turnaroundCompleteInfo) {
    return false;
  } else {
    return turnaroundCompleteInfo.turnaroundId === id;
  }
};

export function updateDictInArray(arrayToUpdate, dictChecker, updatedDict, keyToCheck) {
  const arrayToUpdateCopy = [...arrayToUpdate];

  const indexOfUpdatedDict = arrayToUpdate.findIndex(
    (dictToCheck) => dictChecker(dictToCheck, updatedDict[keyToCheck]),
  );

  if (indexOfUpdatedDict !== -1) {
    arrayToUpdateCopy[indexOfUpdatedDict] = updatedDict;
  }

  return arrayToUpdateCopy;
}

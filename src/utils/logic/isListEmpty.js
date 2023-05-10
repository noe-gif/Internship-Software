export default function isListEmpty(listToCheck = []) {
  return (!listToCheck ? true : listToCheck.length === 0);
}

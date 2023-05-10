export default function addInfoSaverHook(addInfoId, addInfoValue, updateAddInfo) {
  const isValidToUpdate = () => (addInfoValue !== null);

  const updateTaskAddInfo = () => {
    const addInfoCompleteData = {
      value: addInfoValue,
    };

    updateAddInfo({ data: addInfoCompleteData, addInfoId });
  };

  return {
    isValidToUpdate,
    updateTaskAddInfo,
  };
}

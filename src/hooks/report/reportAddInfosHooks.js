import { REPORT_ADD_INFO_CHECKBOX_VALID, REPORT_ADD_INFO_CHECKBOX_TYPE } from 'src/constants/report/reportConstant';

export default function reportAddInfosHooks(
  reportFreeForm,
  setReportFreeForm,
  turnaroundReportFormat,
  turnaroundCompleteInfos,
) {
  const fillCheckBoxField = () => {
    const freeFormsFromTurnaroundData = { ...turnaroundCompleteInfos.turnaroundInfos.close_information };

    turnaroundReportFormat.turnaroundReport.free_form_fields.forEach((field) => {
      if (
        field.field_type === REPORT_ADD_INFO_CHECKBOX_TYPE
        && !freeFormsFromTurnaroundData[field.field_name]
      ) {
        freeFormsFromTurnaroundData[field.field_name] = 'false';
      }
    });

    setReportFreeForm(freeFormsFromTurnaroundData);
  };

  const changeReportFreeForm = (event, keyToFill) => {
    event.preventDefault();

    const { target: { value } } = event;

    const newReportFreeForm = { ...reportFreeForm };

    newReportFreeForm[keyToFill] = `${value}`;

    setReportFreeForm(newReportFreeForm);
  };

  const changeReportFreeFormCheckbox = (event, keyToFill) => {
    event.preventDefault();

    const { target: { checked } } = event;

    const newReportFreeForm = { ...reportFreeForm };

    newReportFreeForm[keyToFill] = `${checked}`;

    setReportFreeForm(newReportFreeForm);
  };

  const checkAlreadyCompletedReport = (dataToCheck, fieldTitle, uncompletedValue) =>
    (
      dataToCheck ? dataToCheck[fieldTitle] : uncompletedValue
    );

  const checkAlreadyCompletedReportCheckbox = (dataToCheck, fieldTitle) =>
    (
      dataToCheck && dataToCheck[fieldTitle] ? dataToCheck[fieldTitle].includes(REPORT_ADD_INFO_CHECKBOX_VALID) : false
    );

  return {
    changeReportFreeForm,
    changeReportFreeFormCheckbox,
    checkAlreadyCompletedReport,
    checkAlreadyCompletedReportCheckbox,
    fillCheckBoxField,
  };
}

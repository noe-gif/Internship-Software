import parseDictionaryToArray from 'src/utils/parsing/parseDictionaryToArray';

export default function parseReportFormat(
  initialReportFormat = { free_form_fields: [], turnaround_fields: {}, turnaround_task_fields: {} },
) {
  if (!initialReportFormat) {
    return { free_form_fields: [], turnaround_fields: [], turnaround_task_fields: [] };
  }

  return {
    free_form_fields: initialReportFormat.free_form_fields,
    turnaround_fields: parseDictionaryToArray(initialReportFormat.turnaround_fields),
    turnaround_task_fields: parseDictionaryToArray(initialReportFormat.turnaround_task_fields),
  };
}

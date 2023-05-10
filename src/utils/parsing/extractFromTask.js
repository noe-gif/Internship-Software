import { ERROR_PARAMETER_NULL_PROVIDE } from 'src/errors/utils/parametersErrors';

export function extractTimingsFromTask(task) {
  try {
    return {
      actualEndDatetime: task.actual_end_datetime,
      actualStartDatetime: task.actual_start_datetime,
      plannedStartDatetime: task.planned_start_datetime,
      plannedEndDatetime: task.planned_end_datetime,
      status: task.status,
    };
  } catch (error) {
    throw ERROR_PARAMETER_NULL_PROVIDE('extractTimingsFromTask');
  }
}

export function extractStatusFromTask(task) {
  try {
    return {
      status: task.status,
      statusColor: task.status_color,
    };
  } catch (error) {
    throw ERROR_PARAMETER_NULL_PROVIDE('extractStatusFromTask');
  }
}

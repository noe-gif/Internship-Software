import {
  IN_PROGRESS,
  DID_NOT_START,
  COMPLETED,
  NOT_APPLICABLE,
} from '../../../types/TaskStatus';

export function filterTaskInProgressStatus(tasks) {
  return tasks ? tasks.filter((task) => task.status === IN_PROGRESS) : [];
}

export function filterTaskDidNotStartStatus(tasks) {
  return tasks ? tasks.filter((task) => task.status === DID_NOT_START) : [];
}

export function filterTaskCompletedStatus(tasks) {
  return tasks ? tasks.filter((task) => task.status.includes(COMPLETED)) : [];
}

export function filterTaskNotApplicableStatus(tasks) {
  return tasks ? tasks.filter((task) => task.status === NOT_APPLICABLE) : [];
}

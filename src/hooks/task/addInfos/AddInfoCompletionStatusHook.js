import {
  COMPLETION_STATUS_LARGE_VIEW_CLASSNAME,
  COMPLETION_STATUS_SMALL_VIEW_CLASSNAME,
  DISPLAY_TASK_COMPLETION_STATUS,
  HIDE_TASK_COMPLETION_STATUS,
} from 'src/constants/tasks/tasksConstant';
import TURNAROUND_DETAIL_TEXT from 'src/constants/turnaroundDetail/turnaroundDetailText.json';

export default function AddInfoCompletionStatusHook(
  componentSize,
  task,
) {
  const hideCompletionStatusIfNotNeeded = () => (
    task.is_applicable && task?.task_additional_information.length !== 0
      ? DISPLAY_TASK_COMPLETION_STATUS
      : HIDE_TASK_COMPLETION_STATUS
  );

  const isComponentSizeInLargeView = () => (
    componentSize === TURNAROUND_DETAIL_TEXT.componentSize.large
      ? COMPLETION_STATUS_SMALL_VIEW_CLASSNAME
      : COMPLETION_STATUS_LARGE_VIEW_CLASSNAME
  );

  return {
    hideCompletionStatusIfNotNeeded,
    isComponentSizeInLargeView,
  };
}

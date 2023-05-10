import { TASK_IMAGE_PATH } from 'src/utils/urlAPIs';

const pngImageQuality = '@3x';

const extractCompleteTaskUrl = (task) => `${TASK_IMAGE_PATH}${task}${pngImageQuality}.png`;

export default function getTaskToPngFormat(taskName) {
  if (!taskName) {
    return null;
  }
  const pngSeparator = '_';

  const replaceTaskName = taskName.toLowerCase().replace(/ /g, pngSeparator).replace(/-/g, pngSeparator);

  return (extractCompleteTaskUrl(replaceTaskName));
}

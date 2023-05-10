import timingDifferenceInMinutes from 'src/utils/logic/tasks/extractActualTiming';

export default function provideTimeDifference(basedTiming, timingToCompare, emptyValue) {
  return ((basedTiming && timingToCompare) ? timingDifferenceInMinutes(basedTiming, timingToCompare) : emptyValue);
}

import dateStringToUTCDate from 'src/utils/logic/date/dateStringToUTCDate';

export default function timingDifferenceInMinutes(plannedTimingString, actualTimingString) {
  if (!plannedTimingString || !actualTimingString) {
    return null;
  }

  const plannedDate = dateStringToUTCDate(plannedTimingString);
  const actualDate = dateStringToUTCDate(actualTimingString);

  const timeDifference = plannedDate.getTime() - actualDate.getTime();

  let differenceTiming = Math.abs(timeDifference / 1000 / 60);

  differenceTiming = Math.round(differenceTiming);

  if (timeDifference > 0) {
    return `-${differenceTiming}min`;
  } else {
    return `+${differenceTiming}min`;
  }
}

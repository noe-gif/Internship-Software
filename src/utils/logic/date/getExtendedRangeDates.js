export default function getExtendedRangeDates(dates) {
  if (!dates || dates.length < 1) {
    return ([new Date()]);
  }

  const extendedDates = [
    new Date(new Date(new Date(dates[0])).setDate(dates[0].getDate() - 1)),
    new Date(new Date(new Date(dates[dates.length - 1])).setDate(dates[dates.length - 1].getDate() + 1)),
  ];

  return extendedDates;
}

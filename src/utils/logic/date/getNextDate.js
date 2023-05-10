export default function getNextDate(date) {
  if (!date) {
    return new Date();
  }

  const newDate = new Date(date);

  return new Date(newDate.setDate(newDate.getDate() + 1));
}

export default function extractTurnaroundReportFormat(turnaroundFormats, turnaroundId) {
  if (!turnaroundFormats || !turnaroundId) {
    return null;
  }

  const filteredTurnaroundFormat = turnaroundFormats.filter((reportFormat) =>
    reportFormat.turnaroundId === turnaroundId);

  if (filteredTurnaroundFormat.length === 0) {
    return null;
  }

  return filteredTurnaroundFormat[0];
}

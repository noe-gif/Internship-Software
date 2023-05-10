export function calculateValueOfPercentage(value, percentage) {
  if (value < 0) return null;

  if (value === null || percentage === null) return null;

  return value * percentage;
}

export default function turnaroundsListWidthOnTurnaroundSelected() {
  return calculateValueOfPercentage(window.innerWidth, 0.33);
}

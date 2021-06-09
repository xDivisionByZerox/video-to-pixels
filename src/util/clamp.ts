export function clamp({ min, value, max }: {
  min: number,
  value: number,
  max: number,
}): number {
  return Math.max(min, Math.min(value, max));
}
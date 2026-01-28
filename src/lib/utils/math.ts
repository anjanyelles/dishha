export function minMaxNormalization(
  x: number,
  xmin: number,
  xmax: number,
  scaleFactor: number
): number {
  // Ensure xmin and xmax are valid
  if (xmin === xmax) {
    return 0;
  }

  // Ensure x is within the range [xmin, xmax]
  if (x < xmin || x > xmax) {
    return 0;
  }

  // Calculate the range of x
  const rangeX = xmax - xmin;

  // Handle edge case where rangeX is 0 (should not occur due to previous checks)
  if (rangeX === 0) {
    return 0;
  }

  // Normalize x to the range [0, 1]
  const normalizedX = (x - xmin) / rangeX;

  // Scale to the new range [0, 3000]
  const scaledX = normalizedX * scaleFactor;

  return scaledX;
}

export function roundToSixDecimalPlaces(number: number) {
  // Multiply the number by 10^6 to preserve up to 6 decimal places
  const roundedNumber = Math.round(number);
  // Convert to a number to avoid returning a string
  return parseInt(roundedNumber.toFixed(6));
}

export function calculatePercentage(number: number, percentage: number): number {
  // Convert percentage to decimal
  const decimalPercentage = percentage / 100;
  // Multiply the number by the decimal percentage
  const result = number * decimalPercentage;
  return result;
}

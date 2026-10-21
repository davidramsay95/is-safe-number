const isSafeValue = (value) =>
  typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;

const isSafeNumber = (...values) => values.length > 0 && values.every(isSafeValue);

// A zero divisor yields Infinity or NaN, so it is rejected on top of the safe-number check.
export const isSafeDivisor = (...values) => isSafeNumber(...values) && values.every((value) => value !== 0);

export default isSafeNumber;

import { test } from 'node:test';
import assert from 'node:assert/strict';
import isSafeNumber, { isSafeDivisor } from './index.js';

test('exports functions', () => {
  assert.equal(typeof isSafeNumber, 'function');
  assert.equal(typeof isSafeDivisor, 'function');
});

test('returns true for ordinary numbers', () => {
  assert.equal(isSafeNumber(1), true);
  assert.equal(isSafeNumber(-1), true);
  assert.equal(isSafeNumber(0), true);
  assert.equal(isSafeNumber(-0), true);
  assert.equal(isSafeNumber(1.5), true);
  assert.equal(isSafeNumber(-3.25), true);
});

test('returns true at the safe integer boundaries', () => {
  assert.equal(isSafeNumber(Number.MAX_SAFE_INTEGER), true);
  assert.equal(isSafeNumber(Number.MIN_SAFE_INTEGER), true);
});

test('returns false beyond the safe integer boundaries', () => {
  assert.equal(isSafeNumber(Number.MAX_SAFE_INTEGER + 1), false);
  assert.equal(isSafeNumber(Number.MIN_SAFE_INTEGER - 1), false);
  assert.equal(isSafeNumber(Number.MAX_VALUE), false);
  assert.equal(isSafeNumber(-Number.MAX_VALUE), false);
  assert.equal(isSafeNumber(1e300), false);
});

test('returns false for NaN and Infinity', () => {
  assert.equal(isSafeNumber(NaN), false);
  assert.equal(isSafeNumber(Infinity), false);
  assert.equal(isSafeNumber(-Infinity), false);
});

test('returns false for non-number types', () => {
  assert.equal(isSafeNumber('1'), false);
  assert.equal(isSafeNumber(''), false);
  assert.equal(isSafeNumber(null), false);
  assert.equal(isSafeNumber(undefined), false);
  assert.equal(isSafeNumber(true), false);
  assert.equal(isSafeNumber(10n), false);
  assert.equal(isSafeNumber({}), false);
  assert.equal(isSafeNumber([]), false);
  assert.equal(isSafeNumber([1]), false);
  assert.equal(isSafeNumber(Symbol('1')), false);
  assert.equal(isSafeNumber(() => 1), false);
});

test('returns false for boxed Number objects', () => {
  assert.equal(isSafeNumber(new Number(1)), false);
});

test('checks every input and returns true only when all are safe', () => {
  assert.equal(isSafeNumber(1, 2, 3), true);
  assert.equal(isSafeNumber(3, 0), true);
  assert.equal(isSafeNumber(1, 2, NaN), false);
  assert.equal(isSafeNumber(1, '2'), false);
  assert.equal(isSafeNumber(Number.MAX_SAFE_INTEGER + 1, 1), false);
  assert.equal(isSafeNumber(1, undefined), false);
});

test('returns false when called with no inputs', () => {
  assert.equal(isSafeNumber(), false);
});

test('always returns a boolean', () => {
  assert.equal(typeof isSafeNumber(1), 'boolean');
  assert.equal(typeof isSafeNumber('1'), 'boolean');
  assert.equal(typeof isSafeDivisor(1), 'boolean');
  assert.equal(typeof isSafeDivisor(0), 'boolean');
});

test('isSafeDivisor returns true for safe non-zero numbers', () => {
  assert.equal(isSafeDivisor(1), true);
  assert.equal(isSafeDivisor(-3), true);
  assert.equal(isSafeDivisor(0.5), true);
  assert.equal(isSafeDivisor(Number.MAX_SAFE_INTEGER), true);
});

test('isSafeDivisor returns false for zero and negative zero', () => {
  assert.equal(isSafeDivisor(0), false);
  assert.equal(isSafeDivisor(-0), false);
});

test('isSafeDivisor returns false for unsafe inputs', () => {
  assert.equal(isSafeDivisor(NaN), false);
  assert.equal(isSafeDivisor(Infinity), false);
  assert.equal(isSafeDivisor(Number.MAX_SAFE_INTEGER + 1), false);
  assert.equal(isSafeDivisor('3'), false);
  assert.equal(isSafeDivisor(null), false);
  assert.equal(isSafeDivisor(), false);
});

test('isSafeDivisor checks every input', () => {
  assert.equal(isSafeDivisor(2, 3, 4), true);
  assert.equal(isSafeDivisor(2, 0), false);
  assert.equal(isSafeDivisor(2, NaN), false);
});

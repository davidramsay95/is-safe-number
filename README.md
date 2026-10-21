# is-safe-number

Returns `true` if every input is a number that is safe to compute with: a primitive number, finite, and within the safe integer range.

It validates the inputs of [`is-nodd`](https://github.com/davidramsay95/is-nodd) and [`is-throdd`](https://github.com/davidramsay95/is-throdd), and through them [`is-neven`](https://github.com/davidramsay95/is-neven) and [`is-threeven`](https://github.com/davidramsay95/is-threeven).

## Install

```sh
npm install is-safe-number
```

## Usage

This package is ESM only.

```js
import isSafeNumber, { isSafeDivisor } from 'is-safe-number';

isSafeNumber(42); // true
isSafeNumber(1.5, -3, 0); // true
isSafeNumber('42'); // false
isSafeNumber(NaN); // false
isSafeNumber(Number.MAX_SAFE_INTEGER + 1); // false

isSafeDivisor(3); // true
isSafeDivisor(0); // false
```

## Behavior

`isSafeNumber(...values)` returns `true` only when every value passes all of these checks:

- It is a primitive `number`. Numeric strings, `null`, `undefined`, booleans, `bigint` and boxed `Number` objects are rejected.
- It is finite. `NaN`, `Infinity` and `-Infinity` are rejected.
- Its absolute value is at most `Number.MAX_SAFE_INTEGER` (2^53 - 1). Larger values such as `1e300` or `Number.MAX_VALUE` are rejected because arithmetic on them loses precision or overflows.

With no inputs it returns `false`, since there is nothing to vouch for.

Non-integers such as `1.5` are safe. `0` and `-0` are safe numbers.

`isSafeDivisor(...values)` applies the same checks and additionally rejects `0` and `-0`, because dividing by zero yields `Infinity` or `NaN`.

## Development

Tests use the built-in Node.js test runner. No dependencies are required.

```sh
npm test
```

## Publishing

Only `index.js`, `package.json`, `README.md` and `LICENSE` are included in the package tarball. Verify with:

```sh
npm pack --dry-run
```

## License

[MIT](LICENSE)

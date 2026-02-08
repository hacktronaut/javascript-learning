
# JavaScript Numbers

This guide covers how numbers work in JavaScript, including their types, representations, common operations, and important caveats.

---

## 1. Number Types in JavaScript

- **Number**: The standard numeric type, stored in 64-bit IEEE-754 double-precision floating point format. Used for most calculations.
- **BigInt**: Represents integers of arbitrary length. Use BigInt when you need to work with numbers larger than $2^{53} - 1$ or less than $-(2^{53} - 1)$.

---

## 2. Writing Numbers

### Readable Numbers
```js
let billion = 1000000000;
let billionReadable = 1_000_000_000; // Underscores improve readability
```

### Exponential Notation
```js
let billionExp = 1e9; // 1 and 9 zeroes
console.log(7.3e9); // 7300000000
```

---

## 3. Numeric Bases

### Hexadecimal, Binary, and Octal
```js
console.log(0xff); // Hexadecimal (255)
let a = 0b11111111; // Binary (255)
let b = 0o377;      // Octal (255)
console.log(a === b); // true
```

---

## 4. Number Conversion and Representation

### toString(base)
Convert a number to a string in a given base:
```js
let num = 255;
console.log(num.toString(16)); // 'ff'
console.log(num.toString(2));  // '11111111'
console.log(num.toString(36)); // '73'
```

**Common bases:**
- 16: Hex colors, encodings
- 2: Bitwise debugging
- 36: Short URLs, compact IDs

#### Note: Two Dots for Methods
To call a method directly on a number literal, use two dots:
```js
console.log(123456..toString(36));
// or
console.log((123456).toString(36));
```

---

## 5. Rounding Numbers

JavaScript provides several rounding methods:

- `Math.floor(x)`: Rounds down
- `Math.ceil(x)`: Rounds up
- `Math.round(x)`: Rounds to nearest integer
- `Math.trunc(x)`: Removes decimal part

**Rounding to N decimals:**
```js
let num = 1.23456;
let rounded = Math.round(num * 100) / 100; // 2 decimals
console.log(rounded); // 1.23
```
Or use `toFixed`:
```js
let num2 = 12.34;
console.log(num2.toFixed(1)); // '12.3' (returns a string)
```

---

## 6. Imprecise Calculations and Precision Limits

JavaScript numbers are subject to floating-point precision errors:
```js
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
```

**Why?**
Numbers like 0.1 and 0.2 cannot be represented exactly in binary, leading to small errors.

**Solution:**
Round results when needed:
```js
let sum = 0.1 + 0.2;
console.log(sum.toFixed(2)); // '0.30'
```

### Large Numbers and BigInt
```js
console.log(9999999999999999); // 10000000000000000 (precision lost)
console.log(BigInt("9999999999999999")); // 9999999999999999n (exact)
```

---

## 7. Special Numeric Values

- `Infinity`: Result of overflow (e.g., 1e500)
- `NaN`: Not-a-Number, result of invalid operations

**Checking values:**
```js
console.log(isNaN(NaN)); // true
console.log(isNaN("str")); // true
console.log(isFinite(123)); // true
console.log(isFinite("str")); // false
// Strict checks:
console.log(Number.isNaN(NaN)); // true
console.log(Number.isFinite(123)); // true
```

---

## 8. Parsing Numbers from Strings

**Strict conversion:**
```js
Number("100px"); // NaN
```

**Flexible parsing:**
```js
console.log(parseInt("100px")); // 100
console.log(parseFloat("12.5em")); // 12.5
```

---

## 9. Math Object Functions

JavaScript's `Math` object provides useful functions:

- `Math.random()`: Random number between 0 and 1 (not including 1)
- `Math.max(a, b, ...)` / `Math.min(a, b, ...)`: Largest/smallest value
- `Math.abs(x)`: Absolute value
- `Math.pow(x, y)`: x to the power of y

```js
console.log(Math.random());
console.log(Math.max(1, 5, 10));
console.log(Math.min(-1, 0, 1));
console.log(Math.abs(-42));
console.log(Math.pow(2, 3)); // 8
```

---

## 10. Summary

- JavaScript numbers are powerful but have precision limits.
- Use BigInt for very large integers.
- Always be aware of floating-point errors and round results when needed.
- Use parsing and Math functions for robust number handling.



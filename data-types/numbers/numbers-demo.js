let billion = 1000_000_000;

console.log(billion); // 1000000000

let billion2 = 1e9;  // 1 billion, literally: 1 and 9 zeroes

console.log( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)

let mcs = 0.000_001; // microsecond

console.log(mcs); // 0.000001

//Just like before, using "e" can help. If we’d like to avoid writing the zeroes explicitly, we could write the same as:


let mcs2 = 1e-6; // five zeroes to the left from 1

console.log(mcs2); // 0.000001

console.log(0xff);
console.log( 0xFF ); // 255 (the same, case doesn't matter)

let a = 0b11111111;
let b = 0o377;

console.log(a == b);

//Ideally it is recommended to use parseInt() to convert strings to numbers, as it provides more control and can handle different numeral systems. However, the unary plus operator can be a quick and concise way to convert a string to a number when you are sure that the string is a valid numeric value.


let num = 255;

console.log(num.toString(16));
console.log(num.toString(10));
console.log(num.toString(2));

//The base can vary. But by default it is 10, so if we want to convert a number to a string, we can simply call toString() without an argument:

console.log(num.toString()); // "255"

console.log(123456..toString(36));


let num2 = 12.34;
console.log(num2.toFixed(1)) // 12.3

console.log(0.1 + 0.2); // false

console.log(1e500)
console.log(2e3);

/**
 * What may be a little less obvious, but happens quite often, is the loss of precision.

Consider this (falsy!) equality test:
 */

console.log(0.1 + 0.2 == 0.3); // false

console.log(BigInt("9999999999999999"))// Always use double quotes for BigInt literals, otherwise it may be interpreted as a decimal number and lose precision.


console.log(parseInt('100px'));

console.log(parseFloat('12.5em'));

console.log(parseFloat('12'));

console.log(parseFloat('a12'));

console.log(Math.random().toFixed(1) * 10); // Generates a random number between 0 and 1, and formats it to 2 decimal places.
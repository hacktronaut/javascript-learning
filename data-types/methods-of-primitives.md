
# JavaScript Primitives and Object Wrappers

JavaScript allows us to work with **primitives** (like strings, numbers, etc.) as if they were objects, providing methods and properties. However, primitives are not objects. This note explains how this works and why it matters.

---

## 1. Primitive Types in JavaScript

A **primitive** is a value of a primitive type. There are 7 primitive types in JavaScript:

- **string**
- **number**
- **bigint**
- **boolean**
- **symbol**
- **null**
- **undefined**

---

## 2. Objects in JavaScript

An **object** can store multiple values as properties. Objects are created using `{}` or other constructors (e.g., `new Object()`).

Objects can also store functions as properties (methods):

```js
let john = {
    name: "John",
    sayHi: function() {
        console.log("Hi Buddy!");
    }
};
console.log(john);
```

Many built-in objects exist, such as those for working with dates, errors, HTML elements, etc. These objects have their own properties and methods.

**Note:** Objects are heavier than primitives and require more resources to support their internal machinery.

---

## 3. Primitives as Objects (Object Wrappers)

Although primitives are not objects, JavaScript allows us to use methods and properties on them. For example:

```js
let str = "hello";
console.log(str.toUpperCase()); // "HELLO"
```

**How does this work?**

- When you access a property or method on a primitive, JavaScript automatically creates a special **object wrapper** (e.g., `String`, `Number`, `Boolean`, `Symbol`, `BigInt`) that provides the extra functionality.
- This wrapper object is created temporarily and destroyed immediately after use.
- This allows primitives to remain lightweight and fast, while still providing useful methods.

**Note:** The JavaScript engine optimizes this process and may skip creating the extra object, but it must behave as if it does.

---

## 4. Constructors and Type Conversion

Some languages (like Java) allow explicit wrapper objects for primitives (e.g., `new Number(1)`). In JavaScript, this is possible but **strongly discouraged**:

```js
alert(typeof 0); // "number"
alert(typeof new Number(0)); // "object" (not a primitive!)

let zero = new Number(0);
if (zero) {
    console.log("Zero is truthy!?"); // This will run, because objects are always truthy
}
```

**Why avoid this?**
- Objects are always truthy, which can lead to unexpected behavior.
- Using `new Number`, `new Boolean`, etc., creates objects, not primitives.

**Correct usage:**

Use `String()`, `Number()`, or `Boolean()` **without** `new` to convert values to the corresponding primitive type:

```js
let num = Number("123"); // Converts string to number (primitive)
```

---

## 5. Special Cases: `null` and `undefined`

The primitives `null` and `undefined` **do not** have corresponding wrapper objects and provide **no methods**. They are the most primitive values in JavaScript.

Attempting to access a property or method on them results in an error:

```js
console.log(null.test); // Error: Cannot read property 'test' of null
```

---

## Summary

- Primitives are simple, lightweight values.
- JavaScript allows temporary object wrappers for primitives (except `null` and `undefined`) to provide methods and properties.
- Avoid using `new Number()`, `new Boolean()`, etc.—use the functions without `new` for type conversion.
- Objects are always truthy, primitives are not.
# JavaScript Objects - Complete Guide

## Table of Contents
1. [Introduction to Objects](#introduction-to-objects)
2. [Creating Objects](#creating-objects)
3. [Accessing Properties](#accessing-properties)
4. [Object Methods and "this"](#object-methods-and-this)
5. [Object References and Copying](#object-references-and-copying)
6. [Cloning Objects](#cloning-objects)
7. [Constructors and the "new" Operator](#constructors-and-the-new-operator)
8. [Garbage Collection](#garbage-collection)
9. [Symbols](#symbols)
10. [Summary](#summary)

---

## Introduction to Objects

There are total 8 data types in JavaScript. Seven of them are called "Primitive" because their values contain only a single thing.

In contrast, **objects** are used to store keyed collections of various data and more complex entities. In JavaScript, objects penetrate almost every aspect of the language. So we must understand them first before going in-depth anywhere else.

An object can be created with figure brackets `{}` with an optional list of properties. A property is a **key:value** pair, where key is a string and value can be anything.

### Example:
```javascript
let user = {
    name: "John",
    age: 30
}

console.log(user.name); // "John"
```

---

## Creating Objects

There are two ways to create an object:

### 1. Object Constructor
```javascript
let obj1 = new Object();
```

### 2. Object Literal Syntax (Preferred)
```javascript
let obj2 = {}; // Empty object
```

### Adding Properties
```javascript
let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete"; // Modifying existing property
delete user.name; // Removing a property
```

### Multi-word Properties

We can use multi-word property names, but they must be quoted:

```javascript
let user = {
    name: "John",
    "like games": true // Must be quoted
}
```

**Note:** Without quotes, it will throw an error.

---

## Accessing Properties

### Dot Notation
```javascript
let user = {
    name: "John",
    age: 30
}

console.log(user.name); // "John"
console.log(user.age);  // 30
```

### Square Bracket Notation

Square brackets are much more powerful than dot notation. They allow any property names and variables. But they are also more cumbersome to write.

```javascript
let user = {
    name: "John",
    "like games": true
}

console.log(user["like games"]); // true - required for multi-word keys
console.log(user["name"]); // "John" - also works for simple keys
```

**When to use which:**
- Use **dot notation** when property names are known and simple
- Use **square brackets** when you need something more complex (multi-word keys, dynamic property names, or variables)

### Checking if Property Exists

We can use the `in` operator to check if a key exists in an object:

```javascript
let user = {
    name: "John",
    age: 30
}

console.log("name" in user); // true
console.log("surname" in user); // false
```

### Iterating Over Properties

Use `for...in` loop to iterate over all properties:

```javascript
let user = {
    name: "John",
    age: 30,
    "like games": true
}

for (let key in user) {
    console.log(key); // name, age, like games
    console.log(user[key]); // John, 30, true
}
```

### Property Value Shorthand

When property names match variable names, you can use shorthand:

```javascript
function makeUser(name, age) {
    return {
        name,  // same as name: name
        age    // same as age: age
    }
}

console.log(makeUser("Kirito", 30)); // { name: "Kirito", age: 30 }
```

---

## Object Methods and "this"

Objects are usually created to represent entities of the real world, like users, orders, etc. In the real world, a user can act: select something from the shopping cart, login, logout, etc.

Actions are represented in JavaScript by **functions in properties**, which are called **methods**.

### Defining Methods

There are two ways to assign functions to object properties:

#### Method 1: Function Expression
```javascript
let user = {
    name: "John",
    age: 30,
    sayHello: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

user.sayHello(); // "Hello, my name is John"
```

#### Method 2: Method Shorthand (Preferred)
```javascript
let user = {
    name: "John",
    age: 30,
    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

user.sayHello(); // "Hello, my name is John"
```

### Understanding "this"

The value of `this` is the object "before the dot", the one used to call the method.

```javascript
let user = {
    name: "John",
    sayHi() {
        console.log(this.name);
    }
}

user.sayHi(); // "John" - this refers to user
```

**Important:** The value of `this` is defined at **run-time**, not when the function is declared. When a function is declared, it may use `this`, but that `this` has no value until the function is called.

```javascript
let user2 = {name: "Pete"};
let admin = {name: "Admin"};

function sayHi() {
    console.log(this.name);
}

user2.f = sayHi;
admin.f = sayHi; 

user2.f();  // "Pete" - this is user2
admin.f();  // "Admin" - this is admin
```

**The rule is simple:** If `obj.f()` is called, then `this` is `obj` during the call of `f`.

**Note:** In other programming languages like Java, the value of `this` is determined by the calling object. But in JavaScript, the value of `this` is determined by the function call and determined at run time.

### Arrow Functions Have No "this"

Arrow functions are special: they don't have their own `this`. If we reference `this` from such a function, it's taken from the outer "normal" function.

```javascript
let user = {
    name: "John",
    sayHi() {
        let arrow = () => console.log(this.name); // this is taken from the outer normal function
        arrow();
    }
}

user.sayHi(); // "John"
```

That's a special feature of arrow functions, it's useful when we actually do not want to have a separate `this`, but rather to take it from the outer context.

### Method Chaining

Methods can return `this` to enable chaining:

```javascript
let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep() {
        console.log(this.step);
        return this;
    }
};

ladder.up().up().up().down().showStep().down().showStep();
// Output: 2, then 1
```

### Practical Example: Calculator

```javascript
let calculator = {
    a: 0,
    b: 0,
    read(a, b) {
        this.a = a;
        this.b = b;
    },
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    }
}

calculator.read(3, 4);
console.log(calculator.sum()); // 7
console.log(calculator.mul()); // 12
```

---

## Object References and Copying

One of the fundamental differences of objects versus primitives is that **objects are stored and copied "by reference"**, whereas primitive values (strings, numbers, booleans, etc.) are always copied "as a whole value".

### Primitives are Copied by Value

```javascript
let message = "Hello!";
let phrase = message;

// As a result we have two independent variables, each one storing the string "Hello!"
```

### Objects are Copied by Reference

A variable assigned to an object stores not the object itself, but its **"address in memory"** – in other words **"a reference"** to it.

```javascript
let user2 = {name: "John"};
let admin = user2;
admin.name = "Pete";

console.log(user2.name); // "Pete" - both variables reference the same object!
```

Basically, the object is stored somewhere in the memory and the variable stores the reference to it. Also, the assignment operator does not copy the value; instead it copies the reference, so both will be pointing to the same location.

### Comparison by Reference

Two objects are equal only if they are the same object.

```javascript
let a = {};
let b = a;

console.log(a == b);  // true
console.log(a === b); // true - same object

// But this will be false because c and d are not the same object
let c = {};
let d = {};
console.log(c == d);  // false
console.log(c === d); // false - different objects
```

### Const Objects Can Be Modified

**Very important concept:** Const objects can be modified. Ideally, constant variables cannot be reassigned with new values. But when it comes to objects, its properties can be modified, but the variable reference cannot be changed.

```javascript
const user = {
    name: "john"
}

user.name = "Pete"; // ✅ Allowed - modifying property
console.log(user.name); // "Pete"

// user = {}; // ❌ Error - cannot reassign the reference
```

---

## Cloning Objects

So, copying an object variable creates one more reference to the same object. But what if we need to duplicate an object?

### Shallow Cloning with Loop

We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.

```javascript
let myObj = {
    name: "John",
    age: 30
}

let clone = {};

for(let key in myObj) {
    clone[key] = myObj[key];
}

clone.name = "Pete";

console.log(clone); // { name: "Pete", age: 30 }
console.log(myObj); // { name: "John", age: 30 } - original unchanged
```

### Using Object.assign()

The `Object.assign()` method copies all enumerable own properties from one or more source objects to a target object.

**Syntax:** `Object.assign(dest, ...sources)`

The first argument is the destination, and further arguments are a list of source objects.

```javascript
let user = {fullName: "Kirito Kazuto"};
let permissions = {canView: true};
let permissions2 = {canEdit: true};

Object.assign(user, permissions, permissions2);
console.log(user); // { fullName: "Kirito Kazuto", canView: true, canEdit: true }
```

**Cloning with Object.assign():**

```javascript
let user2 = {name: "John", age: 30};
let newUser = Object.assign({}, user2);

console.log(newUser); // { name: "John", age: 30 }
console.log(newUser === user2); // false - different objects
```

### Shallow Copy Limitation

Until now we thought all the properties are primitive, but properties can be referencing other objects as well:

```javascript
let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50
    }
};

let newUser = Object.assign({}, user);
newUser.sizes.height = 190;

console.log(user.sizes.height);    // 190 - original changed!
console.log(newUser.sizes.height); // 190
```

**Problem:** `Object.assign()` only does a **shallow copy**. Nested objects are still copied by reference.

### Deep Cloning with structuredClone()

To fix that and make user and clone truly separate objects, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. This is called **deep cloning** or **structured cloning**.

There is a `structuredClone()` method that implements deep cloning:

```javascript
let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50
    }
};

let clone = structuredClone(user);

clone.sizes.width = 60;

console.log(user.sizes.width);  // 50 - original unchanged
console.log(clone.sizes.width); // 60 - clone has independent copy
```

The structured clone copies the entire properties of the objects, including nested objects.

**Limitation:** `structuredClone()` fails with functions:

```javascript
// Error - structuredClone cannot clone functions
structuredClone({
  f: function() {}
});
```

To handle such complex cases, we may need to use a combination of cloning methods, write custom code, or use an existing implementation, for instance `_.cloneDeep(obj)` from the JavaScript library lodash.

---

## Constructors and the "new" Operator

The regular `{...}` allows us to create one object, but often we need to create many similar objects like multiple users or menu items and so on.

This can be done using **constructor functions** and the **`new` operator**.

### Constructor Function

Constructor functions are the functions that are used to create new objects. They have the same name as the object but start with an upper case letter.

They are technically regular functions, but:
- They are named with capital letter first
- They should be executed only with `"new"` operator

### How "new" Works

When a function is executed with `new`, it does the following steps:

1. A new empty object is created and assigned to `this`
2. The function body executes. Usually it modifies `this`, adds new properties to it
3. The value of `this` is returned

**Example:**

```javascript
function User(name, age) {
    // this = {};  (implicitly)
    
    // add properties to this
    this.name = name;
    this.age = age;
    
    // return this;  (implicitly)
}

let user = new User("Kirito", 30);
console.log(user.name); // "Kirito"
console.log(user.age);  // 30
```

In other words, `new User()` does something like this:

```javascript
function User(name) {
    // this = {};  (implicitly)
    
    // add properties to this
    this.name = name;
    this.isAdmin = false;
    
    // return this;  (implicitly)
}
```

**Note:** `let user = new User()` is similar to `let user = new User;` (parentheses can be omitted if no arguments).

### Constructor Mode Test: new.target

Inside a function, we can check whether it was called with `new` or without it, using a special `new.target` property.

```javascript
function User(name) {
    console.log(new.target);
}

User();        // undefined - called without new
new User();    // [Function: User] - called with new
```

### Return from Constructors

Usually, constructors do not have a return statement. Their task is to write all necessary stuff into `this`, and it automatically becomes the result.

But if there is a return statement, then the rule is simple:

- If `return` is called with an **object**, then the object is returned instead of `this`
- If `return` is called with a **primitive**, it's ignored

**Example:**

```javascript
// Two functions - one object
let obj = {};

function A() {
    return obj;
}

function B() {
    return obj;
}

let a = new A();
let b = new B();

console.log(a === b); // true - both return the same object
```

### Practical Example: Accumulator

```javascript
function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function(number) {
        this.value += number;
    }
}

let accumulator = new Accumulator(1);
accumulator.read(2);
accumulator.read(3);

console.log(accumulator.value); // 6
```

**Note:** Classes are used to create complex objects (modern approach, but constructors are still important to understand).

---

## Garbage Collection

Memory management in JavaScript is performed automatically and invisibly to us. We create primitives, objects, functions… All that takes memory.

What happens when something is not needed anymore? How does the JavaScript engine discover it and clean it up?

### Reachability

The main concept of memory management in JavaScript is **reachability**.

Simply put, **"reachable" values** are those that are accessible or usable somehow. They are guaranteed to be stored in memory.

There's a base set of inherently reachable values, that cannot be deleted for obvious reasons:

- The currently executing function, its local variables and parameters
- Other functions on the current chain of nested calls, their local variables and parameters
- Global variables
- (there are some other, internal ones as well)

These values are called **roots**.

Any other value is considered reachable if it's reachable from a root by a reference or by a chain of references.

For instance, if there's an object in a global variable, and that object has a property referencing another object, that object is considered reachable. And those that it references are also reachable.

### Garbage Collector

There's a background process in the JavaScript engine that is called **garbage collector**. It monitors all objects and removes those that have become unreachable.

### Internal Algorithms

The basic garbage collection algorithm is called **"Mark and Sweep"**.

**The main things to know:**

- Garbage collection is performed automatically. We cannot force or prevent it
- Objects are retained in memory while they are reachable
- Being referenced is not the same as being reachable (from a root): a pack of interlinked objects can become unreachable as a whole

---

## Symbols

By specification, only two primitive types may serve as object property keys:

1. **string** type, or
2. **symbol** type

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

### What are Symbols?

**Symbols** represent a unique identifier. A value of this type can be created using `Symbol()`.

### Creating Symbols

```javascript
// Create a symbol without description
let id = Symbol();

// Create a symbol with description (for debugging)
let id2 = Symbol("id");

console.log(id);              // Symbol()
console.log(id2.toString());  // "Symbol(id)"
```

**Important:** Even if two symbols have the same description, they are different values:

```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2); // false - they are different!
```

### Symbols as Object Properties

Symbols can be used as hidden properties of an object. This is useful when you want to add new properties to an existing library or object without risking name collisions.

```javascript
let user = {
    name: "John",
    age: 30
};

// Add a symbol property
let id = Symbol("id");
user[id] = "ID12345";

console.log(user[id]); // "ID12345"
console.log(user.name); // "John"
```

### Symbols are Hidden in Iteration

**Important:** Symbols are skipped in `for...in` loops:

```javascript
let user = {
    name: "John",
    age: 30
};

let id = Symbol("id");
user[id] = "ID12345";

// Symbols are not visible in for...in
for (let key in user) {
    console.log(key); // "name", "age" - id is not shown!
}

// But we can still access it directly
console.log(user[id]); // "ID12345"
```

### Use Cases for Symbols

1. **Hidden Properties:** Add properties to objects that won't be accidentally accessed or overwritten
2. **Avoiding Name Collisions:** When working with third-party libraries, symbols ensure your properties won't conflict
3. **System Symbols:** JavaScript uses built-in symbols for special behaviors (like `Symbol.iterator`)

### Summary of Symbols

- Symbols are unique identifiers
- Created with `Symbol()` or `Symbol("description")`
- Even symbols with the same description are different
- Symbols can be used as object property keys
- Symbols are skipped in `for...in` loops
- Useful for creating hidden properties and avoiding name collisions

---

## Summary

### Objects Basics
- Objects are used to store keyed collections of various data and complex entities
- Objects can be created with `{}` (literal) or `new Object()` (constructor)
- Properties are key-value pairs where keys are strings and values can be anything
- Properties can be accessed using dot notation or square bracket notation
- Square brackets are required for multi-word keys and allow dynamic property access

### Object Methods and "this"
- Functions stored in object properties are called "methods"
- Methods allow objects to "act" like `object.doSomething()`
- Methods can reference the object as `this`
- The value of `this` is defined at run-time
- When a function is called in the "method" syntax: `object.method()`, the value of `this` during the call is `object`
- Arrow functions don't have their own `this` - they take it from the outer context

### Object References
- Objects are assigned and copied by reference
- A variable stores not the "object value", but a "reference" (address in memory) for the value
- Copying such a variable or passing it as a function argument copies that reference, not the object itself
- All operations via copied references are performed on the same single object
- Two objects are equal only if they are the same object
- Const objects can be modified (properties can change), but the reference cannot be reassigned

### Cloning Objects
- To make a "real copy" (a clone), we can use:
  - `Object.assign()` for "shallow copy" (nested objects are copied by reference)
  - `structuredClone()` for "deep cloning" (copies nested objects too)
  - Custom cloning implementation for complex cases (e.g., `_.cloneDeep(obj)` from lodash)

### Constructors
- Constructor functions are regular functions named with capital letter first
- Constructor functions should only be called using `new`
- When called with `new`, a new empty object is created and assigned to `this`, the function body executes, and `this` is returned
- If `return` is called with an object, that object is returned instead of `this`
- If `return` is called with a primitive, it's ignored

### Garbage Collection
- Memory management in JavaScript is automatic
- Objects are retained in memory while they are reachable
- The garbage collector removes unreachable objects automatically
- We cannot force or prevent garbage collection

### Symbols
- Only two primitive types can serve as object property keys: strings and symbols
- Symbols represent unique identifiers, created with `Symbol()` or `Symbol("description")`
- Even symbols with the same description are different values
- Symbols can be used as hidden properties of objects
- Symbols are skipped in `for...in` loops
- Useful for avoiding name collisions and creating hidden properties

---

## Code Examples Summary

### Basic Object Operations
```javascript
// Create, modify, delete
let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;
```

### Checking Empty Object
```javascript
function isEmpty(obj) {
    for (key in obj) {
        return false;
    }
    return true;
}
```

### Sum Object Properties
```javascript
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

let sum = 0;
for (key in salaries) {
    sum += salaries[key];
}
console.log(sum); // 390
```

### Multiply Numeric Properties
```javascript
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
}

for(let key in menu) {
    if(typeof menu[key] === "number") {
        menu[key] *= 2;
    }
}
// Result: { width: 400, height: 600, title: "My menu" }
```


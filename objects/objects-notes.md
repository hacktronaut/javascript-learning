### Objects

There are total 8 data types in javascript. Seven of them are called "Primitive" because their values contain only a single thing.

In contrast, objects are used to store keyed collections of various data and more complex entities. In JavaScript, objects penetrate almost every aspect of the language. So we must understand them first before going in-depth anywhere else.

An object can be created with ffigure brackets {} with an optional list of properties. A property is a key:value pair, where key is a string and value can be anything.

There are two ways to create an object.

let obj1 = new Object(); //Object constructor

let obj2 = {} //Object literal syntax

we can also delete a property from the object using delete operator.

We can also use multi word property but it must be quoted.

let user = {
    name: "John",
    "like games": true // Withou quotes it will throw error. But how do we access it then ?
}


You must use square brackets when you have multi word keys

user.["like games"]

Square brackets are much more powerful than dot notation. They allow any property names and variables. But they are also more cumbersome to write.

So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, then we switch to square brackets.


#### Property value shorthand

function makeUser(name, age) {
    return {
        name,
        age
    }
}

makeUser("Kirito", 30)

This is one way of writing properties but usually key and value are preferred.

### How to access keys in an obect?

we can use in operator to access keys in an object



### Oject referencingand copying

One of the fundamental differences of objects versus primitives is that objects are stored and copied “by reference”, whereas primitive values: strings, numbers, booleans, etc – are always copied “as a whole value”.

let message = "Hello!"

let phrase = message;

As a result we have two independent variables, each one storing the string "Hello!".

A variable assigned to an object stores not the object itself, but its “address in memory” – in other words “a reference” to it.

Basically the object is stored somewhere in the memory and the variables stores the reference to it. Also the assignment operator does not 
copy the value instead it copies the reference so both will be pointing to the same location.


### Comparison by reference

Two objects are requal only if they are the same object.

For instance here a and b reference the same object, ths they are equal:

let a = {}
let b = a;

console.log(a == b);
console.log(a === b);


###### NOTE: Very very important concept. Const objects can be modified. Ideally constant variables cannot be reassigned with new values.

But when it comes to objects its properties can be modifed but variable refernce cannot be changed.

const user = {
    name: "john"
}

user.name = "Pete";

console.log(user.name);


### Cloning , Merging and Object.assign

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object?

We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.

let myObj = {
    name: "John",
    age: 30
}

let clone = {

}

for(let key in myObj) {
    clone[key] = myObj[key];
}

clone.name = "Pete";

console.log(clone);

We can also use the method Object.assign

syntax is --> Object.assign(dest, ...sources)

The first argument is the destination and further arguments is a list of source objects.

Until now we thought all the properties are primitive but properties can be referencing other objects as well

let user = {
    name: "John",
    sizes : {
        height: 182,
        width: 50
    }
};

console.log(user.sizes.height)

Now lets use Object.assign to clone the nested objects and see if it works.

// To fix that and make user and clone truly separate objects, we should use a cloning loop that examines each value of user[key] and, if it’s an object, then replicate its structure as well

This is called deep cloning or structured cloning. There is a structuredClone method that implements deep cloning.

The structured clone copies the entire properties of the objects

let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50
    }
};

let clone = structuredClone(user);

console.log(user.sizes.width)
console.log(clone.sizes.width)


// But there are cases where structured clone fails. For example:
// Error
structuredClone({
  f: function() {}
});

To handle such complex cases we may need to use a combination of cloning methods, write custom code or, to not reinvent the wheel, take an existing implementation, for instance _.cloneDeep(obj) from the JavaScript library lodash.


### Summary

Objects are assigned and copied by reference. In other words, a variable stores not the “object value”, but a “reference” (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.

All operations via copied references are performed on the same single object.

To make a “real copy” (a clone) we can use Object.assign for the so-called “shallow copy” (nested objects are copied by reference) or a “deep cloning” function structuredClone or use a custom cloning implementation, such as _.cloneDeep(obj).
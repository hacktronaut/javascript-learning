By specification, only two primitive types may serve as object property keys:

string type, or
symbol type

Otherwise, if one uses another type, such as number, it’s autoconverted to string. So that obj[1] is the same as obj["1"], and obj[true] is the same as obj["true"].


### Symbols:

Symbols represent a unique identifier.

A value of this type can be created using Symbol():

let id = Symbol();

let id = Symbol("id");


let id = Symbol();

let id2 = Symbol("id");

console.log(id);
console.log(id2.toString());


//Symbols can be used as hidden properties of an object.
/**
 * We can add symbol as a property of an object. lets say new properties to an existing library.
 */ 

 NOTE: Symbols are skipped in for in loop
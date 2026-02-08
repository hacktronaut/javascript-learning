### Object methods, "this"

Objects are usually created to represent entities of the real world, like users, orders and so on:

let user = {
    name: "John",
    age:30
}

user = {
  sayHi: function() {
    alert("Hello");
  }
};

And, in the real world, a user can act: select something from the shopping cart, login, logout etc.

Actions are represented in JavaScript by functions in properties.

There is another way of assigning functions to the object as property.

user = {
    sayHi() {
        console.log("Hello");
    }
}


### Arrow functions have no this.

Arrow functions are special: they don't have their own "this". if we reference this from such a function, it's taken from the outer "normal" function.

### Summary
Functions that are stored in object properties are called “methods”.
Methods allow objects to “act” like object.doSomething().
Methods can reference the object as this.
The value of this is defined at run-time.

When a function is declared, it may use this, but that this has no value until the function is called.
A function can be copied between objects.
When a function is called in the “method” syntax: object.method(), the value of this during the call is object.
Please note 
### Constructor - new Operator

The regular {...} allows os to create one object but often we need to create many similar objects like multipl users or menu items and so on.

This can be done using constructor functions and the new operator.


Constructor Function

Constructor function are the functions that are used to create new objects. They have same name as object but starts with upper case

They are technically regular functions

- They are named with capital letter first.
- They should be executed only with "new" operator.

Then how does it create new object?

We usually use new operator when creating a new object.

For example --> 

let user = new User("Kirito",30);


When a function is executed with new, it does the following steps:

A new empty object is created and assigned to this.
The function body executes. Usually it modifies this, adds new properties to it.
The value of this is returned.

In other words new user does something like this:

```js

function User(name) {
  // this = {};  (implicitly)

  // add properties to this
  this.name = name;
  this.isAdmin = false;

  // return this;  (implicitly)
}
```

### Constructor mode test: new.target

Inside a function we can check whether it was called with new or without it, using a special new.target property.



### Return from constructors:

Usually, constructors do not have a return statement. Their task is to write all necessary stuff into this, and it automatically becomes the result.


But if there is a return statement then rule is simple:

- If return is called with an object then object is returned instead od this.
- if return is called with a primitive, its ignored.


Also let user = new User() is similar to let user = new User;

NOTE: Classes are used to create complex objects.

### Summary
Constructor functions or, briefly, constructors, are regular functions, but there’s a common agreement to name them with capital letter first.
Constructor functions should only be called using new. Such a call implies a creation of empty this at the start and returning the populated one at the end.
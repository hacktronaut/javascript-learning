#### Error handling using "try catch"

No matter how great we are at programming, sometimes our scripts have errors and because of that the program fails and the application dies.

There is a syntax construct try ...catch that allows us to catch errors so the script can, instead of dying do something more reasonable.

The "try catch syntax"

try {
    //Code
} catch (err) {
    // Error Handling
}


Code inside try block is executed first if any error occurs then it goes to catch block. Also err variable is present in catch block (We can use any name for it).

It generally contains an error object with details about what happened.

SO general idea is error inside try block does not kill the script instead we get a change to handle this in the catch block.

Also try catch block only works for runtime errors. Basically the code must be runnable. In other words, it should be valid javascript code.

NOTE: If an exception happens in "scheduled" code, like in setTImeout then try catch won't catch it.

try {
    setTimeout(function(){
        noSuchVariable // Script will die here
    },1000)
}catch(err) {
    console.error("Won't work");
}

That’s because the function itself is executed later, when the engine has already left the try...catch construct.

To catch an exception inside a scheduled function, try...catch must be inside that function:

So following code will work:

setTimeout(function() {
  try {
    noSuchVariable; // try...catch handles the error!
  } catch {
    alert( "error is caught here!" );
  }
}, 1000);
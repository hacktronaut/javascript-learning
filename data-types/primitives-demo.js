let john = {
    name: "John",
    sayHi: function() {
        console.log("Hi Buddy !")
    }
}

console.log(john);


let str = "Hello World !";
console.log(str.toUpperCase());

console.log(str); // String is immutable, so it remains unchanged.


console.log(typeof john); // object
console.log(typeof new Number(1)); // number 

let newNum = new Number(3);
console.log(typeof newNum.valueOf()); // [Number: 3]


let strNew   = "Hello WOrld"
str.test = "Test"; // This will not work as string is a primitive and cannot have properties.
console.log(str.test); // undefined
strNew.test = "Test"; // This will not work as string is a primitive and cannot have properties.
console.log(strNew.test); // undefined
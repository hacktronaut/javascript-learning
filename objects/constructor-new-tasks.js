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

console.log(a === b);


//Accumulator demo

function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function(number) {
        this.value += number;
    }
}

let accumulator = new Accumulator(1);

accumulator.read(2);
accumulator.read(3);

console.log(accumulator.value);
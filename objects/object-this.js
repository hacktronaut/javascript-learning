let user = {
    name: "John",
    age: 30,
    sayHello: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

user.sayHello();


let user2 = {name: "Pete"};
let admin = {name: "Admin"};

function sayHi() {
    console.log(this.name);
}

user2.f = sayHi;
admin.f = sayHi; 

user2.f()
admin.f()

//The rule is simple: if obj.f() is called, then this is obj during the call of f
// Note : in other programming languages like Java, the value of this is determined by the calling object.
// but in javascript, the value of this is determined by the function call and determined at run time.


let user3 = {
    name: "John",
    sayHi() {
        let arrow = () => console.log(this.name); // this is taken from the outer normal function
        arrow();
    }
}

user3.sayHi();

//That’s a special feature of arrow functions, it’s useful when we actually do not want to have a separate this, but rather to take it from the outer context


function makeUser() {
    return {
        name: "John",
        ref() {
            return this;
        }
    }
}           


let user4 = makeUser();
console.log(user4.ref().name);


//Calculator Demo

let calculator = {
    a: 0,
    b: 0,
    read(a,b) {
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

calculator.read(3,4);
console.log(calculator.sum());
console.log(calculator.mul());


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
    showStep: function() { // shows the current step
      console.log( this.step );
      return this;
    }
  };

  ladder.up().up().up().down().showStep().down().showStep();
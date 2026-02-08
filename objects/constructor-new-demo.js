function User(name, age) {
    this.name = name;
    this.age = age;
}

let user = new User("Kirito",30);

console.log(user.name);

//constructor mode : new.target

function User(name) {
    console.log(new.target);
}

User();

new User();
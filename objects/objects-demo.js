let user = {
    name: "John",
    age: 30
}

console.log(user.name);


delete user.age;

console.log(user);

user["like games"] = true;

console.log(user);



function makeUser(name, age) {
    return {
        name,
        age
    }
}

console.log(makeUser("Kirito", 30));    


for (key in user) {
    console.log(key);
}


let user2 = {name: "John"};
let admin = user2;
admin.name = "Pete";

console.log(user2.name);



let a = {}
let b = a;

console.log(a == b);
console.log(a === b);

//But this will be false because c and d are not the same object.
let c = {}
let d = {}
console.log(c == d);
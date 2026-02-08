const user = {
    name: "john"
}

user.name = "Pete";

console.log(user.name);

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

console.log(myObj);

let user2 = {fullName: "Kirito Kazuto"};

let permissions = {canView: true};
let permissions2 = {canEdit: true};

Object.assign(user2, permissions, permissions2);

console.log(user2);

// We can also use Object.assign to clone an object.

let newUser = Object.assign({}, user2);

console.log(newUser);
console.log(newUser === user2); // false


let user3 = {
    name: "John",
    sizes : {
        height: 182,
        width: 50
    }
};

let newUser3 = Object.assign({}, user3);

newUser3.sizes.height = 190;

console.log(user3.sizes.height);
console.log(newUser3.sizes.height);


let user5 = {
    name: "John",
    sizes: {
        height: 182,
        width: 50
    }
};

let clone2 = structuredClone(user5);

clone2.sizes.width = 60;

console.log(user5.sizes.width)
console.log(clone2.sizes.width)
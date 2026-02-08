
function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



function generateRandomNumber(min, max) {
    return Math.random() * (max - min + 1) + min;
}

console.log(generateRandomNumber(1, 10)); // Generates a random number between 1 and 10 (inclusive)

console.log(generateRandomInteger(1, 10)); // Generates a random integer between 1 and 10 (inclusive)
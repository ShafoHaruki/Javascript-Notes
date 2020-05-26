// => https://regex101.com/

const sentence = "Today is a very good day";
const regex = /good/;
console.log(regex.test(sentence)); //outputs true, regex can match part of input

const sentence = "excellentzzz";
const regex = /^excellent$/;
console.log(regex.test(sentence)); //outputs false, regex must match input perfectly

const sentence1 = "hello there the code is f5";
const sentence2 = "hello there the code is fxxxxx5";
const sentence3 = "hello there the code is ff";
const regex = /code is [a-zA-Z]+[1-9]/;
console.log(regex.test(sentence1)); //outputs true
console.log(regex.test(sentence2)); //outputs true
console.log(regex.test(sentence3)); //outputs false

const sentence = "fbHj2r:3bQ39:";
const regex = /[a-zA-Z0-9]+/;
console.log(regex.test(sentence)); //outputs true

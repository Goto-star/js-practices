#!/usr/bin/env node
"use strict";

const numbers = [];
for (let i = 1; i <= 20; i++) {
  numbers.push(i);
}

const fizzBuzz = (numbers) => {
  numbers.forEach((number) => {
    if (number % 15 === 0) return console.log("FizzBuzz");
    if (number % 3 === 0) return console.log("Fizz");
    if (number % 5 === 0) return console.log("Buzz");
    return console.log(number);
  });
};

fizzBuzz(numbers);

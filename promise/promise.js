const prompt = require('prompt-sync')();


// Callbacks:
// Write a function multiplyByTwo that takes a number as an argument and a callback function. 
// Inside the function, multiply the number by 2 and pass the result to the callback function.

const multiplyByTwo = (num, callback) => {
    result = num * 2;
    callback(result);
}

function display(data) {
    console.log("Your data is ", data)
}


multiplyByTwo(5, display)

// Promises:
// Write a function checkEven that takes a number as an argument and returns a promise.
// Inside the function, check if the number is even.If it is even, resolve the promise with the message "Even number".
// Otherwise, reject the promise with the message "Odd number".


function isEven(num) {
    return new Promise((resolve, reject) => {
        if (num % 2 == 0) {
            resolve('Even number')
        } else {
            reject('Odd number')
        }
    })
}


check_even = prompt('Enter your number to check even or odd\n');

isEven(check_even)
    .then((result) => console.log(result))
    .catch((result) => console.log(result))
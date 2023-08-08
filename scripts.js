//references to html doc
const display = document.querySelector('#displayOutput');
const buttons = document.querySelectorAll('button')

//initialize values
firstNumber = 0;
secondNumber = 0;
operator = '+';


//simple functions
const add = (a,b) => {return a+b};
const subtract = (a,b) => {return a-b};
const multiply = (a,b) => {return a*b};
const divide = (a,b) => {return a/b};

//new function operate
const operate = function (firstNumber, operator, secondNumber) {
    if (operator == '+') {add(firstNumber,secondNumber)}
    else if (operator == '-') {subtract(firstNumber,secondNumber)}
    else if (operator == '*') {multiply(firstNumber,secondNumber)}
    else if (operator == '÷') {divide(firstNumber,secondNumber)}
};

//button listener

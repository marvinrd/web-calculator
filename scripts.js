//references to html doc
const display = document.querySelector("#displayOutput");
const buttons = document.querySelectorAll("button");

//initialize values
let firstNumber = 0;
let secondNumber = 0;
let operator = "";
let displayValue = firstNumber;
display.textContent = displayValue;

//simple functions
const add = (a, b) => {
  return a + b;
};
const subtract = (a, b) => {
  return a - b;
};
const multiply = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  return a / b;
};

//new function operate
const operate = function (firstNumber, operator, secondNumber) {
  if (operator == "+") {
    return add(firstNumber, secondNumber);
  } else if (operator == "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operator == "*") {
    return multiply(firstNumber, secondNumber);
  } else if (operator == "÷") {
    return divide(firstNumber, secondNumber);
  }
};

// function to update main display
const updateMainDisplay = function () {
  display.textContent = operator + Number(displayValue).toPrecision();
  };

// function to calculate results
const runResult = function () {
  secondNumber = Number(displayValue);
  displayValue = operate(firstNumber, operator, secondNumber);
  operator = "";
  updateMainDisplay();
  firstNumber = 0;
  secondNumber = 0;
};

//button listener
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (this.dataset.group == "number") {
      displayValue += this.dataset.value;
      updateMainDisplay();
      console.log(displayValue);
    } else if (this.dataset.group == "operator") {
      if (operator == "") {
        firstNumber = Number(displayValue);
        displayValue = 0;
        operator = this.textContent;
        updateMainDisplay();
      } else {
        runResult();
        firstNumber = Number(displayValue);
        displayValue = 0;
        operator = this.textContent;
        updateMainDisplay();
      }
    } else if (this.dataset.group == "result") {
      if (this.textContent == "Clear") {
        firstNumber = 0;
        secondNumber = 0;
        operator = "";
        displayValue = firstNumber;
        updateMainDisplay();
      } else if (this.textContent == "=") {
        runResult();
      } else {
        return error;
      }
    }
  });
});

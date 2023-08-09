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

// function to update main display with rounding to the millionth to avoid too many decimals
const updateMainDisplay = function () {
  if (firstNumber != 0) {
    display.textContent =
      firstNumber +
      operator +
      Math.round(Number(displayValue) * 1000000) / 1000000;
  } else {
    display.textContent =
      operator + Math.round(Number(displayValue) * 1000000) / 1000000;
  }
};

// function to calculate results
const runResult = function () {
  // control for divide by zero
  if (secondNumber == 0 && operator == "÷") {
    display.textContent = "CaLcUlaToR bRoKeN!!!";
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
  }

  // regular scenario
  else if (operator != "") {
    secondNumber = Number(displayValue);
    displayValue = operate(firstNumber, operator, secondNumber);
    operator = "";
    firstNumber = 0;
    secondNumber = 0;
    updateMainDisplay();
  }
};

// UI button event listener
buttons.forEach(function (button) {
  button.addEventListener("click", function (e) {

    // number event
    if (this.dataset.group == "number") {
      displayValue += this.dataset.value;
      updateMainDisplay();
    }
    // operator event
    else if (this.dataset.group == "operator") {
      // first operator instance run as normal
      if (operator == "") {
        firstNumber = Number(displayValue);
        displayValue = 0;
        operator = this.textContent;
        updateMainDisplay();
      }
      // subsequent operator instance should calculate result
      else {
        runResult();
        firstNumber = Number(displayValue);
        displayValue = 0;
        operator = this.textContent;
        updateMainDisplay();
      }
    } else if (this.dataset.group == "result") {
      if (this.textContent == "Clear All") {
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
    } else if (
      this.dataset.group == "floatModifier" &&
      Number.isInteger(Number(displayValue))
    ) {
      displayValue += this.dataset.value;
      updateMainDisplay();
    } else if (
      this.dataset.group == "backspace" &&
      Number(displayValue) !== 0
    ) {
      displayValue = displayValue.toString().slice(0, -1);
      updateMainDisplay();
    }
  });
});

// key listener

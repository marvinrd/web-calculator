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

// function operate
const operate = function (firstNumber, operator, secondNumber) {
  if (operator == "+") {
    return add(firstNumber, secondNumber);
  } else if (operator == "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operator == "*") {
    return multiply(firstNumber, secondNumber);
  } else if (operator == "/") {
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

// logic usable for both UI and keyboard interaction
const listenerLogic = (inputKey, inputGroup) => {
  // number event
  if (inputGroup == "number") {
    displayValue += inputKey;
    updateMainDisplay();
  }
  // operator event
  else if (inputGroup == "operator") {
    // first operator instance run as normal
    if (operator == "") {
      firstNumber = Number(displayValue);
      displayValue = 0;
      operator = inputKey;
      updateMainDisplay();
    }
    // subsequent operator instance should calculate result
    else {
      runResult();
      firstNumber = Number(displayValue);
      displayValue = 0;
      operator = inputKey;
      updateMainDisplay();
    }
  } else if (inputGroup == "result") {
    if (inputKey == "clearAll") {
      firstNumber = 0;
      secondNumber = 0;
      operator = "";
      displayValue = firstNumber;
      updateMainDisplay();
    } else if (inputKey == "=") {
      runResult();
    } else {
      return error;
    }
  } else if (
    inputGroup == "floatModifier" &&
    Number.isInteger(Number(displayValue))
  ) {
    displayValue += inputKey;
    updateMainDisplay();
  } else if (inputGroup == "backspace" && Number(displayValue) !== 0) {
    displayValue = displayValue.toString().slice(0, -1);
    updateMainDisplay();
  }
};

// UI button event listener
buttons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    const group = e.target.dataset.group;
    const key = e.target.dataset.key;

    listenerLogic(key, group);
  });
});

// keyboard event listener
window.addEventListener("keydown", (e) => {
  const btn = document.querySelector(`button[data-key="${e.key}"]`);
  if (e.key == "Enter") {
    runResult();
  } else if (e.key == "Escape") {
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
    displayValue = firstNumber;
    updateMainDisplay();
  } else if (!btn) {
    return;
  } else {
    const group = btn.dataset.group;
    const key = btn.dataset.key;

    listenerLogic(key, group);
  }
});

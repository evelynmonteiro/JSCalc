const numbers = document.querySelectorAll("[id*=number]");
const dot = document.getElementById("dot");
const operators = document.querySelectorAll("[id*=operator]");
const display = document.getElementById("display");
const equal = document.getElementById("equal");
const del = document.getElementById("del");
const reset = document.getElementById("reset");

// Control

let chosenOperator;
let newNumber = true;
let previousNumber;

// Functions

const updateDisplay = function (text) {
  if (newNumber) {
    display.textContent = text;
    newNumber = false;
  } else {
    display.textContent += text;
  }
};

const pendingOperation = () => chosenOperator !== undefined && !newNumber;

const calculate = function () {
  if (pendingOperation()) {
    const result = eval(
      `${previousNumber}${chosenOperator}${Number(display.textContent)}`
    );

    if (isNaN(result) || result === Infinity) {
      display.textContent = "0";
    } else if (result % 1 == 0) {
      display.textContent = result;
    } else {
      display.textContent = result.toFixed(2);
    }
  }
};

// Handlers

numbers.forEach(function (number) {
  number.addEventListener("click", function (e) {
    updateDisplay(e.target.textContent);
  });
});

dot.addEventListener("click", function () {
  if (newNumber === true) {
    display.textContent = "0.";
    newNumber = false;
  } else {
    if (!display.textContent.includes(".")) {
      display.textContent += ".";
    }
  }
});

operators.forEach(function (operator) {
  operator.addEventListener("click", function (e) {
    calculate();
    previousNumber = Number(display.textContent);
    newNumber = true;

    if (e.target.textContent === "x") {
      chosenOperator = "*";
    } else {
      chosenOperator = e.target.textContent;
    }
  });
});

equal.addEventListener("click", function () {
  calculate();
  chosenOperator = undefined;
  newNumber = true;
});

del.addEventListener("click", function () {
  display.textContent = display.textContent.substring(
    0,
    display.textContent.length - 1
  );

  if (display.textContent.length <= 0) {
    newNumber = true;
  }
});

reset.addEventListener("click", function () {
  display.textContent = "";
  newNumber = true;
  chosenOperator = undefined;
  previousNumber = "";
});

// Keyboard

const keyboardMap = {
  0: "number0",
  1: "number1",
  2: "number2",
  3: "number3",
  4: "number4",
  5: "number5",
  6: "number6",
  7: "number7",
  8: "number8",
  9: "number9",
  "/": "operatordiv",
  "*": "operatormul",
  "-": "operatorsub",
  "+": "operatorsum",
  "=": "equal",
  Enter: "equal",
  Backspace: "del",
  c: "reset",
  ",": "dot",
  ".": "dot",
};

const mapKeyboard = (e) => {
  const key = e.key;

  const allowedKeys = () => Object.keys(keyboardMap).indexOf(key) !== -1;
  if (allowedKeys()) document.getElementById(keyboardMap[key]).click();
};

document.addEventListener("keydown", mapKeyboard);

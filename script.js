const lastScreen = document.querySelector(".lastOperationScreen");
const calScreen = document.querySelector(".currentOperationScreen");
const numberButtons = document.querySelectorAll(".button");
const zeroButton = document.querySelector(".zeroButton");
const operatorButton = document.querySelectorAll(".operatorButton")
const equalButton = document.querySelector(".equalButton")
const deleteButton = document.querySelector(".deleteButton");
const clearButton = document.querySelector(".clearButton");
const decimalButton = document.querySelector(".decimalButton");
const negativeButton = document.querySelector(".negativeButton");

let a = '';
let b = '';
let operator = '';
let result = '';
let inputSecondNumber = false;
lastScreen.textContent = '';
calScreen.textContent = '_';


const add = (a,b) => {
  result = Math.round((a + b) *100000) / 100000;
  return result;
};
const subtract = (a,b) => {
  result = Math.round((a - b) *100000) / 100000;
  return result;
};
const multiply = (a,b) => {
  result = Math.round((a * b) *100000) / 100000;
  return result;
};
const divide = (a,b) => {
  if (b === 0) { 
  result = "ERROR"
  return result;
  }  
  result = Math.round((a / b) *100000) / 100000;
  return result;
};

const operate = function(a,operator,b) {
  if (operator === "+") {
    return add(a,b);
  } else if (operator === "-") {
    return subtract(a,b);
  } else if (operator === "×") {
    return multiply(a,b);
  } else if (operator === "÷") {
    return divide(a,b);
  }
}

numberButtons.forEach(button => button.addEventListener("click", (e) => {
  if (lastScreen.textContent.includes("=")) { //prevents inputting additional number after operating with equal sign.
    return;
  } 
  if (!inputSecondNumber) {
    if (calScreen.textContent == "0") { //prevents showing zero as first number.
      a = "";
    }
    a += e.target.value;
    calScreen.textContent = a;
  } else if (inputSecondNumber) {
    if (calScreen.textContent == "0") { //prevents showing zero as first number.
      b = "";
    }
    b += e.target.value;
    calScreen.textContent = b;
  }
}))

zeroButton.addEventListener("click", (e) => {
  if (calScreen.textContent == "0" || calScreen.textContent == "-0") { //prevents multi zero input if point not appended.
    return;
  } else if (lastScreen.textContent.includes("=")) {
    return;
  }
  if (!inputSecondNumber) {
    a += e.target.value;
    calScreen.textContent = a;
  } else if (inputSecondNumber) {
    b += e.target.value;
    calScreen.textContent = b;
  }
})

operatorButton.forEach(button => button.addEventListener("click", (e) => {
  if (a === '' || result === "ERROR") { //prevents operator input if a is undefined or ERROR is on the screen.
    return;
  } else if (b === '') {
    a = parseFloat(a);
    operator = e.target.value;
    lastScreen.textContent = `${a} ${operator}`;
    inputSecondNumber = true;
  } else { //condition will happen if user press operator button(instead of equal) to show calculation result.
    b = parseFloat(b);
    operate(a, operator, b); //operate will return result.
    calScreen.textContent = result; //display result on screen.
    a = result; //value of a is the result of operate function.
    operator = e.target.value; //value of operator is defined.
    lastScreen.textContent = `${a} ${operator}`; //display a with value of result and operator.
    b = ""; //thus value of b will be undefined and need to be redefined.
    inputSecondNumber = true; //value is true in order to redefine b.
  }
}))

equalButton.addEventListener("click", () => {
  if (inputSecondNumber === false || !b) { //prevents operating when a has not been inputted or b is not defined.
    return;
  };
  b = parseFloat(b);
  operate(a, operator, b);
  lastScreen.textContent = `${a} ${operator} ${b} =`;
  calScreen.textContent = result;
  a = result;
  b = "";
  inputSecondNumber = true;
  operator = '';
})

clearButton.addEventListener("click", () => {
  a = '';
  b = '';
  operator = '';
  result = '';
  inputSecondNumber = false;
  lastScreen.textContent = '';
  calScreen.textContent = '_';
})

deleteButton.addEventListener("click", () => {
  if (lastScreen.textContent.includes("=")) {
    return;
  }
  if (!inputSecondNumber) {
    a = a.toString().slice(0, -1);
    calScreen.textContent = a;
    if (calScreen.textContent === "") {
      calScreen.textContent = '_';
    };
  } else if (inputSecondNumber) {
    b = b.toString().slice(0, -1);
    calScreen.textContent = b;
    if (calScreen.textContent === "") {
      calScreen.textContent = '_';
    };
  }
})

decimalButton.addEventListener("click", (e) => {
  if (!inputSecondNumber) {
    if (a.includes(".") || calScreen.textContent == "-") {
      return;
    };
    a += e.target.value
    calScreen.textContent = a;
  } else if (inputSecondNumber) {
    if (b.includes(".") || calScreen.textContent == "-") {
      return;
    };
    b += e.target.value
    calScreen.textContent = b;
  }
})

negativeButton.addEventListener("click", () => {
  if (inputSecondNumber && lastScreen.textContent.includes("=")) {
    a = a*(-1);
    calScreen.textContent = a;
  } else if (!inputSecondNumber) {
    if (a === "") {
      a = "-";
      calScreen.textContent = a;
      return;
    } else if (a === "-") {
      a = "";
      calScreen.textContent = "_";
      return;
    }
    a = a*(-1);
    calScreen.textContent = a;
  } else if (inputSecondNumber) {
    if (b === "") {
      b = "-";
      calScreen.textContent = b;
      return;
    } else if (b === "-") {
      b = "";
      calScreen.textContent = "_";
      return;
    }
    b = b*(-1);
    calScreen.textContent = b;
  }
})
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

const appendNumber = function(number) {
  //prevents inputting additional number after operating with equal sign.
  if (lastScreen.textContent.includes("=")) {
    return;
  } 
  if (!inputSecondNumber) {
    if (a.toString().length === 12) {
      return;
    }
    //prevents showing zero as first number.
    if (calScreen.textContent == "0") {
      a = "";
    }
    a += number;
    calScreen.textContent = a;
  } else if (inputSecondNumber) {
    if (b.toString().length === 12) {
      return;
    }
    //prevents showing zero as first number.
    if (calScreen.textContent == "0") {
      b = "";
    }
    b += number;
    calScreen.textContent = b;
  }
}

const appendZero = function(zero) {
  //prevents multi zero input if point not appended.
  if (calScreen.textContent == "0" || calScreen.textContent == "-0") {
    return;
  } else if (lastScreen.textContent.includes("=")) {
    return;
  }
  if (!inputSecondNumber) {
    if (a.toString().length === 12) {
      return;
    }
    a += zero;
    calScreen.textContent = a;
  } else if (inputSecondNumber) {
    if (b.toString().length === 12) {
      return;
    }
    b += zero;
    calScreen.textContent = b;
  }
}

const appendEqual = function() {
  //prevents operating when a has not been inputted or b is not defined.
  if (inputSecondNumber === false || !b) {
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
}

const clearAll = function() {
  a = '';
  b = '';
  operator = '';
  result = '';
  inputSecondNumber = false;
  lastScreen.textContent = '';
  calScreen.textContent = '_';
}

const deleteNumber = function() {
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
}

const appendDecimal = function(decimal) {
  if (!inputSecondNumber) {
    if (a == '') {
      a = '0.'
      calScreen.textContent = a;
    }
    if (a.includes(".") || calScreen.textContent == "-") {
      return;
    };
    a += decimal
    calScreen.textContent = a;
  } else if (inputSecondNumber) {
    if (b == '') {
      b = '0.'
      calScreen.textContent = b;
    }
    if (b.includes(".") || calScreen.textContent == "-") {
      return;
    };
    b += decimal
    calScreen.textContent = b;
  }
}

const appendUnappendNegative = function() {
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
}

const appendOperator = function(operatorSymbol) {
  //prevents operator input if a is undefined or ERROR is on the screen.
  if (a === '' || a === '-' || result === "ERROR") {
    return;
  //prevents operate function to happen if b is undefined.
  } else if (b === '' || b === '-') {
    a = parseFloat(a);
    operator = operatorSymbol;
    lastScreen.textContent = `${a} ${operator}`;
    inputSecondNumber = true;
  } else {
    b = parseFloat(b);
    operate(a, operator, b);
    calScreen.textContent = result;
    a = result;
    operator = operatorSymbol;
    lastScreen.textContent = `${a} ${operator}`;
    b = "";
    inputSecondNumber = true;
  }
}

numberButtons.forEach(button => button.addEventListener("click", (e) => appendNumber(e.target.value)));
zeroButton.addEventListener("click", (e) => appendZero(e.target.value));
operatorButton.forEach(button => button.addEventListener("click", (e) => appendOperator(e.target.value)));
equalButton.addEventListener("click", appendEqual);
clearButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", deleteNumber);
decimalButton.addEventListener("click", (e) => appendDecimal(e.target.value));
negativeButton.addEventListener("click", appendUnappendNegative);

// Keyboard Input
document.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (e.key >= 1 && e.key <= 9) appendNumber(e.key);
  if (e.key == 0) appendZero(e.key);
  if (e.key == 'Enter') appendEqual();
  if (e.key == 'Delete') clearAll();
  if (e.key == 'Backspace') deleteNumber();
  if (e.key == '.') appendDecimal(e.key);
  if (e.key == 'Control') appendUnappendNegative();
  if (e.key == '+' || e.key == '-') appendOperator(e.key);
  if (e.key == '*') appendOperator('×');
  if (e.key == '/') appendOperator('÷');
})
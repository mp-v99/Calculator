// Math functions

const add = function(a, b) {
    return a + b;
  };
  
const subtract = function(a, b) {
    return a - b;
};

const divide = function(a, b) {
    if (b == 0) {
        return `Well, if you're dividing by zero, you're not doing math — you're performing an act of metaphysical rebellion against reality itself.`
    }
    return a / b;
};

const multiply = function(a, b) {
    return a * b;
};

// Buttons Selectors

const numberButtons = document.querySelectorAll('.number_button');
const operatorButtons = document.querySelectorAll('.operator_button');
const equalButton = document.querySelector('#btn-equals');
const displayResult = document.querySelector('#result');

let firstOperand = '';
let secondOperand = '';
let operator = '';


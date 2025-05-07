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


// Number Buttons Evenet Listener


numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!operator) {
            if(firstOperand.length <= 11) {
                firstOperand += button.textContent;
            }
        }
        else {
            if(secondOperand.length <= 11) {
                secondOperand += button.textContent;
            }
        }
    }) 
})

// Operator Buttons Event Listener

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!operator && firstOperand) {
            operator += button.textContent;
        }
    })
});

// Equal Button Event Listener


equalButton.addEventListener('click', () => {
    switch(operator) {
        case '÷': 
            displayResult.textContent = divide(parseInt(firstOperand), parseInt(secondOperand))
        break;
        case 'x':
            displayResult.textContent = multiply(parseInt(firstOperand), parseInt(secondOperand))
        break;
        case '+':
            displayResult.textContent = add(parseInt(firstOperand), parseInt(secondOperand))
        break;
        case '-':
            displayResult.textContent = subtract(parseInt(firstOperand), parseInt(secondOperand))
        break;
    }
    firstOperand = '';
    secondOperand = '';
    operator = '';
})

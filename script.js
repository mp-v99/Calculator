// Math functions

const add = function(a, b) {
    return Math.round((parseFloat(a)+ parseFloat(b)) * 10) / 10;
  };
  
const subtract = function(a, b) {
    return Math.round((parseFloat(a)- parseFloat(b)) * 10) / 10;
};

const divide = function(a, b) {
    if (b == 0) {
        return `Well, if you're dividing by zero, you're not doing math — you're performing an act of metaphysical rebellion against reality itself.`
    }
    return Math.round((parseFloat(a)/ parseFloat(b)) * 10) / 10;
};

const multiply = function(a, b) {
    return Math.round((parseFloat(a)* parseFloat(b)) * 10) / 10;
};

// Buttons Selectors

const numberButtons = document.querySelectorAll('.number_button');
const operatorButtons = document.querySelectorAll('.operator_button');
const equalButton = document.querySelector('#btn-equals');
const clearButton = document.querySelector('#btn-clear');
const backSpaceButton = document.querySelector('#btn-backspace');
const displayResult = document.querySelector('#result');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let isDisplayEmpty = true;
let isDecimalEmpty = true;


// Number Buttons Evenet Listener


numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (isDisplayEmpty && !operator) {
            displayResult.textContent = '';
            firstOperand = ''
            isDisplayEmpty = false;
        }
        if (!operator) { // This condition prevents from adding more digits after having selected an operator
            if(e.target.id === 'btn-dot' && isDecimalEmpty && firstOperand.length >= 1) {
                firstOperand += button.textContent
                displayResult.textContent += button.textContent;
                isDecimalEmpty = false;
            }
            else if(firstOperand.length <= 11 && e.target.id != 'btn-dot') {  // This condition limits the length of the operand
                firstOperand += button.textContent
                displayResult.textContent += button.textContent;
            }
        }
        else {
            if(e.target.id === 'btn-dot' && isDecimalEmpty && secondOperand.length >= 1) {
                secondOperand += button.textContent
                displayResult.textContent += button.textContent;
                isDecimalEmpty = false;
            }
            if(secondOperand.length <= 11 && e.target.id != 'btn-dot') {
                secondOperand += button.textContent;
                displayResult.textContent += button.textContent;
                console.log(`${firstOperand} ${operator} ${secondOperand}`)
            }
        }
    }) 
})

// Operator Buttons Event Listener

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!operator && firstOperand) {
            operator += button.textContent;
            displayResult.textContent += operator;
            isDecimalEmpty = true;
            console.log(`operator: ${typeof firstOperand}`)
        }
    })
});

// Equal Button Event Listener


equalButton.addEventListener('click', () => {
    if (firstOperand && secondOperand) {
        switch(operator) {
            case '÷': 
                displayResult.textContent = divide(firstOperand, secondOperand)
                firstOperand = divide(firstOperand, secondOperand)
            break;
            case 'x':
                displayResult.textContent = multiply(firstOperand, secondOperand)
                firstOperand = multiply(firstOperand, secondOperand)
            break;
            case '+':
                displayResult.textContent = add(firstOperand, secondOperand)
                firstOperand = add(firstOperand, secondOperand)
            break;
            case '-':
                displayResult.textContent = subtract(firstOperand, secondOperand)
                firstOperand = subtract(firstOperand, secondOperand)
                console.log(firstOperand)

            break;
        }
    }
    secondOperand = '';
    operator = '';
    isDisplayEmpty = true;
    isDecimal = true;
});

// Clear Button Event Listener 

clearButton.addEventListener('click', () => {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    isDisplayEmpty = true;
    isDecimal = true;
    displayResult.textContent = '';
})

// Backspace Button Event Listener

backSpaceButton.addEventListener('click', () => {
        if (secondOperand.length >= 1) {
            secondOperand = secondOperand.slice(0, -1);
            displayResult.textContent = displayResult.textContent.slice(0,-1);
        }
        else if (operator.length == 1) {
            operator = operator.slice(0, -1);
            displayResult.textContent = displayResult.textContent.slice(0,-1);
        }
        else if (typeof firstOperand === 'number') {
            firstOperand = '';
            secondOperand = '';
            operator = '';
            isDisplayEmpty = true;
            isDecimal = true;
            displayResult.textContent = '';
        }
        else if (firstOperand.length >= 1) {
            firstOperand = firstOperand.slice(0, -1);
            console.log(firstOperand)
            displayResult.textContent = displayResult.textContent.slice(0,-1);

        }
})

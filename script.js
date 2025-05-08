// Buttons Selectors

const numberButtons = document.querySelectorAll('.number_button');
const operatorButtons = document.querySelectorAll('.operator_button');
const equalButton = document.querySelector('#btn-equals');
const clearButton = document.querySelector('#btn-clear');
const backSpaceButton = document.querySelector('#btn-backspace');
const displayResult = document.querySelector('#result');


let isDisplayEmpty = true;
let isDecimalEmpty = true;
let isJokeMessage = false;

let operation = {
    firstOperand: '',
    secondOperand: '',
    operator: '',
};

// Number Buttons Event Listener


numberButtons.forEach((button) => { 
    button.addEventListener('click', (e) => {
       numberButtonsFunction(button.textContent, e.target.id);
    }) 
})

// Operator Buttons Event Listener

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        operatorButtonsFunction(button.textContent);
    })
});

// Equal Button Event Listener


equalButton.addEventListener('click', () => {
    equalsFunction();
});

// Clear Button Event Listener 

clearButton.addEventListener('click', () => {
    clearFunction();
})

// Backspace Button Event Listener

backSpaceButton.addEventListener('click', () => {
   backspaceFunction();  
});

// Keyboard Event Listeners

document.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch(e.key) {
        case 'Enter':
            equalsFunction();
        break;
        case 'Escape':
            clearFunction();
        break;
        case 'Backspace':
            backspaceFunction();
        break;
        case '/':
            operatorButtonsFunction('÷');
        break;
        case '*':
            operatorButtonsFunction('x');
        break;
        case '+':
            operatorButtonsFunction(e.key);
        break;
        case '-':
            operatorButtonsFunction(e.key);
        break;    
        case '0':
            numberButtonsFunction(e.key, e.key);
        break;
        case '1':
            numberButtonsFunction(e.key, e.key);
        break;
        case '2':
            numberButtonsFunction(e.key, e.key);
        break;
        case '3':
            numberButtonsFunction(e.key, e.key);
        break;
        case '4':
            numberButtonsFunction(e.key, e.key);
        break;
        case '5':
            numberButtonsFunction(e.key, e.key);
        break;
        case '6':
            numberButtonsFunction(e.key, e.key);
        break;
        case '7':
            numberButtonsFunction(e.key, e.key);
        break;
        case '8':
            numberButtonsFunction(e.key, e.key);
        break;
        case '9':
            numberButtonsFunction(e.key, e.key);
        break;
        case '.':
            numberButtonsFunction(e.key, e.key);
        break;
    }
})

// Operate function

const operate = function(firstOperand, secondOperand, operator) {
    switch(operator) {
        case '÷': 
            displayResult.textContent = divide(firstOperand, secondOperand)
            operation.firstOperand = divide(firstOperand, secondOperand) // Reassign the result to the first operand to do chain evaluation
        break;
        case 'x':
            displayResult.textContent = multiply(firstOperand, secondOperand)
            operation.firstOperand = multiply(firstOperand, secondOperand)
        break;
        case '+':
            displayResult.textContent = add(firstOperand, secondOperand)
            operation.firstOperand = add(firstOperand, secondOperand)
        break;
        case '-':
            displayResult.textContent = subtract(firstOperand, secondOperand)
            operation.firstOperand = subtract(firstOperand, secondOperand)
        break;
    }
}

// Math functions

const add = function(a, b) {
    return Math.round((parseFloat(a)+ parseFloat(b)) * 1000) / 1000;
  };
  
const subtract = function(a, b) {
    return Math.round((parseFloat(a)- parseFloat(b)) * 1000) / 1000;
};

const divide = function(a, b) {
    if (b == 0) {
        operation.firstOperand = ''
        operation.secondOperand = '';
        operation.operator = '';
        isJokeMessage = true;
        return `Well, if you're dividing by zero, you're not doing math — you're performing an act of metaphysical rebellion against reality itself.`
    }
    return Math.round((parseFloat(a)/ parseFloat(b)) * 1000) / 1000;
};

const multiply = function(a, b) {
    return Math.round((parseFloat(a)* parseFloat(b)) * 1000) / 1000;
};


// Listener Buttons Functions:

const numberButtonsFunction = function(number, e) {
    if (isDisplayEmpty && !operation.operator) { // This condition allows to reset in case the user types a new number after getting a result
        displayResult.textContent = '';
        operation.firstOperand = '';
        isDisplayEmpty = false;
        isJokeMessage = false;
    }
    if (!operation.operator) { // This condition prevents from adding more digits after having selected an operator
        if(e === '.' && isDecimalEmpty && operation.firstOperand.length >= 1) { // Adds the dot only if the dot hasn't been used and there's at least one digit in the operand
            operation.firstOperand += number
            displayResult.textContent += number;
            isDecimalEmpty = false;
        }
        else if(operation.firstOperand.length <= 11 && e !== '.') {  // This condition limits the length of the operand
            operation.firstOperand += number
            displayResult.textContent += number;
        }
    }
    else {
        if(e === '.' && isDecimalEmpty && operation.secondOperand.length >= 1) {
            operation.secondOperand += number
            displayResult.textContent += number;
            isDecimalEmpty = false;
        }
        else if(operation.secondOperand.length <= 11 && e !== '.') {
            operation.secondOperand += number;
            displayResult.textContent += number;
        }
    }
};

const operatorButtonsFunction = function(operator) {
    if (operation.firstOperand && !isJokeMessage) { // prevents behavior where a new operation can be started when joke message is displayed
        operation.operator = '';
        operation.operator = operator;
        displayResult.textContent = operation.firstOperand + operator;
        isDecimalEmpty = true; // This allows to add a decimal to the second operand
    }
}

const equalsFunction = function() {
    if (operation.firstOperand  && operation.secondOperand) {
        console.table(operation);
        operate(operation.firstOperand, operation.secondOperand, operation.operator);
        isDisplayEmpty = true;
        operation.secondOperand = '';
        operation.operator = '';
        isDecimalEmpty = true;
        isOperatorEmpty = true;
        
    }
}

const clearFunction = function() {
    operation.firstOperand = '';
    operation.secondOperand = '';
    operation.operator = '';
    isDisplayEmpty = true;
    isDecimalEmpty = true;
    isOperatorEmpty = true;
    displayResult.textContent = '';
};

const backspaceFunction = function() {
    if (operation.secondOperand.length >= 1) {
        operation.secondOperand = operation.secondOperand.slice(0, -1);
        displayResult.textContent = displayResult.textContent.slice(0,-1);
    }
    else if (operation.operator.length == 1) {
        operation.operator = operation.operator.slice(0, -1);
        isOperatorEmpty = true;
        displayResult.textContent = displayResult.textContent.slice(0,-1); 
    }
    else if (typeof operation.firstOperand === 'number' || isJokeMessage) { // Clear everything in case the first operand                                                                
        operation.firstOperand = '';                                       // is the result of a previous calculation or is 
        operation.secondOperand = '';                                     // the mocking message when dividing by zero
        operation.operator = '';
        isDisplayEmpty = true;
        isDecimalEmpty = true;
        isOperatorEmpty = true;
        isJokeMessage = false;
        displayResult.textContent = '';
    }
    else if (operation.firstOperand.length >= 1) {
        operation.firstOperand = operation.firstOperand.slice(0, -1);
        displayResult.textContent = displayResult.textContent.slice(0,-1);
    }
};

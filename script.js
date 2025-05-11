// Buttons Selectors

const numberButtons = document.querySelectorAll('.number_button');
const operatorButtons = document.querySelectorAll('.operator_button');
const equalButton = document.querySelector('#btn-equals');
const clearButton = document.querySelector('#btn-clear');
const backSpaceButton = document.querySelector('#btn-backspace');
const displayResult = document.querySelector('#result');

// Booleans 

let isDisplayEmpty = true;
let isJokeMessage = false;


// Error message

let JokeMessage = `Well, if you're dividing by zero, you're not doing math — you're performing an act of metaphysical rebellion against reality itself.`

// operation object: Operands and operator stored as strings for display purposes.    
// Parsed into numbers inside evaluateExpression() only when needed.

let operation = {    
    firstOperand: '', 
    secondOperand: '',
    operator: '',
};

// Round Result:

const roundResult = (n) => Math.round(n * 1000) /1000;


// Number Buttons Event Listener

numberButtons.forEach((button) => { 
    button.addEventListener('click', (e) => {
       appendOperand(button.textContent, e.target.id);
    }) 
})

// Operator Buttons Event Listener



operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
         // Pass an operator if its empty || or switch operator if there's no secondOperand 
        if (button.textContent != operation.operator && operation.secondOperand === '') {
            appendOperator(button.textContent);
            console.log(`${operation.operator}`)
        }
        // If the same operator is pressed twice, evaluate firstOperand with self 
        else if (operation.secondOperand === '') {
            evaluateExpression(operation.firstOperand, operation.firstOperand, operation.operator);  
        }
    })
});

// Equal Button Event Listener


equalButton.addEventListener('click', () => {
    evaluateExpression(operation.firstOperand, operation.secondOperand, operation.operator);
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
    switch(e.key) {
        case 'Enter':
            evaluateExpression(operation.firstOperand, operation.secondOperand, operation.operator);
        break;
        case 'Escape':
            clearFunction();
        break;
        case 'Backspace':
            backspaceFunction();
        break;
        case '/':
            operation.operator != '÷'  
            ? appendOperator('÷')
            : evaluateExpression(operation.firstOperand, operation.firstOperand, '÷')
        break;
        case '*':
            operation.operator != 'x' 
            ? appendOperator('x')
            : evaluateExpression(operation.firstOperand, operation.firstOperand, 'x')
        break;
        case '+':
            e.key != operation.operator 
            ? appendOperator(e.key)
            : evaluateExpression(operation.firstOperand, operation.firstOperand, operation.operator)
        break;
        case '-':
            e.key != operation.operator 
            ? appendOperator(e.key)
            : evaluateExpression(operation.firstOperand, operation.firstOperand, operation.operator)
        break;   
        case '%':
            e.key != operation.operator 
            ? appendOperator(e.key)
            : evaluateExpression(operation.firstOperand, operation.firstOperand, operation.operator)
        break;
        case '0':
            appendOperand(e.key, e.key);
        break;
        case '1':
            appendOperand(e.key, e.key);
        break;
        case '2':
            appendOperand(e.key, e.key);
        break;
        case '3':
            appendOperand(e.key, e.key);
        break;
        case '4':
            appendOperand(e.key, e.key);
        break;
        case '5':
            appendOperand(e.key, e.key);
        break;
        case '6':
            appendOperand(e.key, e.key);
        break;
        case '7':
            appendOperand(e.key, e.key);
        break;
        case '8':
            appendOperand(e.key, e.key);
        break;
        case '9':
            appendOperand(e.key, e.key);
        break;
        case '.':
            appendOperand(e.key, e.key);
        break;
    }
})

// Operate function

const operate = function(firstOperand, secondOperand, operator) {
    let result;
    switch(operator) {
        case '÷': 
            result = mathFunctions.divide(firstOperand, secondOperand);
         
            break;
        case 'x':
            result = mathFunctions.multiply(firstOperand, secondOperand);
            break;
        case '+':
            result = mathFunctions.add(firstOperand, secondOperand);
            break;
        case '-':
            result = mathFunctions.subtract(firstOperand, secondOperand);
            break;
        case '%':
            result = mathFunctions.remainder(firstOperand, secondOperand);
            break;
        default:
            result = 0;
    }
    // Check if divided by zero to return error message
    if (secondOperand === 0 && operator === '÷' || secondOperand === 0 && operator === '%' ) {
        result = JokeMessage;
        isJokeMessage = true;
    }
    else {
        roundResult(result); 
    }
    // Display the result & assign the result to the first operand
    displayResult.textContent = result;
    operation.firstOperand = result;
    operation.secondOperand = '';
    operation.operator = '';
    isDisplayEmpty = true;
}

// Math functions

const mathFunctions = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    divide: (a, b) => a / b,
    multiply: (a, b) => a * b,
    remainder: (a, b) => a % b
}





const resetOperation = function() {
        displayResult.textContent = '';
        operation.firstOperand = '';
        isDisplayEmpty = false;
        isJokeMessage = false;
}

// Append Operand Function

const appendOperand = function(operandValue) {
    if (isDisplayEmpty && !operation.operator) { // This condition allows to reset in case the user types a new number after getting a result
        resetOperation();
    }
    let targetOperand = !operation.operator ? 'firstOperand' : 'secondOperand';
    let currentOperand = operation[targetOperand];
    if (operandValue === '.' && currentOperand.length < 1) { // When display is empty, append a single followed by a decimal
        operation[targetOperand] += `0${operandValue}`;
        displayResult.textContent += `0${operandValue}`;
    }
    else if (operandValue === '.' && !currentOperand.includes('.')) { // Append a decimal, only if it doesn't exist yet
        operation[targetOperand] += operandValue;
        displayResult.textContent += operandValue;
    }
    else if (currentOperand === '0' && currentOperand.length == 1) { // Append a single 0 if there's no value or remove a leading zero
        if (targetOperand == 'secondOperand') {
            operation[targetOperand] = operandValue;
            displayResult.textContent = operation.firstOperand + operation.operator + operandValue;
        }
        else {
            operation[targetOperand] = operandValue;
            displayResult.textContent = operandValue;
        }
    }
    else if (currentOperand.length <= 12 && operandValue != '.'){ // Limit the amount of digits to 12 and prevent from adding a second decimal
        operation[targetOperand] += operandValue;
        displayResult.textContent += operandValue;
    }
};

const appendOperator = function(operator) {
    if (operation.firstOperand && !isJokeMessage) { // prevents behavior where a new operation can be started when joke message is displayed
        operation.operator = '';
        operation.operator = operator;
        displayResult.textContent = operation.firstOperand + operator;
    }
}

const evaluateExpression = function(a, b, operator) {
    if (a && b) {
        firstOperand = parseFloat(a);
        secondOperand = parseFloat(b);
        operate(firstOperand, secondOperand, operator);
    }
}

const clearFunction = function() {
    operation.firstOperand = '';
    operation.secondOperand = '';
    operation.operator = '';
    isDisplayEmpty = true;
    displayResult.textContent = '';
};

const backspaceFunction = function() {
    if (operation.secondOperand.length >= 1) {
        operation.secondOperand = operation.secondOperand.slice(0, -1);
        displayResult.textContent = displayResult.textContent.slice(0,-1);
    }
    else if (operation.operator.length == 1) {
        operation.operator = operation.operator.slice(0, -1);
        displayResult.textContent = displayResult.textContent.slice(0,-1); 
    }
    else if (typeof operation.firstOperand === 'number' || isJokeMessage) { // Clear everything in case the first operand                                                                
        operation.firstOperand = '';                                       // is the result of a previous calculation or is 
        operation.secondOperand = '';                                     // the mocking message when dividing by zero
        operation.operator = '';
        isDisplayEmpty = true;
        isJokeMessage = false;
        displayResult.textContent = '';
    }
    else if (operation.firstOperand.length >= 1) {
        operation.firstOperand = operation.firstOperand.slice(0, -1);
        displayResult.textContent = displayResult.textContent.slice(0,-1);
    }
};

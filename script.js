// Buttons Selectors

const numberButtons = document.querySelectorAll('.number_button');
const operatorButtons = document.querySelectorAll('.operator_button');
const equalButton = document.querySelector('#btn-equals');
const clearButton = document.querySelector('#btn-clear');
const backSpaceButton = document.querySelector('#btn-backspace');
const displayResult = document.querySelector('#result');

// Booleans 

let isDisplayEmpty = true;
let isDecimalEmpty = true;
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
       numberButtonsFunction(button.textContent, e.target.id);
    }) 
})

// Operator Buttons Event Listener



operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.textContent != operation.operator 
         // Pass an operator if its empty || or switch previous operator
        ? operatorButtonsFunction(button.textContent)         
        // If the same operator is pressed twice, evaluate firstOperand with self     
        : evaluateExpression(operation.firstOperand, operation.firstOperand, operation.operator);   
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
            ? operatorButtonsFunction('÷')
            : evaluateExpression(operation.firstOperand, operation.firstOperand, '÷')
        break;
        case '*':
            operation.operator != 'x' 
            ? operatorButtonsFunction('x')
            : evaluateExpression(operation.firstOperand, operation.firstOperand, 'x')
        break;
        case '+':
            e.key != operation.operator 
            ? operatorButtonsFunction(e.key)
            : evaluateExpression(operation.firstOperand, operation.firstOperand, operation.operator)
        break;
        case '-':
            e.key != operation.operator 
            ? operatorButtonsFunction(e.key)
            : evaluateExpression(operation.firstOperand, operation.firstOperand, operation.operator)
        break;   
        case '%':
            e.key != operation.operator 
            ? operatorButtonsFunction(e.key)
            : evaluateExpression(operation.firstOperand, operation.firstOperand, operation.operator)
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
    isDecimalEmpty = true;
}

// Math functions

const mathFunctions = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    divide: (a, b) => a / b,
    multiply: (a, b) => a * b,
    remainder: (a, b) => a % b
}



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
    isDecimalEmpty = true;
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
        isDecimalEmpty = true;
        isJokeMessage = false;
        displayResult.textContent = '';
    }
    else if (operation.firstOperand.length >= 1) {
        operation.firstOperand = operation.firstOperand.slice(0, -1);
        displayResult.textContent = displayResult.textContent.slice(0,-1);
    }
};

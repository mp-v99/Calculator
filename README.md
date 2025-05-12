# Calculator

Calculator 🧮

Built with ❤️ during The Odin Project Foundations

🚀 Introduction

This project marks the finale of The Odin Project’s Foundations course where I, overall, obsessed with preventing unexpected behaviors. 

Give it a go and let me know if you managed to get a NaN or any sort of unexpected behavior!

🌌Discord:  

mp_v99_95592 

📤 Deployment

Live Preview: https://mp-v99.github.io/Calculator/

## 📸 Screenshots

![Calculator Screenshot](icon/Calculator_screenshot.png)

✅ Edge Cases Accounted For:

Prevents multiple decimal points in a single operand.

Ensures leading zeroes aren’t stacked (e.g., avoids 0000).

Displays 0. if a decimal is first input with an empty operand.

Handles toggle of negative values using string-wrapped format (-x).

Handles toggling negative values back cleanly, even with nested parentheses.

Correctly parses negative numbers before evaluation.

Checks for division by zero and shows a joke error message.

Blocks operations if joke message is showing.

Resets operation if user starts new input after a result is shown.

Clears all values when joke message is active during backspace.

Backspace undoes negative sign wrapping if applicable.

Restricts number of digits to 12 per operand for UX consistency.

Backspace handles all three inputs (first operand, operator, second operand).

Equals can operate on single operand by repeating it if second is missing.

Operators can be reassigned if second operand is empty.

Decimal input is blocked on negative-wrapped numbers (prevents corruption).

Key bindings match all relevant operations, including n for ±.

Ensures joke message isn’t parsed as a number.

Rounds result to 3 decimal places only after calculating.

Display updates match operand editing contextually, even when slicing.

Operands reset correctly after equals, enabling chaining calculations.

Operands and operator reset properly on clear and backspace.

Operator replacement is blocked when joke message is active.

Operator buttons prevent re-adding same operator if already present.

✨ Features
Basic arithmetic operations: add, subtract, multiply, divide

Chained calculations using result memory (e.g. 3 + 4 → = → + 5)

Decimal support with input validation

Snarky error handling (including division by zero)

Clear button to reset the calculator state

Backspace functionality to delete last digit

Display overflow prevention with rounding

Full keyboard support for a seamless user experience

💎 Extra Credit
✅ Support for floating point input via . button

✅ Decimal validation (only one decimal per number)

✅ Backspace button for undoing inputs

✅ Full keyboard support for digits, operators, equals, clear, and backspace

✅ Smart state reset when starting a new calculation after displaying a result

✅ Defensive logic for edge cases like consecutive operators or premature = presses

🧪 Tech Used

HTML – semantic layout

CSS3 – responsive and clean styling

JavaScript – all logic and interaction

Git – version control

GitHub – deployment & commits




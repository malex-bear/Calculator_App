// functionality.js

let currentDisplay = '';
let operator = null;
let resetDisplay = false;

function clearDisplay() {
    currentDisplay = '';
    operator = null;
    resetDisplay = false;
    updateDisplay('0');
}

function deleteLast() {
    currentDisplay = currentDisplay.slice(0, -1) || '0';
    updateDisplay(currentDisplay);
}

function appendNumber(number) {
    if (resetDisplay) {
        currentDisplay = '';
        resetDisplay = false;
    }
    if (number === '.' && currentDisplay.includes('.')) return;
    currentDisplay += number;
    updateDisplay(currentDisplay);
}

function appendOperator(op) {
    if (currentDisplay === '') return;
    if (operator !== null) calculateResult();
    operator = op;
    currentDisplay += ` ${op} `;
    updateDisplay(currentDisplay);
}

function calculateResult() {
    try {
        currentDisplay = eval(currentDisplay.replace('×', '*').replace('÷', '/')).toString();
        operator = null;
        resetDisplay = true;
        updateDisplay(currentDisplay);
    } catch (error) {
        updateDisplay('error');
        currentDisplay = '';
    }
}

function updateDisplay(value) {
    document.getElementById('display').innerText = value;
}

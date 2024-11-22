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
        currentDisplay = ''; // Clear the display for a new expression
        resetDisplay = false;
    }

    currentDisplay += number;
    updateDisplay(currentDisplay);
}

function addParenthesis(){
    const openCount = (currentDisplay.match(/\(/g) || []).length;
    const closeCount = (currentDisplay.match(/\)/g) || []).length;

    if (openCount > closeCount) {
        // Add a closing parenthesis if open count is greater
        currentDisplay += ')';
    } else {
        // Otherwise, add an opening parenthesis
        currentDisplay += '(';
    }

    updateDisplay(currentDisplay);
}

function appendOperator(op) {
    if (currentDisplay === '') return; // Prevent starting with an operator

    if (/\s[+\-×÷^]\s$/.test(currentDisplay)) {
        currentDisplay = currentDisplay.slice(0, -3); // Remove the trailing operator
    }

    operator = op;

    currentDisplay += ` ${op} `;
    resetDisplay = false;
    updateDisplay(currentDisplay);
}

function calculateResult() {
    try {
        // Replace custom operators with JavaScript operators for evaluation
        const sanitizedExpression = currentDisplay
            .replace(/\^/g, '**') // Replace exponentiation
            .replace(/×/g, '*')   // Replace multiplication
            .replace(/÷/g, '/');  // Replace division

        currentDisplay = eval(sanitizedExpression).toString();
        resetDisplay = true; // Set reset flag to allow new input
        updateDisplay(currentDisplay);
    } catch (error) {
        updateDisplay('error'); 
        currentDisplay = ''; 
    }
}

const settingsBtn = document.getElementById('options');
const toolbar = document.querySelector('.menu');
const themeButtons = document.querySelectorAll('.theme-btn');

// Alternar visibilidade da barra
settingsBtn.addEventListener('click', () => {
    toolbar.classList.toggle('visible');
});

// Aplicar tema ao clicar nos botões
themeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const theme = e.target.dataset.theme;
        const calculator = document.querySelector('.calculator');
        calculator.className = 'calculator'; // Reset classes
        if (theme === 'Sunset Breeze') {
            calculator.classList.add('sunset-Breeze');
        } else if (theme === 'Moonlight') {
            calculator.classList.add('moonlight');
        } else if (theme === 'Radiant Joy') {
            calculator.classList.add('radiant-joy');
        }
    });
});

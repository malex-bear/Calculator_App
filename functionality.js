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

function updateDisplay(value) {
    const display = document.getElementById('display');
    display.innerText = value;

    // Ajustar o tamanho da fonte com base no comprimento do texto
    const maxLength = 15; // Comprimento máximo antes de diminuir o texto
    const minFontSize = 18; // Tamanho mínimo da fonte
    const maxFontSize = 35; // Tamanho máximo da fonte

    // Determinar o tamanho da fonte com base no comprimento do texto
    let fontSize = maxFontSize;

    if (value.length > maxLength) {
        const scale = Math.max(minFontSize, maxFontSize - (value.length - maxLength) * 2);
        fontSize = scale;
    }

    display.style.fontSize = `${fontSize}px`;
}


const settingsBtn = document.getElementById('options');
const toolbar = document.querySelector('.menu');
const themeButtons = document.querySelectorAll('.theme-btn');

// Alternar visibilidade da barra
settingsBtn.addEventListener('click', () => {
    toolbar.classList.toggle('visible');
});

// Seleciona todos os botões de tema
document.querySelectorAll('.theme-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const theme = e.target.dataset.theme; // Obtemos o tema do atributo data-theme
        const body = document.body;

        // Remove quaisquer classes de tema existentes no body
        body.className = 'moonlight'; 

        // Adiciona a classe correspondente ao tema escolhido
        if (theme === 'sunset') {
            body.classList.add('sunset');
        } else if (theme === 'moonlight') {
            body.classList.add('moonlight');
        } else if (theme === 'radiant') {
            body.classList.add('radiant');
        }
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;

    event.preventDefault();

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '^') {
        appendOperator(key === '*' ? '×' : key === '/' ? '÷' : key);
    } else if (key === '(' || key === ')') {
        addParenthesis(key);
    }
});



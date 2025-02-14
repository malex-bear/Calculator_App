let isScientificMode = false;

document.getElementById('toggleScientificMode').addEventListener('click', () => {
    isScientificMode = !isScientificMode;

    // Alternar entre os modos
    document.querySelector('.calculator').style.display = isScientificMode ? 'none' : 'block';
    document.querySelector('.scientific-calculator').style.display = isScientificMode ? 'block' : 'none';

    // Alterar o texto do botão
    document.getElementById('toggleScientificMode').innerText = isScientificMode ? 'Modo Padrão' : 'Modo Científico';
});

// Função para adicionar funções científicas
function appendFunction(func) {
    if (resetDisplay) {
        currentDisplay = '';
        resetDisplay = false;
    }
    currentDisplay += func + '(';
    updateDisplay(currentDisplay);
}

// Função para calcular resultados com funções científicas
function calculateResult() {
    try {
        let result = currentDisplay;
        result = result.replace(/\^/g, '**')
                        .replace(/×/g, '*')
                        .replace(/÷/g, '/')
                        .replace(/sqrt/g, 'Math.sqrt')
                        .replace(/sin/g, 'Math.sin')
                        .replace(/cos/g, 'Math.cos')
                        .replace(/tan/g, 'Math.tan')
                        .replace(/log/g, 'Math.log10')
                        .replace(/ln/g, 'Math.log');
        currentDisplay = eval(result).toString();
        resetDisplay = true;
        updateDisplay(currentDisplay);
    } catch (error) {
        updateDisplay('error');
        currentDisplay = ''; 
    }
}

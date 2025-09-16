let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;
let lastResult = null;
let isNewCalculation = true;

function appendToDisplay(value) {
    const display = document.getElementById('display');
    
    
    if (value === '×') value = '*';
    if (value === '÷') value = '/'; 
    
    
    if (isNewCalculation && !['+', '-', '*', '/'].includes(value)) {
        clearDisplay();
        isNewCalculation = false;
    }
    
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    if (value === '.' && display.value.includes('.')) {
        return;
    }
    
    if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
        return;
    }
    
    display.value += value;
    currentInput = display.value;
}

function handleOperator(op) {
    const display = document.getElementById('display');
    
    if (display.value === '' && op === '-') {
        display.value = '-';
        return;
    }
    
    if (display.value !== '' && display.value !== '-') {
        
        if (operator && previousInput) {
            calculate(false); 
        } else {
            previousInput = display.value;
        }
        
        operator = op;
        shouldResetDisplay = true;
        isNewCalculation = false;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
    shouldResetDisplay = false;
    lastResult = null;
    isNewCalculation = true;
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    currentInput = display.value;
}

function calculate(resetForNewCalculation = true) {
    const display = document.getElementById('display');
    
    if (operator && previousInput && currentInput) {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    display.value = 'Erro: Div/0';
                    setTimeout(clearDisplay, 2000);
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result.toString();
        previousInput = result.toString();
        lastResult = result;
        
        if (resetForNewCalculation) {
            operator = '';
            shouldResetDisplay = true;
            isNewCalculation = true;
        } else {
            
            shouldResetDisplay = true;
            isNewCalculation = false;
        }
    }
}


document.addEventListener('keydown', function(event) {
    let key = event.key;
    
    // Mapear × e ÷ para * e /
    if (key === '×') key = '*';
    if (key === '÷') key = '/';
    
    if ('0123456789.'.includes(key)) {
        appendToDisplay(key);
    } else if ('+-*/'.includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    }
});

document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', function() {
        let op = this.textContent;
        if (op === '×') op = '*';
        if (op === '÷') op = '/';
        
        if (isNewCalculation && lastResult !== null) {
            
            document.getElementById('display').value = lastResult;
            previousInput = lastResult.toString();
            currentInput = '';
            operator = op;
            shouldResetDisplay = true;
            isNewCalculation = false;
        }
    });
});
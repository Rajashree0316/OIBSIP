const input = document.getElementById('input');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');
const themeToggle = document.getElementById('themeToggle');
const modeText = document.getElementById('modeText');

let currentInput = '';
let lastAnswer = '';

function updateDisplay() {
  input.textContent = currentInput;
}

buttons.forEach(button => {
  button.addEventListener('click', () => handleInput(button.textContent));
});

function handleInput(value) {
  switch (value) {
    case 'clear':
      currentInput = '';
      result.textContent = '';
      break;
    case 'del':
      currentInput = currentInput.slice(0, -1);
      break;
    case 'ans':
      currentInput += lastAnswer;
      break;
    case 'ENTER':
      calculate();
      break;
    case '±':
      if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
      } else {
        currentInput = '-' + currentInput;
      }
      break;
    default:
      currentInput += value;
  }
  updateDisplay();
}

function calculate() {
  try {
    let expression = currentInput.replace(/√/g, 'Math.sqrt');
    let evaluated = eval(expression);
    if (evaluated !== undefined) {
      result.textContent = evaluated;
      lastAnswer = evaluated;
    }
  } catch {
    result.textContent = 'Error';
  }
}

/* ----------------------------
   KEYBOARD SUPPORT
---------------------------- */
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '%', '.', '(', ')'].includes(e.key)) {
    currentInput += e.key;
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } else if (e.key === 'Escape') {
    currentInput = '';
    result.textContent = '';
  }
  updateDisplay();
});

/* ----------------------------
   THEME TOGGLE LOGIC
---------------------------- */
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    modeText.textContent = 'Dark Mode';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    modeText.textContent = 'Light Mode';
  }
});

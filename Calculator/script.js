const input = document.getElementById('input');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');
const themeToggle = document.getElementById('themeToggle');
const modeText = document.getElementById('modeText');

let currentInput = '';
let lastAnswer = '';

function updateDisplay() {
  input.textContent = currentInput;
  autoResizeText(); // ensures text fits nicely
}

function autoResizeText() {
  const display = document.getElementById('input');
  const maxFontSize = 20;
  const minFontSize = 10;
  let fontSize = maxFontSize;

  // Reset to max font size first
  display.style.fontSize = maxFontSize + 'px';

  // Reduce font size dynamically if text overflows
  while (display.scrollWidth > display.clientWidth && fontSize > minFontSize) {
    fontSize -= 1;
    display.style.fontSize = fontSize + 'px';
  }
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

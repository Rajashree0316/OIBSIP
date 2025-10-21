// Register Page
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    if (localStorage.getItem(username)) {
      showMessage('registerMessage', 'User already exists!');
    } else {
      localStorage.setItem(username, password);
      showMessage('registerMessage', 'Registered successfully! Redirecting...', 'green');
      setTimeout(() => (window.location.href = "index.html"), 1200);
    }
  });
}

// Login Page
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
      localStorage.setItem("loggedInUser", username);
      window.location.href = "secure.html";
    } else {
      showMessage('loginMessage', 'Invalid username or password!');
    }
  });
}

// Secure Page
const welcomeUser = document.getElementById('welcomeUser');
if (welcomeUser) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "index.html";
  } else {
    welcomeUser.textContent = `Hello, ${user}! You are successfully logged in 🎉`;
  }
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}

// Helper function
function showMessage(id, text, color = "red") {
  const el = document.getElementById(id);
  el.style.color = color;
  el.textContent = text;
}

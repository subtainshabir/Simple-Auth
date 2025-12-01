const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');

const passwordInput = document.getElementById('reg-password');
const passwordMeter = document.getElementById('password-strength-meter');
const passwordStrengthText = document.getElementById('password-strength-text');

function setActiveForm(formToShow) {
  if (formToShow === 'register') {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    showRegisterBtn.classList.add('active');
    showLoginBtn.classList.remove('active');
  } else {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    showLoginBtn.classList.add('active');
    showRegisterBtn.classList.remove('active');
  }
}

showRegisterBtn.addEventListener('click', () => setActiveForm('register'));
showLoginBtn.addEventListener('click', () => setActiveForm('login'));

// Password strength logic
function evaluatePasswordStrength(password) {
  let score = 0;
  if (!password) return score;

  // Length points
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Contains lowercase and uppercase
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;

  // Contains number or special char
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  const strength = evaluatePasswordStrength(val);
  passwordMeter.value = strength;

  let strengthMsg = '';
  switch (strength) {
    case 0:
    case 1:
      strengthMsg = 'Very Weak';
      break;
    case 2:
      strengthMsg = 'Weak';
      break;
    case 3:
      strengthMsg = 'Good';
      break;
    case 4:
      strengthMsg = 'Strong';
      break;
  }
  passwordStrengthText.textContent = strengthMsg;
});

// Simple form validation and error display
function showError(input, message) {
  const inputGroup = input.parentElement;
  inputGroup.classList.add('error');
  const errorMsg = inputGroup.querySelector('.error-msg');
  if (errorMsg) {
    errorMsg.textContent = message;
  }
}

function clearError(input) {
  const inputGroup = input.parentElement;
  inputGroup.classList.remove('error');
  const errorMsg = inputGroup.querySelector('.error-msg');
  if (errorMsg) {
    errorMsg.textContent = '';
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// frontend/script.js
async function login(username, password) {
  const response = await fetch("http://localhost:8000/api/login/", {   // use host:port for browser
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return response.json();
}


registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  // Name validation
  const nameInput = registerForm.querySelector('#reg-name');
  if (!nameInput.value.trim()) {
    showError(nameInput, 'Full name is required');
    valid = false;
  } else {
    clearError(nameInput);
  }

  // Email validation
  const emailInput = registerForm.querySelector('#reg-email');
  if (!emailInput.value.trim()) {
    showError(emailInput, 'Email is required');
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'Email is not valid');
    valid = false;
  } else {
    clearError(emailInput);
  }

  // Password validation
  const passwordVal = passwordInput.value;
  if (!passwordVal) {
    showError(passwordInput, 'Password is required');
    valid = false;
  } else if (passwordMeter.value < 3) {
    showError(passwordInput, 'Password is too weak');
    valid = false;
  } else {
    clearError(passwordInput);
  }

  // Confirm password validation
  const confirmPasswordInput = registerForm.querySelector('#reg-confirm-password');
  if (confirmPasswordInput.value !== passwordVal) {
    showError(confirmPasswordInput, 'Passwords do not match');
    valid = false;
  } else {
    clearError(confirmPasswordInput);
  }

  // Terms checkbox validation
  const termsCheckbox = registerForm.querySelector('#terms');
  if (!termsCheckbox.checked) {
    showError(termsCheckbox, 'You must agree to the terms');
    valid = false;
  } else {
    clearError(termsCheckbox);
  }

  if (valid) {
    alert('Registration successful (demo)');
    registerForm.reset();
    passwordMeter.value = 0;
    passwordStrengthText.textContent = '';
  }
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  const emailInput = loginForm.querySelector('#login-email');
  if (!emailInput.value.trim()) {
    showError(emailInput, 'Email is required');
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'Email is not valid');
    valid = false;
  } else {
    clearError(emailInput);
  }

  const passwordInputLogin = loginForm.querySelector('#login-password');
  if (!passwordInputLogin.value) {
    showError(passwordInputLogin, 'Password is required');
    valid = false;
  } else {
    clearError(passwordInputLogin);
  }

  if (valid) {
    alert('Login successful (demo)');
    loginForm.reset();
  }
});
const wrapper = document.querySelector('.wrapper');
const loginForm = document.querySelector('.login');
const registerForm = document.querySelector('.register');

function showLoginForm() {
  wrapper.classList.remove('expand-wrapper');
  loginForm.classList.remove('expand');
  registerForm.classList.add('expand');
}

function showRegisterForm() {
  wrapper.classList.remove('expand-wrapper');
  loginForm.classList.add('expand');
  registerForm.classList.remove('expand');
}

function exitForm() {
  wrapper.classList.add('expand-wrapper');
  loginForm.classList.add('expand');
  registerForm.classList.add('expand');
}


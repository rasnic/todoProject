export function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validateLogin({ email, password }) {
  if (!email || !password) {
    return 'Email and password are required';
  }
  if (!validateEmail(email)) {
    return 'Invalid email';
  }
  return '';
}
export function validateRegister({ email, password, name }) {
  if (!email || !password || !name) {
    return 'Email, password, and full name are required';
  }
  if (!validateEmail(email)) {
    return 'Invalid email';
  }
  if (password.length < 3) {
    return 'Password must be at least 3 characters';
  }
  if (name.length < 5) {
    return 'Full name must be at least 5 characters';
  }
  return '';
}

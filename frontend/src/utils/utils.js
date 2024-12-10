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

export function optionsToSelectOptions(options) {
  return Object.keys(options).map((key, index) => ({
    label: options[key],
    value: parseInt(key, 10),
  }));
}

export const formatDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const timeDifferenceFromNow = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};
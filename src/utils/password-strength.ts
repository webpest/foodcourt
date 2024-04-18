export function getPasswordStrength(password: string): string {
  if (password.length === 0) return "";
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    password.length >= 10 &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  ) {
    return "Hard";
  } else if ((hasUppercase || hasLowercase) && hasSpecialChar) {
    return "Medium";
  } else {
    return "Easy";
  }
}

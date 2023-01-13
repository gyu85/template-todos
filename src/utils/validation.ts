export const isEmailValid = (value: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};

export const isPasswordValid = (value: string) => {
  return /(?=.*\d{1,20})(?=.*[a-zA-Z]{1,20}).{8,20}$/.test(value);
};

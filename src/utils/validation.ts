import * as Yup from 'yup';

export const usernameValidation = Yup.string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
  .required('Username is required');

export const emailValidation = Yup.string()
  .email('Invalid email address')
  .required('Email is required');

export const passwordValidation = Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .max(32, 'Password must be at most 32 characters')
  .required('Password is required');

export const usernameOrEmailValidation = Yup.string()
  .test('username-or-email', 'Enter a valid username or email', function (value) {
    if (!value) return false;
    const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);
    return isEmail || isUsername;
  })
  .required('Username or Email is required');

export const loginValidationSchema = Yup.object({
  usernameOrEmail: usernameOrEmailValidation,
  password: passwordValidation,
});

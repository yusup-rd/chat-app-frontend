import * as Yup from 'yup';

const usernameValidation = Yup.string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
  .required('Username is required');

const emailValidation = Yup.string().email('Invalid email address').required('Email is required');

const passwordValidation = Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .max(32, 'Password must be at most 32 characters')
  .required('Password is required');

const usernameOrEmailValidation = Yup.string()
  .test('username-or-email', 'Enter a valid username or email', function (value) {
    if (!value) return false;
    const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);
    return isEmail || isUsername;
  })
  .required('Username or Email is required');

const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
  .required('Confirm Password is required');

const nameValidation = Yup.string()
  .min(2, 'Name must be at least 2 characters')
  .max(30, 'Name must be at most 30 characters')
  .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .required('Name is required');

const genderValidation = Yup.string()
  .oneOf(['male', 'female'], 'Gender must be either male or female')
  .required('Gender is required');

const dobValidation = Yup.string()
  .required('Birthday is required')
  .test('valid-date', 'Enter a valid date', (value) => {
    if (!value) return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
  })
  .test('not-in-future', 'Birthday cannot be in the future', (value) => {
    if (!value) return false;
    const date = new Date(value);
    return date <= new Date();
  });

const horoscopeValidation = Yup.string().required('Horoscope is required');

const zodiacValidation = Yup.string().required('Zodiac is required');

const heightValidation = Yup.number()
  .typeError('Height must be a number')
  .min(50, 'Height must be at least 50 cm')
  .max(300, 'Height must be at most 300 cm')
  .required('Height is required');

const weightValidation = Yup.number()
  .typeError('Weight must be a number')
  .min(20, 'Weight must be at least 20 kg')
  .max(500, 'Weight must be at most 500 kg')
  .required('Weight is required');

export const loginValidationSchema = Yup.object({
  usernameOrEmail: usernameOrEmailValidation,
  password: passwordValidation,
});

export const registerValidationSchema = Yup.object({
  email: emailValidation,
  username: usernameValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

export const profileValidationSchema = Yup.object({
  name: nameValidation,
  gender: genderValidation,
  dob: dobValidation,
  horoscope: horoscopeValidation,
  zodiac: zodiacValidation,
  height: heightValidation,
  weight: weightValidation,
});

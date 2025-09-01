'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerValidationSchema } from '@/utils/validation';
import { useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { registerUser } from '@/api/auth';
import { ErrorResponse } from '@/types/error';
import { RegisterRequest } from '@/types/auth';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const payload: RegisterRequest = {
        email: values.email,
        username: values.username,
        password: values.password,
      };
      await registerUser(payload);
      toast.success('Registration successful');
      router.push('/login');
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="flex w-full flex-col gap-5">
          <h1 className="ml-3 text-2xl font-bold">Register</h1>

          {/* Username */}
          <div className="flex flex-col gap-3">
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="on"
              className="rounded-lg bg-white/6 px-5 py-3 text-sm font-medium"
            />
            <ErrorMessage name="email" component="div" className="mt-1 text-xs text-red-500" />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-3">
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Create Username"
              autoComplete="on"
              className="rounded-lg bg-white/6 px-5 py-3 text-sm font-medium"
            />
            <ErrorMessage name="username" component="div" className="mt-1 text-xs text-red-500" />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="relative w-full">
              <Field
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                autoComplete="on"
                placeholder="Create Password"
                className="w-full rounded-lg bg-white/6 px-5 py-3 pr-12 text-sm font-medium"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer p-1 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <LuEye className="size-5" /> : <LuEyeClosed className="size-5" />}
              </button>
            </div>
            <ErrorMessage name="password" component="div" className="mt-1 text-xs text-red-500" />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <div className="relative w-full">
              <Field
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="on"
                placeholder="Confirm Password"
                className="w-full rounded-lg bg-white/6 px-5 py-3 pr-12 text-sm font-medium"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer p-1 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <LuEye className="size-5" />
                ) : (
                  <LuEyeClosed className="size-5" />
                )}
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="mt-1 text-xs text-red-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
            className="from-primary-gradient-1 to-primary-gradient-2 rounded-lg bg-gradient-to-r px-5 py-3 font-bold duration-200 not-disabled:cursor-pointer not-disabled:hover:shadow-[0_2px_6px_-2px_var(--primary-gradient-1),0_4px_8px_-4px_var(--primary-gradient-2)] disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;

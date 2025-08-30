import LoginForm from '@/components/Forms/LoginForm';
import { Formik } from 'formik';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa6';

const Login = () => {
  return (
    <div className="space-y-10">
      <button className="mx-5 flex h-14 items-center justify-center gap-1">
        <FaChevronLeft className="size-3.5" />
        <span className="text-sm font-bold">Back</span>
      </button>

      <div className="mx-10">
        <LoginForm />
      </div>

      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <p>No Account?</p>
        <Link href="/register" className="text-link underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;

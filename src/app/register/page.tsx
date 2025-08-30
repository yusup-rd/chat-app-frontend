import RegisterForm from '@/components/Forms/RegisterForm';
import Link from 'next/link';
import Header from '@/components/Layout/Header';

const Register = () => {
  return (
    <div className="radial-bg min-h-screen space-y-10">
      <Header />

      <div className="mx-10 space-y-5 md:mx-auto md:max-w-xl">
        <RegisterForm />

        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <p>Have an account?</p>
          <Link href="/login" className="text-link underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

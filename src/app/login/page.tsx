import LoginForm from '@/components/Forms/LoginForm';
import Header from '@/components/Layout/Header';
import Link from 'next/link';

const Login = () => {
  return (
    <div className="radial-bg min-h-screen space-y-10">
      <Header />

      <div className="mx-10 space-y-5 md:mx-auto md:max-w-xl">
        <LoginForm />

        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <p>No Account?</p>
          <Link href="/register" className="text-link underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

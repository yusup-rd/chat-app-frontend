import RegisterForm from '@/components/Forms/RegisterForm';
import Link from 'next/link';
import BackButton from '@/components/Layout/BackButton';

const Register = () => {
  return (
    <div className="radial-bg min-h-screen space-y-10">
      <BackButton />

      <div className="mx-10">
        <RegisterForm />
      </div>

      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <p>Have an account?</p>
        <Link href="/login" className="text-link underline">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;

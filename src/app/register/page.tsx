'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import RegisterForm from '@/components/Forms/RegisterForm';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import LoadingPage from '@/app/loading';

const Register = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useLayoutEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingPage withRadialBg={true} />;
  }

  if (isAuthenticated) {
    return null;
  }

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

'use client';

import { useRouter } from 'next/navigation';
import { BiSolidError } from 'react-icons/bi';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <BiSolidError className="size-20" />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">404</h1>
          <h2 className="italic opacity-50">Page not found</h2>
        </div>
        <button
          className="from-primary-gradient-1 to-primary-gradient-2 cursor-pointer rounded bg-linear-to-r px-3 py-1 text-sm font-semibold duration-200 hover:scale-105"
          onClick={() => router.push('/')}
        >
          Home
        </button>
      </div>
    </div>
  );
}

'use client';

import { FaChevronLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="mx-5 flex h-14 cursor-pointer items-center justify-center gap-1"
      onClick={() => router.back()}
    >
      <FaChevronLeft className="size-3.5" />
      <span className="text-sm font-bold">Back</span>
    </button>
  );
};

export default BackButton;

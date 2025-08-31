'use client';

import { useRouter } from 'next/navigation';
import { LuPencilLine } from 'react-icons/lu';

interface InterestsProps {
  interests?: string[];
}

const Interests = ({ interests = [] }: InterestsProps) => {
  const router = useRouter();

  return (
    <div className="bg-card flex flex-col justify-end gap-5 rounded-2xl p-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">Interests</h2>
        <button
          className="cursor-pointer rounded-full p-1.5 duration-200 hover:bg-white/10"
          aria-label="Edit Interests"
          onClick={() => {
            router.push('/profile/interests');
          }}
        >
          <LuPencilLine className="size-4" />
        </button>
      </div>

      {interests.length === 0 ? (
        <p className="text-sm font-medium opacity-50">
          Add in your interests to find a better match
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-white/6 px-4 py-2 text-sm font-semibold capitalize"
            >
              {interest}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interests;

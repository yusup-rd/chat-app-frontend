'use client';

import { FaChevronLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  username?: string;
  onSave?: () => void;
  isLoading?: boolean;
}

const Header = ({ username, onSave, isLoading }: HeaderProps) => {
  const router = useRouter();

  return (
    <div className="mx-5 flex h-14 items-center justify-between">
      {/* Back Button */}
      <div className="flex flex-1">
        <button
          className="flex cursor-pointer items-center justify-start gap-1"
          onClick={() => router.back()}
        >
          <FaChevronLeft className="size-3.5" />
          <span className="text-sm font-bold">Back</span>
        </button>
      </div>

      {/* Username Display */}
      <div className="flex flex-1 justify-center">
        {username && <div className="text-sm font-semibold">@{username}</div>}
      </div>

      {/* Save Button */}
      <div className="flex flex-1 justify-end">
        {onSave && (
          <button 
            className={`cursor-pointer text-sm font-semibold ${isLoading ? 'text-white/50' : 'cyan-text'}`}
            onClick={onSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

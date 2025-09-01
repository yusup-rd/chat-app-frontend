import { FaSpinner } from 'react-icons/fa6';

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <FaSpinner className="size-5 animate-spin" />
        <h2 className="font-semibold">Loading...</h2>
      </div>
    </div>
  );
}

import { FaSpinner } from 'react-icons/fa6';

interface LoadingPageProps {
  withRadialBg?: boolean;
}

export default function LoadingPage({ withRadialBg = false }: LoadingPageProps) {
  return (
    <div
      className={`flex min-h-screen items-center justify-center ${withRadialBg ? 'radial-bg' : ''}`}
    >
      <div className="flex flex-col items-center gap-4">
        <FaSpinner className="size-8 animate-spin text-white" />
        <h2 className="font-semibold text-white">Loading...</h2>
      </div>
    </div>
  );
}

import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-bold drop-shadow-lg">Welcome to Chat App!</h1>
      <div className="flex w-full max-w-xs flex-col gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-white/10 px-6 py-3 text-center font-semibold shadow duration-200 hover:bg-white/20"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-lg bg-white/10 px-6 py-3 text-center font-semibold shadow duration-200 hover:bg-white/20"
        >
          Register
        </Link>
        <Link
          href="/about"
          className="rounded-lg bg-white/10 px-6 py-3 text-center font-semibold shadow duration-200 hover:bg-white/20"
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default Home;

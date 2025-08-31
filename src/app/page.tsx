'use client';

import Link from 'next/link';
import Image from 'next/image';

const mockUsers = [
  { id: 1, name: 'Alice Johnson', avatar: '' },
  { id: 2, name: 'Bob Williams', avatar: '' },
  { id: 3, name: 'Charlie Kim', avatar: '' },
  { id: 4, name: 'Diana Lopez', avatar: '' },
];

const Home = () => {
  return (
    <div className="radial-bg flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-end rounded-b-lg px-6 py-4">
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/login" className="duration-200 hover:text-white/50">
            Login
          </Link>
          <Link href="/register" className="duration-200 hover:text-white/50">
            Register
          </Link>
          <Link href="/profile" className="duration-200 hover:text-white/50">
            Profile
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="my-10 flex flex-1 flex-col items-center justify-center px-5">
        <h1 className="gold-text mb-2 text-3xl font-bold drop-shadow-lg">Welcome to Chat App!</h1>
        <p className="mb-8 max-w-md text-center text-white/80 italic">
          Connect with friends, meet new people, and start conversations instantly. Whether
          you&apos;re here to chat casually or make lasting connections, our chat app is built for
          you.
        </p>

        {/* Feed Section */}
        <div className="flex items-center justify-center">
          <div className="grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-3">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center justify-center gap-5 rounded-lg bg-white/10 p-3"
              >
                <Image
                  src={user.avatar || '/avatars/avatar-placeholder.avif'}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="shrink-0 rounded-full"
                />
                <span className="w-full truncate text-center font-semibold">{user.name}</span>
                <div className="flex w-full items-center justify-between gap-2">
                  <button className="flex-1 cursor-pointer rounded bg-white/30 px-3 py-1 text-xs font-bold duration-200 hover:scale-105">
                    View
                  </button>
                  <button className="from-primary-gradient-1 to-primary-gradient-2 flex-1 cursor-pointer rounded bg-linear-to-r px-3 py-1 text-xs font-bold duration-200 hover:scale-105">
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

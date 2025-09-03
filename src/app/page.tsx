'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import { getAllProfiles } from '@/api/profile';
import { UserProfile } from '@/types/profile';
import { ErrorResponse } from '@/types/error';
import { toast } from 'react-toastify';
import FeedSkeleton from '@/components/Skeletons/FeedSkeleton';

const Home = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      fetchUsers();
    }
  }, [isAuthenticated, loading]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await getAllProfiles(token);
      if (Array.isArray(response)) {
        setUsers(response);
      } else {
        throw response as ErrorResponse;
      }
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      toast.error(errorResponse.message || 'Failed to fetch users');
    } finally {
      setLoadingUsers(false);
    }
  };

  return (
    <div className="radial-bg flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-end rounded-b-lg px-6 py-4">
        <nav className="flex gap-4 text-sm font-medium">
          {loading ? (
            <>
              <div className="h-5 w-12 animate-pulse rounded bg-white/10" />
              <div className="h-5 w-12 animate-pulse rounded bg-white/10" />
            </>
          ) : !isAuthenticated ? (
            <>
              <Link href="/login" className="duration-200 hover:text-white/50">
                Login
              </Link>
              <Link href="/register" className="duration-200 hover:text-white/50">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="duration-200 hover:text-white/50">
                Profile
              </Link>
              <button onClick={logout} className="duration-200 hover:text-white/50" type="button">
                Log out
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Main Section */}
      <main className="my-10 flex flex-1 flex-col items-center justify-center px-5">
        {loading ? (
          <>
            {/* Loading skeleton for title and description */}
            <div className="mb-2 h-9 w-80 animate-pulse rounded bg-white/20" />
            <div className="mb-8 h-20 w-96 animate-pulse rounded bg-white/20" />
            <div className="grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-3">
              <FeedSkeleton count={6} />
            </div>
          </>
        ) : (
          <>
            <h1 className="gold-text mb-2 text-3xl font-bold drop-shadow-lg">
              Welcome to Chat App!
            </h1>
            <p className="mb-8 max-w-md text-center text-white/80 italic">
              Connect with friends, meet new people, and start conversations instantly. Whether
              you&apos;re here to chat casually or make lasting connections, our chat app is built
              for you.
            </p>

            {/* Conditional Content Based on Authentication */}
            {!isAuthenticated ? (
              <p className="mb-6 text-center text-white/70">
                Please log in to see available users and start chatting!
              </p>
            ) : (
              /* Feed Section - Only show when authenticated */
              <div className="flex items-center justify-center">
                <div className="grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-3">
                  {loadingUsers ? (
                    <FeedSkeleton count={6} />
                  ) : users.length > 0 ? (
                    users.map((user) => (
                      <div
                        key={user.id}
                        className="flex flex-col items-center justify-center gap-5 rounded-lg bg-white/10 p-3"
                      >
                        <div className="size-20 overflow-hidden rounded-full">
                          <Image
                            src={user.avatar || '/avatars/avatar-placeholder.avif'}
                            alt={user.name || user.username}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="w-full truncate text-center font-semibold">
                          {user.name || `@${user.username}`}
                        </span>
                        <Link
                          href={`/chat?userId=${user.id}`}
                          className="from-primary-gradient-1 to-primary-gradient-2 block w-full cursor-pointer rounded bg-linear-to-r px-3 py-1 text-center text-xs font-bold duration-200 hover:scale-105"
                        >
                          Chat
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-white/70 sm:col-span-3">
                      No other users found. Be the first to create a profile!
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;

'use client';

import Header from '@/components/Layout/Header';
import { FaXmark } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { updateProfile, getProfile } from '@/api/profile';
import { ErrorResponse } from '@/types/error';
import { UserProfile } from '@/types/profile';

const INTEREST_OPTIONS: Record<string, string> = {
  music: 'Music',
  basketball: 'Basketball',
  fitness: 'Fitness',
  reading: 'Reading',
  travel: 'Travel',
  cooking: 'Cooking',
  movies: 'Movies',
  gaming: 'Gaming',
  art: 'Art',
  photography: 'Photography',
  technology: 'Technology',
  fashion: 'Fashion',
  writing: 'Writing',
  hiking: 'Hiking',
  yoga: 'Yoga',
  gardening: 'Gardening',
  volunteering: 'Volunteering',
  dancing: 'Dancing',
  swimming: 'Swimming',
  cycling: 'Cycling',
};

const Interests = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch user's existing interests on component mount
  useEffect(() => {
    const fetchUserInterests = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const response = await getProfile(token);
        const userProfile = response as UserProfile;

        if (userProfile.interests && Array.isArray(userProfile.interests)) {
          setSelected(userProfile.interests);
        }
      } catch (err) {
        const error = err as ErrorResponse;
        toast.error(error.message || 'Error loading profile');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUserInterests();
  }, []);

  const handleSelect = (key: string) => {
    if (!selected.includes(key)) {
      setSelected([...selected, key]);
    }
  };

  const handleRemove = (key: string) => {
    setSelected(selected.filter((k) => k !== key));
  };

  const handleSave = async () => {
    if (selected.length === 0) {
      toast.warning('Please select at least one interest');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';

      await updateProfile(token, {
        interests: selected,
      });

      toast.success('Interests saved successfully!');
      router.push('/profile');
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error.message || 'Error saving interests');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="radial-bg min-h-screen space-y-10">
      <Header onSave={handleSave} isLoading={loading} />

      {initialLoading ? (
        <div className="mx-5 md:mx-auto md:max-w-xl">
          <div className="flex justify-center">
            <p className="text-sm font-medium opacity-70">Loading your interests...</p>
          </div>
        </div>
      ) : (
        <div className="mx-5 space-y-5 md:mx-auto md:max-w-xl">
          <h2 className="gold-text text-sm font-bold">Tell everyone about yourself</h2>
          <h1 className="text-xl font-bold">What interests you?</h1>

          {/* Selected Interests Sections */}
          <div className="flex flex-wrap gap-1 rounded-lg bg-white/6 p-3">
            {selected.length === 0 ? (
              <p className="text-xs font-medium opacity-50">No interests selected</p>
            ) : (
              selected.map((key) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-2 rounded bg-white/10 px-2 py-1"
                >
                  <p className="text-xs font-semibold">{INTEREST_OPTIONS[key]}</p>
                  <FaXmark
                    className="size-2.5 cursor-pointer duration-200 hover:scale-110"
                    onClick={() => handleRemove(key)}
                  />
                </div>
              ))
            )}
          </div>

          {/* Interest Options */}
          <div className="flex flex-wrap items-center gap-3">
            {Object.entries(INTEREST_OPTIONS).map(([key, value]) => (
              <button
                key={key}
                className={`cursor-pointer rounded px-3 py-1 text-xs font-semibold duration-200 hover:scale-105 focus:outline-none ${
                  selected.includes(key)
                    ? 'bg-[linear-gradient(to_right,var(--primary-gradient-1),var(--primary-gradient-2))] text-white'
                    : 'bg-white/10'
                }`}
                onClick={() => handleSelect(key)}
                disabled={selected.includes(key) || loading}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Interests;

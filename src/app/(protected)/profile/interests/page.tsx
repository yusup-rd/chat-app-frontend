'use client';

import Header from '@/components/Layout/Header';
import { FaXmark } from 'react-icons/fa6';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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

  const handleSelect = (key: string) => {
    if (!selected.includes(key)) {
      setSelected([...selected, key]);
    }
  };

  const handleRemove = (key: string) => {
    setSelected(selected.filter((k) => k !== key));
  };

  const handleSave = () => {
    toast.info(
      `Saved interests with values: ${selected.map((k) => INTEREST_OPTIONS[k]).join(', ')}`,
    );
    router.push('/profile');
  };

  return (
    <div className="radial-bg min-h-screen space-y-10">
      <Header onSave={handleSave} />

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
              disabled={selected.includes(key)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interests;

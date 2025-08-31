'use client';

import Header from '@/components/Layout/Header';
import About from '@/components/Sections/About';
import Hero from '@/components/Sections/Hero';
import Interests from '@/components/Sections/Interests';

const mockUser = {
  username: 'johnDoe',
  age: 23,
  gender: 'male',
  dob: 1017100800,
  height: 172,
  weight: 80,
  horoscope: 'aries',
  zodiac: 'horse',
  interests: ['music', 'fitness', 'basketball', 'gaming'],
};

const Profile = () => {
  return (
    <div>
      <Header username={mockUser.username} />

      <div className="mx-2 mb-10 space-y-5 md:mx-auto md:max-w-xl">
        <Hero
          username={mockUser.username}
          age={mockUser.age}
          gender={mockUser.gender}
          horoscope={mockUser.horoscope}
          zodiac={mockUser.zodiac}
        />
        <About
          dob={mockUser.dob}
          horoscope={mockUser.horoscope}
          zodiac={mockUser.zodiac}
          height={mockUser.height}
          weight={mockUser.weight}
          age={mockUser.age}
        />
        <Interests interests={mockUser.interests} />
      </div>
    </div>
  );
};

export default Profile;

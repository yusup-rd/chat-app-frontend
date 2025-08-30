'use client';

import Header from '@/components/Layout/Header';
import About from '@/components/Sections/About';
import Hero from '@/components/Sections/Hero';
import Interests from '@/components/Sections/Interests';

const mockUser = {
  username: 'johnDoe',
  age: 23,
  gender: 'male',
  horoscope: 'aries',
  zodiac: 'horse',
};

const Profile = () => {
  return (
    <div>
      <Header username={mockUser.username} />

      <div className="mx-2 space-y-5 md:mx-auto md:max-w-xl">
        <Hero
          username={mockUser.username}
          age={mockUser.age}
          gender={mockUser.gender}
          horoscope={mockUser.horoscope}
          zodiac={mockUser.zodiac}
        />
        <About />
        <Interests />
      </div>
    </div>
  );
};

export default Profile;

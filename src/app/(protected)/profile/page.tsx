'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Layout/Header';
import About from '@/components/Sections/About';
import AboutForm from '@/components/Forms/AboutForm';
import Hero from '@/components/Sections/Hero';
import Interests from '@/components/Sections/Interests';
import { getProfile } from '@/api/profile';
import { UserProfile } from '@/types/profile';
import { toast } from 'react-toastify';
import { ErrorResponse } from '@/types/error';
import { calculateAge } from '@/utils/date';

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [age, setAge] = useState<number | undefined>(undefined);
  const [aboutSectionState, setAboutSectionState] = useState<'view' | 'edit'>('view');

  const handleProfileUpdate = (updatedData: {
    name?: string;
    dob?: string;
    gender?: string;
    height?: number;
    weight?: number;
    avatar?: string;
  }) => {
    if (profile) {
      const updatedProfile = { ...profile, ...updatedData };
      setProfile(updatedProfile);

      if (updatedData.dob) {
        setAge(calculateAge(updatedData.dob));
      }
    }
    setAboutSectionState('view');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token') || '';
        const response = await getProfile(token);
        const userProfile = response as UserProfile;
        console.log('Fetched profile: ', userProfile);
        setProfile(userProfile);
        if (userProfile.dob) {
          setAge(calculateAge(userProfile.dob));
        }
      } catch (err) {
        const error = err as ErrorResponse;
        toast.error(error.message || 'Error fetching profile');
        setError(error.message || 'Error fetching profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <Header username={profile?.username || ''} />

      {loading && <div className="mx-2 p-4 md:mx-auto md:max-w-xl">Loading...</div>}
      {error && <div className="mx-2 p-4 md:mx-auto md:max-w-xl">Error: {error}</div>}
      {!loading && !error && !profile && (
        <div className="mx-2 p-4 md:mx-auto md:max-w-xl">No profile data found.</div>
      )}

      {!loading && !error && profile && (
        <div className="mx-2 mb-10 space-y-5 md:mx-auto md:max-w-xl">
          <Hero 
            username={profile.username} 
            dob={profile.dob} 
            age={age} 
            gender={profile.gender}
            avatar={profile.avatar}
          />

          {aboutSectionState === 'view' ? (
            <About
              dob={profile.dob}
              height={profile.height}
              weight={profile.weight}
              age={age}
              name={profile.name}
              gender={profile.gender}
              onEditClick={() => setAboutSectionState('edit')}
            />
          ) : (
            <AboutForm
              profile={profile}
              onSuccess={handleProfileUpdate}
              onCancel={() => setAboutSectionState('view')}
            />
          )}

          <Interests interests={profile.interests} />
        </div>
      )}
    </div>
  );
};

export default Profile;

'use client';

import { LuPencilLine } from 'react-icons/lu';
import { calculateHoroscope, calculateZodiac } from '@/utils/zodiacHoroscopeHelper';

interface AboutProps {
  dob?: string;
  height?: number;
  weight?: number;
  age?: number;
  name?: string;
  gender?: string;
  onEditClick: () => void;
}

const About = (props: AboutProps) => {
  const hasData = !!(props.dob || props.height || props.weight);
  const horoscope = props.dob ? calculateHoroscope(props.dob) : '';
  const zodiac = props.dob ? calculateZodiac(props.dob) : '';

  return (
    <div className="bg-card flex flex-col justify-end gap-5 rounded-2xl p-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">About</h2>
        <button
          className="cursor-pointer rounded-full p-1.5 duration-200 hover:bg-white/10"
          aria-label="Edit About"
          onClick={props.onEditClick}
        >
          <LuPencilLine className="size-4" />
        </button>
      </div>

      {!hasData && (
        <p className="text-sm font-medium opacity-50">
          Add in your bio to help others know you better
        </p>
      )}

      {hasData && (
        <div className="space-y-5 text-xs font-medium">
          {props.name && (
            <div>
              <span className="text-white/30">Name:</span> <span>{props.name}</span>
            </div>
          )}
          {props.dob && (
            <div>
              <span className="text-white/30">Birthday:</span>{' '}
              <span>
                {(() => {
                  const date = new Date(props.dob!);
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const year = date.getFullYear();
                  return `${day} / ${month} / ${year}${props.age ? ` (Age ${props.age})` : ''}`;
                })()}
              </span>
            </div>
          )}
          {horoscope && (
            <div>
              <span className="text-white/30">Horoscope:</span>{' '}
              <span className="capitalize">{horoscope}</span>
            </div>
          )}
          {zodiac && (
            <div>
              <span className="text-white/30">Zodiac:</span>{' '}
              <span className="capitalize">{zodiac}</span>
            </div>
          )}
          {props.height && (
            <div>
              <span className="text-white/30">Height:</span> <span>{props.height} cm</span>
            </div>
          )}
          {props.weight && (
            <div>
              <span className="text-white/30">Weight:</span> <span>{props.weight} kg</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default About;

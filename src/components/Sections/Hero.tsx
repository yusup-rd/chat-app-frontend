import {
  calculateHoroscope,
  calculateZodiac,
  getHoroscopeIcon,
  getZodiacIcon,
} from '../../utils/zodiacHoroscopeHelper';

interface HeroProps {
  username: string;
  avatar?: string;
  age?: number;
  dob?: string;
  gender?: string;
}

const Hero = ({ username, avatar, age, dob, gender }: HeroProps) => {
  const horoscope = dob ? calculateHoroscope(dob) : '';
  const zodiac = dob ? calculateZodiac(dob) : '';

  function renderHoroscopeIcon(horoscope?: string) {
    if (!horoscope) return null;
    const HoroscopeIcon = getHoroscopeIcon(horoscope);
    return HoroscopeIcon ? <HoroscopeIcon className="size-5" /> : null;
  }

  function renderZodiacIcon(zodiac?: string) {
    if (!zodiac) return null;
    const ZodiacIcon = getZodiacIcon(zodiac);
    return ZodiacIcon ? <ZodiacIcon className="size-5" /> : null;
  }

  return (
    <div
      className={`relative flex h-48 flex-col justify-end overflow-hidden rounded-2xl p-3 ${
        !avatar ? 'bg-[#162329]' : ''
      }`}
    >
      {avatar && (
        <>
          {/* Blurred background image */}
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-sm"
            style={{ backgroundImage: `url(${avatar})` }}
          />
          {/* Main image that fits height */}
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${avatar})` }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}

      <div className="relative z-10 flex flex-col gap-2">
        <p className="font-bold text-white drop-shadow-lg">
          {age ? `@${username}, ${age}` : `@${username}`}
        </p>
        {gender && <p className="text-sm text-white capitalize drop-shadow-lg">{gender}</p>}
        {horoscope && zodiac && (
          <div className="flex items-center gap-3">
            <div className="flex w-fit items-center gap-1 rounded-full bg-white/50 px-4 py-2 backdrop-blur-sm">
              {renderHoroscopeIcon(horoscope)}
              <p className="text-sm font-semibold capitalize">{horoscope}</p>
            </div>
            <div className="flex w-fit items-center gap-1 rounded-full bg-white/50 px-4 py-2 backdrop-blur-sm">
              {renderZodiacIcon(zodiac)}
              <p className="text-sm font-semibold capitalize">{zodiac}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

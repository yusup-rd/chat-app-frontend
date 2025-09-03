import {
  calculateHoroscope,
  calculateZodiac,
  getHoroscopeIcon,
  getZodiacIcon,
} from '../../utils/zodiacHoroscopeHelper';

interface HeroProps {
  username: string;
  pictureUrl?: string;
  age?: number;
  dob?: string;
  gender?: string;
}

const Hero = ({ username, pictureUrl, age, dob, gender }: HeroProps) => {
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
      className={`flex h-48 flex-col justify-end rounded-2xl p-3 ${
        !pictureUrl ? 'bg-[#162329]' : 'bg-cover bg-center'
      }`}
      style={pictureUrl ? { backgroundImage: `url(${pictureUrl})` } : {}}
    >
      <div className="flex flex-col gap-2">
        <p className="font-bold">{age ? `@${username}, ${age}` : `@${username}`}</p>
        {gender && <p className="text-sm capitalize">{gender}</p>}
        {horoscope && zodiac && (
          <div className="flex items-center gap-3">
            <div className="flex w-fit items-center gap-1 rounded-full bg-white/50 px-4 py-2">
              {renderHoroscopeIcon(horoscope)}
              <p className="text-sm font-semibold capitalize">{horoscope}</p>
            </div>
            <div className="flex w-fit items-center gap-1 rounded-full bg-white/50 px-4 py-2">
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

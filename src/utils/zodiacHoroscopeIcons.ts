import {
  TbZodiacAries,
  TbZodiacTaurus,
  TbZodiacGemini,
  TbZodiacCancer,
  TbZodiacLeo,
  TbZodiacVirgo,
  TbZodiacLibra,
  TbZodiacScorpio,
  TbZodiacSagittarius,
  TbZodiacCapricorn,
  TbZodiacAquarius,
  TbZodiacPisces,
} from 'react-icons/tb';
import {
  FaHorse,
  FaPiggyBank,
  FaDragon,
  FaDog,
  FaCat,
  FaFish,
  FaCrow,
  FaOtter,
  FaFrog,
  FaSpider,
  FaHippo,
  FaKiwiBird,
} from 'react-icons/fa6';

// Horoscope icon mapping
const horoscopeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  aries: TbZodiacAries,
  taurus: TbZodiacTaurus,
  gemini: TbZodiacGemini,
  cancer: TbZodiacCancer,
  leo: TbZodiacLeo,
  virgo: TbZodiacVirgo,
  libra: TbZodiacLibra,
  scorpio: TbZodiacScorpio,
  sagittarius: TbZodiacSagittarius,
  capricorn: TbZodiacCapricorn,
  aquarius: TbZodiacAquarius,
  pisces: TbZodiacPisces,
};

// Zodiac icon mapping
const zodiacIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  horse: FaHorse,
  pig: FaPiggyBank,
  dragon: FaDragon,
  dog: FaDog,
  cat: FaCat,
  fish: FaFish,
  crow: FaCrow,
  otter: FaOtter,
  frog: FaFrog,
  spider: FaSpider,
  hippo: FaHippo,
  kiwi: FaKiwiBird,
};

export function getHoroscopeIcon(horoscope: string) {
  return horoscopeIconMap[horoscope.toLowerCase()] || null;
}

export function getZodiacIcon(zodiac: string) {
  return zodiacIconMap[zodiac.toLowerCase()] || null;
}

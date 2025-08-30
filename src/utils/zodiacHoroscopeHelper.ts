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
  FaCrow,
  FaOtter,
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
  rat: FaOtter,
  ox: FaHippo,
  tiger: FaCat,
  rabbit: FaKiwiBird,
  dragon: FaDragon,
  snake: FaCrow,
  horse: FaHorse,
  goat: FaOtter,
  monkey: FaSpider,
  rooster: FaPiggyBank,
  dog: FaDog,
  pig: FaPiggyBank,
  boar: FaPiggyBank,
};

// Horoscope date ranges
const horoscopeRanges = [
  { name: 'aries', start: [3, 21], end: [4, 19] },
  { name: 'taurus', start: [4, 20], end: [5, 20] },
  { name: 'gemini', start: [5, 21], end: [6, 21] },
  { name: 'cancer', start: [6, 22], end: [7, 22] },
  { name: 'leo', start: [7, 23], end: [8, 22] },
  { name: 'virgo', start: [8, 23], end: [9, 22] },
  { name: 'libra', start: [9, 23], end: [10, 23] },
  { name: 'scorpio', start: [10, 24], end: [11, 21] },
  { name: 'sagittarius', start: [11, 22], end: [12, 21] },
  { name: 'capricorn', start: [12, 22], end: [1, 19] },
  { name: 'aquarius', start: [1, 20], end: [2, 18] },
  { name: 'pisces', start: [2, 19], end: [3, 20] },
];

// Zodiac year ranges
const chineseZodiacRanges = [
  { start: '2023-01-22', end: '2024-02-09', animal: 'rabbit' },
  { start: '2022-02-01', end: '2023-01-21', animal: 'tiger' },
  { start: '2021-02-12', end: '2022-01-31', animal: 'ox' },
  { start: '2020-01-25', end: '2021-02-11', animal: 'rat' },
  { start: '2019-02-05', end: '2020-01-24', animal: 'pig' },
  { start: '2018-02-16', end: '2019-02-04', animal: 'dog' },
  { start: '2017-01-28', end: '2018-02-15', animal: 'rooster' },
  { start: '2016-02-08', end: '2017-01-27', animal: 'monkey' },
  { start: '2015-02-19', end: '2016-02-07', animal: 'goat' },
  { start: '2014-01-31', end: '2015-02-18', animal: 'horse' },
  { start: '2013-02-10', end: '2014-01-30', animal: 'snake' },
  { start: '2012-01-23', end: '2013-02-09', animal: 'dragon' },
];

// Centralized date parsing
function parseDate(input: string | Date): Date | null {
  if (!input) return null;
  if (input instanceof Date) return input;
  if (typeof input === 'string') {
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    if (iso.test(input)) return new Date(input);
    const parts = input.split(/\D+/).map(Number);
    if (parts.length === 3) return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  return null;
}

// Calculate horoscope from date string
export function calculateHoroscope(dateInput: string | Date): string {
  const date = parseDate(dateInput);
  if (!date) return '';
  const month = date.getMonth() + 1;
  const day = date.getDate();
  for (const h of horoscopeRanges) {
    if (
      (h.start[0] < h.end[0] &&
        ((month === h.start[0] && day >= h.start[1]) ||
          (month === h.end[0] && day <= h.end[1]) ||
          (month > h.start[0] && month < h.end[0]))) ||
      (h.start[0] > h.end[0] &&
        ((month === h.start[0] && day >= h.start[1]) ||
          (month === h.end[0] && day <= h.end[1]) ||
          month > h.start[0] ||
          month < h.end[0])) ||
      (h.start[0] === h.end[0] && month === h.start[0] && day >= h.start[1] && day <= h.end[1])
    ) {
      return h.name;
    }
  }
  return '';
}

// Calculate zodiac from date string
export function calculateZodiac(dateInput: string | Date): string {
  const date = parseDate(dateInput);
  if (!date) return '';
  for (const z of chineseZodiacRanges) {
    const start = new Date(z.start);
    const end = new Date(z.end);
    if (date >= start && date <= end) return z.animal;
  }
  const animals = [
    'rat',
    'ox',
    'tiger',
    'rabbit',
    'dragon',
    'snake',
    'horse',
    'goat',
    'monkey',
    'rooster',
    'dog',
    'pig',
  ];
  const baseYear = 2020;
  const year = date.getFullYear();
  let idx = (year - baseYear) % 12;
  if (idx < 0) idx += 12;
  return animals[idx];
}

export function getHoroscopeIcon(horoscope: string) {
  return horoscopeIconMap[horoscope?.toLowerCase()] || null;
}

export function getZodiacIcon(zodiac: string) {
  return zodiacIconMap[zodiac?.toLowerCase()] || null;
}

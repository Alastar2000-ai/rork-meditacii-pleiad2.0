export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: number;
  rating: number;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  lessonsList: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl?: string;
  isLocked: boolean;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Основы эзотерики и духовного развития',
    description: 'Базовый курс для начинающих, раскрывающий основные понятия эзотерики и духовных практик.',
    lessons: 8,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1518050346340-aa2ec3bb424b?q=80&w=1000',
    category: 'Для начинающих',
    isFeatured: true,
    lessonsList: [
      {
        id: '1-1',
        title: 'Введение в эзотерику',
        duration: '45 мин',
        description: 'Обзор основных понятий и направлений эзотерики.',
        videoUrl: 'https://example.com/video1-1.mp4',
        isLocked: false,
      },
      {
        id: '1-2',
        title: 'История эзотерических учений',
        duration: '50 мин',
        description: 'Исторический обзор развития эзотерических традиций в разных культурах.',
        videoUrl: 'https://example.com/video1-2.mp4',
        isLocked: false,
      },
      {
        id: '1-3',
        title: 'Энергетическое строение человека',
        duration: '55 мин',
        description: 'Изучение тонких тел, чакр и энергетических каналов.',
        videoUrl: 'https://example.com/video1-3.mp4',
        isLocked: true,
      },
      {
        id: '1-4',
        title: 'Основы медитации',
        duration: '40 мин',
        description: 'Базовые техники медитации для начинающих.',
        videoUrl: 'https://example.com/video1-4.mp4',
        isLocked: true,
      },
      {
        id: '1-5',
        title: 'Работа с энергией',
        duration: '60 мин',
        description: 'Практические упражнения по ощущению и управлению энергией.',
        videoUrl: 'https://example.com/video1-5.mp4',
        isLocked: true,
      },
      {
        id: '1-6',
        title: 'Развитие интуиции',
        duration: '45 мин',
        description: 'Методы и практики для развития интуитивных способностей.',
        videoUrl: 'https://example.com/video1-6.mp4',
        isLocked: true,
      },
      {
        id: '1-7',
        title: 'Законы кармы и реинкарнации',
        duration: '50 мин',
        description: 'Изучение кармических законов и концепции перерождения.',
        videoUrl: 'https://example.com/video1-7.mp4',
        isLocked: true,
      },
      {
        id: '1-8',
        title: 'Интеграция духовных практик в повседневную жизнь',
        duration: '55 мин',
        description: 'Как применять полученные знания в обычной жизни.',
        videoUrl: 'https://example.com/video1-8.mp4',
        isLocked: true,
      },
    ],
  },
  {
    id: '2',
    title: 'Астрология Плеяд: космические влияния',
    description: 'Углубленное изучение астрологии с акцентом на влияние звездного скопления Плеяд на судьбу человека.',
    lessons: 6,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000',
    category: 'Астрология',
    isFeatured: true,
    lessonsList: [
      {
        id: '2-1',
        title: 'Введение в астрологию Плеяд',
        duration: '50 мин',
        description: 'Основные принципы и особенности астрологии Плеяд.',
        videoUrl: 'https://example.com/video2-1.mp4',
        isLocked: false,
      },
      {
        id: '2-2',
        title: 'История и мифология Плеяд',
        duration: '45 мин',
        description: 'Мифологические и исторические аспекты звездного скопления Плеяд.',
        videoUrl: 'https://example.com/video2-2.mp4',
        isLocked: true,
      },
      {
        id: '2-3',
        title: 'Влияние Плеяд на натальную карту',
        duration: '60 мин',
        description: 'Как определить и интерпретировать влияние Плеяд в натальной карте.',
        videoUrl: 'https://example.com/video2-3.mp4',
        isLocked: true,
      },
      {
        id: '2-4',
        title: 'Плеяды и кармические задачи',
        duration: '55 мин',
        description: 'Связь Плеяд с кармическими задачами и духовным развитием.',
        videoUrl: 'https://example.com/video2-4.mp4',
        isLocked: true,
      },
      {
        id: '2-5',
        title: 'Медитации на энергию Плеяд',
        duration: '40 мин',
        description: 'Практические медитации для установления связи с энергией Плеяд.',
        videoUrl: 'https://example.com/video2-5.mp4',
        isLocked: true,
      },
      {
        id: '2-6',
        title: 'Интеграция энергии Плеяд в повседневную жизнь',
        duration: '50 мин',
        description: 'Практические методы работы с энергией Плеяд для трансформации жизни.',
        videoUrl: 'https://example.com/video2-6.mp4',
        isLocked: true,
      },
    ],
  },
  {
    id: '3',
    title: 'Развитие экстрасенсорных способностей',
    description: 'Курс для развития интуиции, ясновидения и других экстрасенсорных способностей.',
    lessons: 7,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=1000',
    category: 'Экстрасенсорика',
    isFeatured: false,
    lessonsList: [
      {
        id: '3-1',
        title: 'Основы экстрасенсорного восприятия',
        duration: '45 мин',
        description: 'Введение в мир экстрасенсорных способностей и их виды.',
        videoUrl: 'https://example.com/video3-1.mp4',
        isLocked: false,
      },
      {
        id: '3-2',
        title: 'Развитие ясновидения',
        duration: '50 мин',
        description: 'Техники и упражнения для развития ясновидения.',
        videoUrl: 'https://example.com/video3-2.mp4',
        isLocked: true,
      },
      {
        id: '3-3',
        title: 'Развитие яснослышания',
        duration: '50 мин',
        description: 'Методы для развития способности яснослышания.',
        videoUrl: 'https://example.com/video3-3.mp4',
        isLocked: true,
      },
      {
        id: '3-4',
        title: 'Развитие яснознания',
        duration: '45 мин',
        description: 'Практики для развития интуитивного знания.',
        videoUrl: 'https://example.com/video3-4.mp4',
        isLocked: true,
      },
      {
        id: '3-5',
        title: 'Работа с энергетическими полями',
        duration: '55 мин',
        description: 'Техники считывания и интерпретации энергетических полей.',
        videoUrl: 'https://example.com/video3-5.mp4',
        isLocked: true,
      },
      {
        id: '3-6',
        title: 'Защита экстрасенса',
        duration: '40 мин',
        description: 'Методы энергетической защиты при экстрасенсорной работе.',
        videoUrl: 'https://example.com/video3-6.mp4',
        isLocked: true,
      },
      {
        id: '3-7',
        title: 'Этика экстрасенсорной работы',
        duration: '35 мин',
        description: 'Этические принципы при использовании экстрасенсорных способностей.',
        videoUrl: 'https://example.com/video3-7.mp4',
        isLocked: true,
      },
    ],
  },
  {
    id: '4',
    title: 'Таро и оракулы: искусство предсказания',
    description: 'Полный курс по работе с картами Таро и другими оракулами для предсказаний и самопознания.',
    lessons: 9,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1572858726140-c1eb50f64470?q=80&w=1000',
    category: 'Предсказания',
    isFeatured: true,
    lessonsList: [
      {
        id: '4-1',
        title: 'История и происхождение Таро',
        duration: '40 мин',
        description: 'Исторический обзор происхождения и эволюции карт Таро.',
        videoUrl: 'https://example.com/video4-1.mp4',
        isLocked: false,
      },
      {
        id: '4-2',
        title: 'Структура колоды Таро',
        duration: '45 мин',
        description: 'Изучение структуры колоды Таро: Старшие и Младшие арканы.',
        videoUrl: 'https://example.com/video4-2.mp4',
        isLocked: true,
      },
      // More lessons...
    ],
  },
  {
    id: '5',
    title: 'Энергетическое целительство',
    description: 'Курс по различным методам энергетического целительства и работы с жизненной энергией.',
    lessons: 8,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000',
    category: 'Целительство',
    isFeatured: false,
    lessonsList: [
      // Lessons...
    ],
  },
];

export const courseCategories = [
  { id: 'all', name: 'Все' },
  { id: 'Для начинающих', name: 'Для начинающих' },
  { id: 'Астрология', name: 'Астрология' },
  { id: 'Экстрасенсорика', name: 'Экстрасенсорика' },
  { id: 'Предсказания', name: 'Предсказания' },
  { id: 'Целительство', name: 'Целительство' },
];
export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  durationInMinutes: number;
  imageUrl: string;
  audioUrl: string;
  category: string;
  isFeatured: boolean;
}

export const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Космическая гармония Плеяд',
    description: 'Погрузитесь в глубокую медитацию, соединяющую вас с энергией звездного скопления Плеяд.',
    duration: '15 мин',
    durationInMinutes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000',
    audioUrl: 'https://example.com/meditation1.mp3',
    category: 'Звездные',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Исцеление внутреннего ребенка',
    description: 'Медитация для восстановления связи с вашим внутренним ребенком и исцеления детских травм.',
    duration: '20 мин',
    durationInMinutes: 20,
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000',
    audioUrl: 'https://example.com/meditation2.mp3',
    category: 'Исцеление',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Активация третьего глаза',
    description: 'Практика для пробуждения и активации шестой чакры, отвечающей за интуицию и ясновидение.',
    duration: '18 мин',
    durationInMinutes: 18,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000',
    audioUrl: 'https://example.com/meditation3.mp3',
    category: 'Чакры',
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Путешествие к звездам',
    description: 'Астральное путешествие к звездам Плеяд для получения космической мудрости и знаний.',
    duration: '25 мин',
    durationInMinutes: 25,
    imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1000',
    audioUrl: 'https://example.com/meditation4.mp3',
    category: 'Звездные',
    isFeatured: true,
  },
  {
    id: '5',
    title: 'Очищение ауры',
    description: 'Медитация для очищения энергетического поля от негативных влияний и восстановления защиты.',
    duration: '12 мин',
    durationInMinutes: 12,
    imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1000',
    audioUrl: 'https://example.com/meditation5.mp3',
    category: 'Энергетические',
    isFeatured: false,
  },
  {
    id: '6',
    title: 'Связь с высшим Я',
    description: 'Установление глубокой связи с вашим высшим Я для получения руководства и мудрости.',
    duration: '22 мин',
    durationInMinutes: 22,
    imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1000',
    audioUrl: 'https://example.com/meditation6.mp3',
    category: 'Духовные',
    isFeatured: false,
  },
  {
    id: '7',
    title: 'Открытие сердечной чакры',
    description: 'Медитация для раскрытия сердечной чакры, развития безусловной любви и сострадания.',
    duration: '17 мин',
    durationInMinutes: 17,
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000',
    audioUrl: 'https://example.com/meditation7.mp3',
    category: 'Чакры',
    isFeatured: true,
  },
  {
    id: '8',
    title: 'Глубокий сон и восстановление',
    description: 'Медитация перед сном для глубокого расслабления, качественного отдыха и восстановления сил.',
    duration: '30 мин',
    durationInMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?q=80&w=1000',
    audioUrl: 'https://example.com/meditation8.mp3',
    category: 'Сон',
    isFeatured: false,
  },
];

export const categories = [
  { id: 'all', name: 'Все' },
  { id: 'Звездные', name: 'Звездные' },
  { id: 'Исцеление', name: 'Исцеление' },
  { id: 'Чакры', name: 'Чакры' },
  { id: 'Энергетические', name: 'Энергетические' },
  { id: 'Духовные', name: 'Духовные' },
  { id: 'Сон', name: 'Сон' },
];
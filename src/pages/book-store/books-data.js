
import Book1 from './images/book-1.jpg'
import Book2 from './images/book-2.jpg'
import Book3 from './images/book-3.jpg'
import Book4 from './images/book-4.jpg'
import Book5 from './images/book-5.jpg'
import Book6 from './images/book-6.jpg'
import Book7 from './images/book-7.jpg'
import Book8 from './images/book-8.jpg'
import Book9 from './images/book-9.jpg'
import Book10 from './images/book-10.jpg'
import Book11 from './images/book-11.jpg'
import Book12 from './images/book-12.jpg'
import Book13 from './images/book-13.jpg'
import Book14 from './images/book-14.jpg'
import Book15 from './images/book-15.jpg'

// Экспортируем массив данных, используя импортированные изображения
export const booksData = [
  {
    id: 1,
    title: 'Пятьдесят оттенков серого',
    author: 'Э. Л. Джеймс',
    description:
      'Скандально известный роман о сложных отношениях между студенткой Анастейшей Стил и бизнесменом Кристианом Греем. Эротика, власть и психологические игры.',
    imgSrc: Book1,
    genre: ['Роман', 'Эротика'],
    price: 12.99,
    rating: 3.5,
    year: 2011,
    pages: 514,
    language: 'Русский',
    inStock: true,
  },
  {
    id: 2,
    title: 'Томминокеры',
    author: 'Стивен Кинг',
    description:
      'Фантастический роман о загадочном артефакте, который меняет реальность. Полный мистики и неожиданных поворотов.',
    imgSrc: Book2,
    genre: ['Фантастика', 'Мистика'],
    price: 14.5,
    rating: 4.2,
    year: 1987,
    pages: 558,
    language: 'Русский',
    inStock: true,
  },
  {
    id: 3,
    title: 'Зеленая миля',
    author: 'Стивен Кинг',
    description:
      'Трогательная и жестокая история о тюремном надзирателе и заключенном с необычными способностями. Драма, мистика и глубокая человечность.',
    imgSrc: Book3,
    genre: ['Драма', 'Мистика'],
    price: 11.99,
    rating: 4.8,
    year: 1996,
    pages: 592,
    language: 'Русский',
    inStock: true,
  },
  {
    id: 4,
    title: 'We Were Never Meant to Be',
    author: 'Unknown',
    description:
      'Роман о сложных взаимоотношениях, любви и предательстве. История, которая заставляет задуматься о судьбе и выборе.',
    imgSrc: Book4,
    genre: ['Роман', 'Драма'],
    price: 9.99,
    rating: 3.7,
    year: 2020,
    pages: 320,
    language: 'Английский',
    inStock: false,
  },
  {
    id: 5,
    title: 'La Psicología del Dinero',
    author: 'Морган Хаузел',
    description:
      'Книга о психологических аспектах управления деньгами. Почему люди принимают иррациональные финансовые решения?',
    imgSrc: Book5,
    genre: ['Психология', 'Финансы'],
    price: 15.2,
    rating: 4.5,
    year: 2020,
    pages: 256,
    language: 'Испанский',
    inStock: true,
  },
  {
    id: 6,
    title: 'Философский камень',
    author: 'Дж. К. Роулинг',
    description:
      'Первая книга о Гарри Поттере. Начало магического приключения, школа Хогвартс и противостояние с Тёмным Лордом.',
    imgSrc: Book6,
    genre: ['Фэнтези', 'Приключения'],
    price: 10.99,
    rating: 4.9,
    year: 1997,
    pages: 332,
    language: 'Русский',
    inStock: true,
  },
  {
    id: 7,
    title: 'Рассказ служанки',
    author: 'Маргарет Этвуд',
    description:
      'Антиутопия о тоталитарном общества, где женщины лишены прав. История служанки Фреды в мире угнетения и борьбы.',
    imgSrc: Book7,
    genre: ['Антиутопия', 'Феминистская литература'],
    price: 13.75,
    rating: 4.6,
    year: 1985,
    pages: 311,
    language: 'Русский',
    inStock: true,
  },
  {
    id: 8,
    title: 'Ons Feilbare Denken',
    author: 'Даниэль Канеман',
    description:
      'Книга о когнитивных искажениях и принятии решений. Нобелевский лауреат объясняет, почему мы часто ошибаемся.',
    imgSrc: Book8,
    genre: ['Психология', 'Наука'],
    price: 16.4,
    rating: 4.7,
    year: 2011,
    pages: 499,
    language: 'Нидерландский',
    inStock: false,
  },
  {
    id: 9,
    title: '1984',
    author: 'Джордж Оруэлл',
    description:
      'Классическая антиутопия о тоталитарном режиме, где Большой Брат следит за каждым. Размышления о свободе и контроле.',
    imgSrc: Book9,
    genre: ['Антиутопия', 'Политическая литература'],
    price: 8.99,
    rating: 4.8,
    year: 1949,
    pages: 328,
    language: 'Русский',
    inStock: true,
  },
  {
    id: 10,
    title: 'На пятьдесят оттенков темнее',
    author: 'Э. Л. Джеймс',
    description:
      'Продолжение истории Анастейши и Кристиана. Новые испытания, страсть и попытки построить здоровые отношения.',
    imgSrc: Book10,
    genre: ['Роман', 'Эротика'],
    price: 5.99,
    rating: 3.4,
    year: 2012,
    pages: 532,
    language: 'Русский',
    inStock: true,
  },
  {
    id: 11,
    title: 'As Long as the Lemon Trees Grow',
    author: 'Зулейха Абудар',
    description:
      'История о войне, надежде и любви в Сирии. Драматичный роман о выживании и человечности в условиях конфликта.',
    imgSrc: Book11,
    genre: ['Драма', 'Исторический роман'],
    price: 14.99,
    rating: 4.3,
    year: 2022,
    pages: 400,
    language: 'Английский',
    inStock: true,
  },
  {
    id: 12,
    title: 'Ночь и день',
    author: 'Вирджиния Вулф',
    description:
      'Роман о жизни двух друзей в Лондоне начала XX века. Размышления о любви, браке и предназначении женщины.',
    imgSrc: Book12,
    genre: ['Классика', 'Роман'],
    price: 10.25,
    rating: 4.0,
    year: 1919,
    pages: 442,
    language: 'Русский',
    inStock: false,
  },
  {
    id: 13,
    title: 'Нортенгерское аббатство',
    author: 'Джейн Остин',
    description:
      'Ироничная история о молодой девушке, увлеченной готическими романами, которая попадает в настоящие любовные перипетии.',
    imgSrc: Book13,
    genre: ['Классика', 'Роман'],
    price: 9.5,
    rating: 4.1,
    year: 1817,
    pages: 280,
    language: 'Русский',
    inStock: true,
  },
  {
    id: 14,
    title: 'Сестра Керри',
    author: 'Теодор Драйзер',
    description:
      'История молодой провинциалки, которая приезжает в Чикаго в поисках лучшей жизни. Социальная драма о мечтах и реальности.',
    imgSrc: Book14,
    genre: ['Классика', 'Драма'],
    price: 11.3,
    rating: 4.2,
    year: 1900,
    pages: 560,
    language: 'Русский',
    inStock: true,
  },
  {
    id: 15,
    title: 'Код да Винчи',
    author: 'Дэн Браун',
    description:
      'Захватывающий детектив о тайных обществах, религиозных заговорах и загадках Леонардо да Винчи. Интеллектуальный триллер.',
    imgSrc: Book15,
    genre: ['Детектив', 'Триллер'],
    price: 13.99,
    rating: 4.4,
    year: 2003,
    pages: 489,
    language: 'Русский',
    inStock: true,
  },
]

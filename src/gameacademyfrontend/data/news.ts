import {NewsItem} from "@/types/news"

const newsData: NewsItem[] = [
  {
    _id: "1",
    slug: "vr-gamedev-methodology",
    title: "Методология VR/AR в геймдеве",
    category: "Выпускники",
    excerpt: "Практические рекомендации по методам разработки VR/AR приложений.",
    content: "Полный текст статьи...",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/arvr.jpg", // Локальное изображение (импортированное)
    date: "2025-04-01",
    markdown: "/content/vr-gamedev-methodology.md",
    author: {name: "Кугуракова В.В.", slug: ""},
    readTime: "5 мин",
    tags: ["VR/AR", "Методологии", "GameDev"]
  },
  {
    _id: "2",
    slug: "uiux-hackathon-winners",
    title: "Победители хакатона UI/UX",
    category: "Студенты",
    excerpt: "Практические рекомендации от наших студентов, победивших на всероссийском хакатоне Digital Breakthrough.",
    content: "Полный текст статьи...",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/hackaton.webp", // Локальное изображение (импортированное)
    date: "2024-12-10",
    markdown: "/content/uiux-hackathon-winners.md",
    author: {name: "Кугуракова В.В.", slug: ""},
    readTime: "5 мин",
    tags: ["Хакатон", "GameDev", "UI/UX"]
  },
  {
    _id: "3",
    slug: "gazizov-3d-modeling-in-games",
    title: "Применение 3D-моделирования в разработке игр",
    category: "Факультет",
    excerpt: "Практические рекомендации по 3D моделированию.",
    content: "Полный текст статьи...",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/arvr.jpg", // Внешний URL
    date: "2023-09-20",
    markdown: "/content/gazizov-3d-modeling-in-games.md",
    author: {name: "Кугуракова В.В.", slug: ""},
    readTime: "5 мин",
    tags: ["3D-моделирование", "GameDev"]
  },
  {
    _id: "4",
    slug: "kugurakova-game-education-strategy",
    title: "Образовательные стратегии в сфере разработки игр",
    category: "Факультет",
    excerpt: "Практические рекомендации по обучению GameDev разработчика.",
    content: "Полный текст статьи...",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/arvr.jpg", // Внешний URL
    date: "2023-05-10",
    markdown: "/content/kugurakova-game-education-strategy.md",
    author: {name: "Кугуракова В.В.", slug: ""},
    readTime: "5 мин",
    tags: ["Образование", "GameDev", "Технологии"]
  },
  {
    _id: "5",
    slug: "kostuk-vr-crane-training",
    title: "Реализация динамических уровней VR для обучения работе с башенным краном",
    category: "Факультет",
    excerpt: "Практические рекомендации реализации динамических уровней.",
    content: "Полный текст статьи...",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/arvr.jpg", // Внешний URL
    date: "2023-11-15",
    markdown: "/content/kostuk-vr-crane-training.md",
    author: {name: "Костюк Д.", slug: ""},
    readTime: "5 мин",
    tags: ["VR/AR", "GameDev", "Level Design"]
  },
];

export default newsData;
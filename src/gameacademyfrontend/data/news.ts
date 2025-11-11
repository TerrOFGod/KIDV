import {NewsItem} from "@/types/news"

const newsData: NewsItem[] = [
  {
    slug: "vr-gamedev-methodology",
    title: "Методология VR/AR в геймдеве",
    category: "Выпускники",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/arvr.jpg", // Локальное изображение (импортированное)
    date: "2025-04-01",
    markdown: "/content/vr-gamedev-methodology.md",
  },
  {
    slug: "uiux-hackathon-winners",
    title: "Победители хакатона UI/UX",
    category: "Студенты",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/hackaton.webp", // Локальное изображение (импортированное)
    date: "2024-12-10",
    markdown: "/content/uiux-hackathon-winners.md",
  },
  {
    slug: "gazizov-3d-modeling-in-games",
    title: "Применение 3D-моделирования в разработке игр",
    category: "Факультет",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/arvr.jpg", // Внешний URL
    date: "2023-09-20",
    markdown: "/content/gazizov-3d-modeling-in-games.md",
  },
  {
    slug: "kugurakova-game-education-strategy",
    title: "Образовательные стратегии в сфере разработки игр",
    category: "Факультет",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/arvr.jpg", // Внешний URL
    date: "2023-05-10",
    markdown: "/content/kugurakova-game-education-strategy.md",
  },
  {
    slug: "kostuk-vr-crane-training",
    title: "Реализация динамических уровней VR для обучения работе с башенным краном",
    category: "Факультет",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/news/arvr.jpg", // Внешний URL
    date: "2023-11-15",
    markdown: "/content/kostuk-vr-crane-training.md",
  },
];

export default newsData;
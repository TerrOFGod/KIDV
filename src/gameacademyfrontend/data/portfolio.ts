import { PortfolioItem } from "@/types/portfolio";
import cover from "../assets/portfolio/AR-VR-in-Healthcare-1.jpg";

const portfolioData: PortfolioItem[] = [
  {
    slug: "vr-medical-simulator",
    title: "VR-симулятор для медицины",
    category: "VR/AR",
    image: cover,
    description: "Интерактивный VR-симулятор для обучения медицинским манипуляциям.",
    releaseDate: "20-04-2025",
    download: "https://example.com/vr-simulator-download",
    phases: [
      {
        title: "Идея",
        date: "10-01-2025",
        description: "Определены цели и формат проекта. Подготовлена концепция VR-тренажера для медицинских задач.",
        skills: [
          { name: "Креативность", level: 80 },
          { name: "Документирование", level: 60 }
        ]
      },
      {
        title: "Прототип",
        date: "05-02-2025",
        description: "Создан базовый VR-интерфейс и сценарий одной обучающей ситуации.",
        skills: [
          { name: "Unity", level: 70 },
          { name: "UI/UX", level: 50 }
        ]
      },
      {
        title: "Разработка",
        date: "01-03-2025",
        description: "Добавлены анимации, модели и интерактивные элементы. Внедрена система оценки действий пользователя.",
        skills: [
          { name: "Программирование", level: 75 },
          { name: "Анализ", level: 60 }
        ]
      },
      {
        title: "Тестирование",
        date: "01-04-2025",
        description: "Проведено тестирование с реальными пользователями. Исправлены ошибки UX."
      },
      {
        title: "Релиз",
        date: "20-04-2025",
        description: "Проект опубликован на платформе кафедры. Доступен для использования студентами."
      }
    ],      
    goals: [
      "Отработка навыков оказания первой помощи",
      "Тренировка выполнения клинических алгоритмов"
    ],
    features: [
      "Поддержка Oculus Quest 2",
      "Реалистичная физика взаимодействия с инструментами",
      "Аналитика прогресса пользователя"
    ],
    screenshots: [
      "https://medcitynews.com/wp-content/uploads/sites/7/2019/09/GettyImages-1015934084.jpg",
      "https://www.quytech.com/blog/wp-content/uploads/2019/07/vr-healthcareapp.jpg",
      "https://nolijconsulting.com/wp-content/uploads/2022/03/nolij-post-imge.png",
    ],
    hallOfFame: true,
    authors: [
      { name: "Влада Кугуракова", slug: "vlada-kugurakova", role: "VR Developer" },
      { name: "Даниил Костюк", slug: "kostuk", role: "3D Artist" },
    ],
    year: 2025
  },

  {
    slug: "ar-education-app",
    title: "AR-приложение для обучения",
    category: "VR/AR",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*S8aT0HfsYQ5XkWC48wV4NA.jpeg",
    releaseDate: "20-04-2025",
    download: "https://example.com/vr-simulator-download",
    phases: [
      {
        title: "Идея",
        date: "10-01-2025",
        description: "Определены цели и формат проекта. Подготовена концепция VR-тренажера для медицинских задач.",
        skills: [
          { name: "Креативность", level: 80 },
          { name: "Документирование", level: 60 }
        ]
      },
      {
        title: "Прототип",
        date: "05-02-2025",
        description: "Создан базовый VR-интерфейс и сценарий одной обучающей ситуации.",
        skills: [
          { name: "Unity", level: 70 },
          { name: "UI/UX", level: 50 }
        ]
      },
      {
        title: "Разработка",
        date: "01-03-2025",
        description: "Добавлены анимации, модели и интерактивные элементы. Внедрена система оценки действий пользователя.",
        skills: [
          { name: "Программирование", level: 75 },
          { name: "Анализ", level: 60 }
        ]
      },
      {
        title: "Тестирование",
        date: "01-04-2025",
        description: "Проведено тестирование с реальными пользователями. Исправлены ошибки UX."
      },
      {
        title: "Релиз",
        date: "20-04-2025",
        description: "Проект опубликован на платформе кафедры. Доступен для использования студентами."
      }
    ],      
    goals: [
      "Отработка навыков оказания первой помощи",
      "Тренировка выполнения клинических алгоритмов"
    ],
    features: [
      "Поддержка Oculus Quest 2",
      "Реалистичная физика взаимодействия с инструментами",
      "Аналитика прогресса пользователя"
    ],
    screenshots: [
      "https://capsulesight.com/108-BenefitsAREducation-feature.webp",
      "https://www.fastbrain.it/wp-content/uploads/2023/10/realta-aumentata-apprendimento.png",
      "https://quantumera.com/wp-content/uploads/2019/06/01-QE-Blog-2019.jpg",
    ],
    hallOfFame: true,
    authors: [
      { name: "Рим Газизов", slug: "gazizov", role: "AR Developer" },
      { name: "Даниил Костюк", slug: "kostuk", role: "3D Artist" },
      { name: "Влада Кугуракова", slug: "vlada-kugurakova", role: "VR Developer" },
    ],
    year: 2023
  },
    
  {
    slug: "3d-character-design",
    title: "3D-дизайн персонажа",
    category: "3D",
    image: "https://images-rsg.storage.googleapis.com/wp-content/uploads/2023/07/stylized-3d-characters-cowboy-office-construction-worker.jpg",
    hallOfFame: true,
    year: 2024
  },
  
  {
    slug: "mobile-puzzle-game",
    title: "Мобильная головоломка",
    category: "Игры",
    image: "https://placehold.co/600x400?text=Puzzle+Game",
    year: 2022
  }
];

export default portfolioData;
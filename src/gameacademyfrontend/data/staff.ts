// src/data/staff.ts
import { StaffMember } from "@/types/staff";
// import avatarVlada from "../assets/avatar-vlada.jpg";

const staffList: StaffMember[] = [
  {
    slug: "vlada-kugurakova",
    name: "Влада Кугуракова",
    position: "Руководитель кафедры",
    title: "head", // Ключ для словаря ролей
    rarity: "LEGENDARY",
    photo: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/staff/avatar-vlada.jpg", // Основное поле для фото
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/staff/avatar-vlada.jpg",
    email: "vlada.kugurakova@example.com",
    telegram: "https://t.me/vlada_kugurakova",
    bio: "Доктор технических наук, профессор. Эксперт в области игровых технологий и VR/AR.",
    researchInterests: ["VR/AR", "Игровые движки", "Искусственный интеллект"],
    stats: [
      { label: "Unity", value: 100 },
      { label: "Game Design", value: 100 },
      { label: "Teaching", value: 100 }
    ],
    skills: [
      {
        name: "Unity",
        level: 999,
        subskills: [
          { name: "Physics" },
          { name: "UI Toolkit" }
        ],
        description: "Эксперт в разработке на Unity"
      },
      {
        name: "Game Design",
        level: 999,
        subskills: [
          { name: "Narrative" },
          { name: "Balancing" },
          { name: "UX/UI" },
        ],
        description: "Создание игровых механик и баланса"
      },
      { 
        name: "Mentorship", 
        level: 999,
        description: "Наставничество студентов"
      },
      { 
        name: "Storytelling", 
        level: 999,
        description: "Создание захватывающих сюжетов"
      }
    ],
    achievements: [
      {
        title: "Публикация проекта",
        icon: "FaUpload",
        description: "Разместил проект на платформе",
      },
      {
        title: "VR-эксперт",
        icon: "FaVrCardboard",
        description: "Участвовал в 3+ VR-проектах",
      },
      {
        title: "Ментор",
        icon: "FaHandsHelping",
        description: "Курировал более 50 студентов",
      }
    ]
  },
  {
    slug: "kostuk",
    name: "Костюк Даниил Иванович",
    position: "Преподаватель",
    title: "senior", // Ключ для словаря ролей
    rarity: "RARE",
    photo: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    email: "d.kostuk@example.com",
    github: "https://github.com/dkostuk",
    bio: "Специалист в области игровой разработки и 3D-моделирования.",
    stats: [
      { label: "Unity", value: 100 },
      { label: "Game Design", value: 80 },
      { label: "Teaching", value: 95 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "Game Design", 
        level: 5,
        description: "Проектирование игровых систем"
      },
      { 
        name: "Mentorship", 
        level: 4,
        description: "Руководство студенческими проектами"
      },
      { 
        name: "Storytelling", 
        level: 3,
        description: "Создание нарративов"
      }
    ],
    achievements: [
      {
        title: "Публикация проекта",
        icon: "FaUpload",
        description: "Разместил проект на платформе",
      },
      {
        title: "VR-эксперт",
        icon: "FaVrCardboard",
        description: "Участвовал в 3+ VR-проектах",
      },
      {
        title: "Ментор",
        icon: "FaHandsHelping",
        description: "Курировал более 50 студентов",
      }
    ]
  },
  {
    slug: "gazizov",
    name: "Газизов Рим Радикович",
    position: "Преподаватель",
    title: "senior", // Ключ для словаря ролей
    rarity: "RARE",
    photo: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    email: "r.gazizov@example.com",
    telegram: "https://t.me/rim_gazizov",
    bio: "Специалист в области разработки игр и компьютерной графики.",
    researchInterests: ["Компьютерная графика", "Шейдеры", "Оптимизация"],
    stats: [
      { label: "Unity", value: 95 },
      { label: "Game Design", value: 75 },
      { label: "Teaching", value: 90 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "Game Design", 
        level: 5,
        description: "Проектирование игровых систем"
      },
      { 
        name: "Mentorship", 
        level: 4,
        description: "Руководство студенческими проектами"
      },
      { 
        name: "Storytelling", 
        level: 3,
        description: "Создание нарративов"
      }
    ],
    achievements: [
      {
        title: "Публикация проекта",
        icon: "FaUpload",
        description: "Разместил проект на платформе",
      },
      {
        title: "VR-эксперт",
        icon: "FaVrCardboard",
        description: "Участвовал в 3+ VR-проектах",
      }
    ]
  },
  {
    slug: "lesnovskiy",
    name: "Лесновский Антон Федерович",
    position: "Аспирант",
    title: "assistant", // Ключ для словаря ролей
    rarity: "COMMON",
    photo: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    email: "a.lesnovskiy@example.com",
    github: "https://github.com/alesnovskiy",
    bio: "Аспирант, специализирующийся на игровых AI и алгоритмах.",
    researchInterests: ["Искусственный интеллект", "Алгоритмы", "Нейронные сети"],
    stats: [
      { label: "Unity", value: 95 },
      { label: "Game Design", value: 75 },
      { label: "Teaching", value: 90 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "Game Design", 
        level: 5,
        description: "Проектирование игровых систем"
      },
      { 
        name: "Mentorship", 
        level: 4,
        description: "Руководство студенческими проектами"
      },
      { 
        name: "Storytelling", 
        level: 3,
        description: "Создание нарративов"
      }
    ]
  },
  {
    slug: "kucherov",
    name: "Кучеров Алексей Иванович",
    position: "Аспирант",
    title: "assistant", // Ключ для словаря ролей
    rarity: "COMMON",
    photo: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    email: "a.kucherov@example.com",
    telegram: "https://t.me/a_kucherov",
    bio: "Аспирант с фокусом на маркетинг игровых продуктов и аналитику.",
    stats: [
      { label: "Unity", value: 95 },
      { label: "Marketing", value: 75 },
      { label: "Game Design", value: 75 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "Game Design", 
        level: 5,
        description: "Проектирование игровых систем"
      },
      { 
        name: "Marketing", 
        level: 4,
        description: "Продвижение игровых продуктов"
      }
    ]
  },
  {
    slug: "fedotov",
    name: "Федотов Илья Павлович",
    position: "Аспирант",
    title: "assistant", // Ключ для словаря ролей
    rarity: "COMMON",
    photo: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    image: "D:/VTTrofimchuk/Corrections/KIDV/src/gameacademyfrontend/public/images/avatar-placeholder.jpg",
    email: "i.fedotov@example.com",
    github: "https://github.com/i_fedotov",
    bio: "Аспирант, специализирующийся на UX/UI дизайне для игр и приложений.",
    researchInterests: ["UX/UI дизайн", "Юзабилити", "Прототипирование"],
    stats: [
      { label: "Unity", value: 95 },
      { label: "UX/UI Design", value: 75 },
      { label: "Marketing", value: 10 }
    ],
    skills: [
      { 
        name: "Unity", 
        level: 5,
        description: "Разработка игр и приложений"
      },
      { 
        name: "UX/UI Design", 
        level: 5,
        description: "Проектирование пользовательских интерфейсов"
      },
      { 
        name: "Prototyping", 
        level: 4,
        description: "Создание прототипов интерфейсов"
      }
    ]
  }
];

export default staffList;
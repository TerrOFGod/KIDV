import { SuccessStory } from "@/types/successStories";

const successStories: SuccessStory[] = [
  {
    id: 1,
    lat: 55.7558,
    lng: 37.6173,
    city: "Москва",
    graduate: "Иван Смирнов",
    project: "NeuroBlade",
    year: 2023,
    description: "Игра попала в топ-10 Steam в жанре хак-энд-слэш.",
    link: "",
    image: "https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15832846/lightbladeheader.0.0.1492573539.jpg?quality=90&strip=all&crop=7.8125,0,84.375,100"
  },
  {
    id: 2,
    lat: 48.8566,
    lng: 2.3522,
    city: "Париж",
    graduate: "Анна Лебедева",
    project: "VR Chef",
    year: 2022,
    description: "Кулинарный симулятор для Oculus Quest.",
    link: "https://example.com/vrchef",
    image: "https://thumbs.dreamstime.com/b/png-smiling-chef-character-wearing-vr-headset-blue-outfit-against-transparent-background-381634483.jpg"
  },
  {
    id: 3,
    lat: 55.7908,
    lng: 49.1144,
    city: "Казань",
    graduate: "Даннил Костюк",
    project: "VR-симулятор",
    year: 2024,
    description: "Первый VR-симулятор для медицины.",
    link: "http://localhost:3000/portfolio/vr-medical-simulator",
    image: "https://verpex.com/assets/uploads/images/blog/Is-Selling-3d-Models-Profitable.webp?v=1713956983"
  },
  {
    id: 4,
    lat: 55.7608,
    lng: 49.1144,
    city: "Казань",
    graduate: "Иван Лесницкий",
    project: "AR-приложение для обучения",
    year: 2024,
    description: "Проект попал в акселератор и получил грант.",
    link: "http://localhost:3000/portfolio/ar-education-app",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*S8aT0HfsYQ5XkWC48wV4NA.jpeg"
  },
];

export default successStories;
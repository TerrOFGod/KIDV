'use client'; // Директива для клиентского компонента (требуется для Framer Motion)

import { motion } from "framer-motion";
import Image from "next/image"; // Оптимизированный компонент изображений
import { FaTelegram } from "react-icons/fa";
import PageTitle from "@/components/ui/PageTitle";
import photo from "../assets/avatar-vlada.jpg";

const About = () => {
  return (
    <motion.section
      className="space-y-8 bg-light"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageTitle>О КАФЕДРЕ</PageTitle>

      {/* Руководитель */}
      <div className="flex flex-col md:flex-row gap-6 items-center border-t border-gray-300 pt-6">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src={photo}
            alt="Кугуракова Влада Владимировна"
            fill
            sizes="(max-width: 768px) 100vw, 192px"
            className="object-cover"
            placeholder="blur" // Показываем размытое изображение при загрузке
          />
        </div>
        
        <div className="space-y-2 text-gray-700 text-base">
          <h2 className="text-xl font-semibold text-primary">
            Кугуракова Влада Владимировна
          </h2>
          <p>Руководитель кафедры индустрии разработки видеоигр</p>
          <p>
            <strong>Email:</strong>{" "}
            <a 
              href="mailto:vlada.kugurakova@gmail.com" 
              className="text-blue-600 hover:underline"
              aria-label="Написать письмо Владе Кугураковой"
            >
              vlada.kugurakova@gmail.com
            </a>
          </p>
          <p>
            <strong>Адрес:</strong> ул. Кремлевская 35, каб. 1407
          </p>
          
          <div className="flex items-center gap-2 pt-2">
            <a
              href="https://t.me/vlada_kugurakova"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition-colors"
              aria-label="Telegram Влады Кугураковой"
            >
              <FaTelegram className="text-blue-500 text-base" />
              @vladakugurakova
            </a>
          </div>
        </div>
      </div>

      {/* Основная информация */}
      <div className="text-gray-700 text-lg leading-relaxed space-y-5">
        <p>
          Кафедра индустрии разработки видеоигр (ИРВИ) была создана в 2024 году с целью подготовки специалистов в области разработки видеоигр, виртуальной и дополненной реальности, визуализации данных и симуляционных технологий.
        </p>
        <p>
          Образовательная модель кафедры сочетает академическую строгость, командную работу и междисциплинарные проекты.
        </p>
        <p>
          Программа кафедры разработана с учётом требований индустрии: работа малыми командами, использование современных технологий и игровых движков.
        </p>
      </div>

      {/* Лаборатории и направления */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
            Лаборатории кафедры:
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="flex-1">
                <strong>Digital Media Lab</strong> - разработка мультимедийных и игровых проектов
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="flex-1">
                <strong>SIM-лаборатория</strong> - симуляционные технологии в биомедицине
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
            Ключевые направления:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Разработка видеоигр",
              "Виртуальная и дополненная реальность",
              "Иммерсивные технологии",
              "3D-визуализация",
              "Искусственные нейронные сети (ИНС)",
              "Синтетические данные",
              "Большие данные в геймдеве",
              "Симуляционные тренажёры"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="bg-blue-50 rounded-xl p-6 mt-8 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">
          Наши принципы
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Практико-ориентированность",
              desc: "Все студенты работают над реальными проектами с первого курса"
            },
            {
              title: "Индустриальное партнерство",
              desc: "Сотрудничество с ведущими игровыми студиями и IT-компаниями"
            },
            {
              title: "Междисциплинарность",
              desc: "Сочетание программирования, дизайна, менеджмента и искусства"
            }
          ].map((principle, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-blue-700 mb-2">
                {principle.title}
              </h4>
              <p className="text-gray-700 text-sm">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default About;
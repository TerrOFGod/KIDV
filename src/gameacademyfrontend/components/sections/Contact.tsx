'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTelegram, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactMethod: 'email'
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: FaMapMarkerAlt,
      label: 'Адрес',
      value: 'ул. Кремлевская 35, каб. 1407',
      description: 'Казанский федеральный университет'
    },
    {
      icon: FaPhone,
      label: 'Телефон',
      value: '+7 (XXX) XXX-XX-XX',
      description: 'Пн-Пт с 9:00 до 18:00'
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'info@itis-kirvi.ru',
      description: 'Общие вопросы'
    },
    {
      icon: FaTelegram,
      label: 'Telegram',
      value: '@itis_kirvi',
      description: 'Быстрая связь'
    }
  ];

  return (
    <div id="contact" className="container mx-auto px-4 py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Связаться</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Хотите предложить проект, сотрудничество или задать вопрос? Напишите нам.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Контактная информация */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold mb-6">Контактная информация</h3>
          
          <div className="grid gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-300/10 rounded-lg flex items-center justify-center">
                  <method.icon className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{method.label}</h4>
                  <p className="text-gray-700">{method.value}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Карта */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Карта будет здесь</span>
            </div>
            <div className="p-4">
              <h4 className="font-semibold mb-2">Как добраться</h4>
              <p className="text-sm text-gray-600">
                Главное здание КФУ, 4 этаж, кабинет 1407. 
                Ближайшая остановка - "Университет".
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Форма обратной связи */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold mb-6">Напишите нам</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-2">
                Предпочтительный способ связи
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="email">Email</option>
                <option value="telegram">Telegram</option>
                <option value="phone">Телефон</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Тема сообщения
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="О чем вы хотите поговорить?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Сообщение *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Расскажите подробнее о вашем вопросе или предложении..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-300 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-300/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </button>
            
            <p className="text-sm text-gray-500 text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        </motion.div>
      </div>

      {/* Социальные сети */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-16"
      >
        <h3 className="text-2xl font-semibold mb-6">Мы в социальных сетях</h3>
        <div className="flex justify-center gap-6">
          {['VK', 'Telegram', 'YouTube', 'Habr'].map((social, index) => (
            <motion.a
              key={social}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-12 max-w-20 h-12 bg-blue-300 text-white rounded-full flex items-center justify-center hover:bg-blue-300/90 transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ИТИС КИРВИ</h3>
            <p className="text-gray-400">
              Кафедра индустрии разработки видеоигр
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <div className="space-y-2">
              {['Главная', 'О кафедре', 'Проекты', 'Команда', 'Блог', 'Партнеры', 'Награды', 'FAQ', 'Контакты'].map((item) => (
                <button
                  key={item}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-gray-400">
              <p>ул. Кремлевская 35, каб. 1407</p>
              <p>+7 (XXX) XXX-XX-XX</p>
              <p>info@itis-kirvi.ru</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Соцсети</h4>
            <div className="flex gap-4">
              {['VK', 'TG', 'YT'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 ИТИС КИРВИ. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
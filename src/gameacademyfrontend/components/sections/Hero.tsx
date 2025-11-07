export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Где рождаются будущие лидеры IT
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Практико-ориентированная кафедра, готовящая востребованных специалистов 
          через реальные проекты и сильнейшую фундаментальную подготовку.
        </p>
        <button className="bg-blue-300 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-300/90 transition-colors">
          Начать обучение
        </button>
      </div>
    </div>
  );
}
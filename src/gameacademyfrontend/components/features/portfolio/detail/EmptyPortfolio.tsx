import Link from "next/link";

type EmptyPortfolioProps = {
  slug: string;
};

const EmptyPortfolio = ({slug}: EmptyPortfolioProps) => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Проект не найден</h2>
          <p className="text-gray-700 mb-6">
            Проект с идентификатором "{slug}" не существует или был удалён.
          </p>
          <Link 
            href="/portfolio" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться к портфолио
          </Link>
        </div>
      </div>
);
export default EmptyPortfolio;
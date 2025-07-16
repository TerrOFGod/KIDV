// src/components/ui/BackButton.tsx
import Link from "next/link";

type BackButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const BackButton = ({ href, className = "", children }: BackButtonProps) => (
  <Link 
    href={href} 
    className={`inline-flex items-center px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ${className}`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
    {children}
  </Link>
);

export default BackButton;
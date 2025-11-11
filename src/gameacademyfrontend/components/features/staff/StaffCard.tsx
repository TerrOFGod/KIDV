import Link from 'next/link';
import { StaffMember } from '@/types/staff';
import SafeImage from '@/components/ui/SafeImage';

interface StaffCardProps {
  staff: StaffMember;
}

export default function StaffCard({ staff }: StaffCardProps) {
  return (
    <Link
      href={`/staff/${staff.slug}`}
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-2 block ${
        staff.rarity === 'LEGENDARY' ? 'card-glow-legendary' : 
        staff.rarity === 'RARE' ? 'card-glow-rare' : ''
      }`}
    >
      <div className="relative h-64 bg-gray-200">
        <SafeImage
          src={staff.photo}
          alt={staff.name}
          fill
          className="object-cover"
          fallbackSrc="/images/staff/placeholder.jpg"
        />
        {staff.rarity !== 'COMMON' && (
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
              staff.rarity === 'LEGENDARY' 
                ? 'bg-yellow-100 text-yellow-800 border-yellow-300' 
                : 'bg-purple-100 text-purple-800 border-purple-300'
            }`}>
              {staff.rarity === 'LEGENDARY' ? '⭐ Legendary' : '✨ Rare'}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-900">
          {staff.name}
        </h3>
        <p className="text-blue-300 font-semibold mb-3">
          {staff.position}
        </p>
        {staff.title && (
          <p className="text-gray-600 text-sm mb-3">
            {staff.title}
          </p>
        )}
        
        {staff.researchInterests && staff.researchInterests.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Expertise:</p>
            <div className="flex flex-wrap gap-1">
              {staff.researchInterests.slice(0, 3).map((interest, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          View Profile →
        </div>
      </div>
    </Link>
  );
}
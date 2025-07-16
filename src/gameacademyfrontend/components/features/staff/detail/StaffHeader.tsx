// src/components/features/staff/StaffHeader.tsx
import Image, { StaticImageData } from "next/image";
import { StaffMember } from "@/types/staff";

type StaffHeaderProps = {
  staff: StaffMember;
};

const StaffHeader = ({ staff }: StaffHeaderProps) => (
  <div className="text-center space-y-3">
    <div className="relative w-40 h-40 mx-auto">
      {staff.photo && (
        <Image
          src={staff.photo}
          alt={staff.name}
          fill
          className="object-cover rounded-full border-4 border-primary"
          sizes="(max-width: 640px) 100vw, 160px"
        />
      )}
    </div>
    <h1 className="text-3xl font-bold">{staff.name}</h1>
    <p className="text-gray-600">{staff.position}</p>
    
    {staff.title && (
      <p className="text-gray-500 italic">{staff.title}</p>
    )}
    {staff.rarity && (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
        staff.rarity === "LEGENDARY" ? "bg-purple-100 text-purple-800" :
        staff.rarity === "RARE" ? "bg-blue-100 text-blue-800" :
        "bg-gray-100 text-gray-800"
      }`}>
        {staff.rarity === "LEGENDARY" ? "Легендарный" : 
          staff.rarity === "RARE" ? "Редкий" : "Обычный"}
      </span>
    )}
  </div>
);

export default StaffHeader;
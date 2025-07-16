// src/components/features/staff/StaffContacts.tsx
import { StaffMember } from "@/types/staff";

type StaffContactsProps = {
  staff: StaffMember;
};

const StaffContacts = ({ staff }: StaffContactsProps) => {
  const hasContacts = staff.email || staff.telegram || staff.github;
  
  if (!hasContacts) return null;

  return (
    <div className="space-y-4 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold">Контакты</h2>
      <div className="flex flex-wrap gap-4">
        {staff.email && (
          <a 
            href={`mailto:${staff.email}`}
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <span>✉️</span> {staff.email}
          </a>
        )}
        {staff.telegram && (
          <a 
            href={`https://t.me/${staff.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <span>📨</span> @{staff.telegram}
          </a>
        )}
        {staff.github && (
          <a 
            href={`https://github.com/${staff.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <span>🐙</span> {staff.github}
          </a>
        )}
      </div>
    </div>
  );
};

export default StaffContacts;
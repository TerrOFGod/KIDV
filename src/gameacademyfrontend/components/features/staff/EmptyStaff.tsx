// src/components/features/staff/EmptyStaff.tsx
'use client';

import AnimatedDiv from "@/components/layout/AnimatedDiv";

type EmptyStaffProps = {
  onReset: () => void;
};

const EmptyStaff = ({ onReset }: EmptyStaffProps) => (
    <AnimatedDiv className="text-center py-12 bg-gray-50 rounded-lg" transition={{ duration: 0.3 }}>
        <p className="text-gray-500 mb-4">
            Нет сотрудников с выбранными навыками
        </p>
        <button
            onClick={onReset}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
            Показать всех сотрудников
        </button>
    </AnimatedDiv>
);

export default EmptyStaff;
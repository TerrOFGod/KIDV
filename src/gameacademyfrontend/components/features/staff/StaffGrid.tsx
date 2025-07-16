// src/components/features/staff/StaffGrid.tsx
'use client';

import { motion, AnimatePresence } from "framer-motion";
import { StaffMember } from "@/types/staff";
import StaffCardGameStyle from "@/components/features/staff/StaffCardGameStyle";

type StaffGridProps = {
  staffList: StaffMember[];
};

const StaffGrid = ({ staffList }: StaffGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <AnimatePresence mode="popLayout">
      {staffList.map((staff) => (
        <motion.div
          key={staff.slug}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StaffCardGameStyle {...staff} />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default StaffGrid;
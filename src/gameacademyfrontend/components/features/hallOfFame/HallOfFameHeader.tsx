// src/components/features/hallOfFame/HallOfFameHeader.tsx
import { motion } from "framer-motion";

import PageTitle from "@/components/ui/PageTitle";

const HallOfFameHeader = () => (
  <motion.div
    className="text-center space-y-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <PageTitle>
      <span className="inline-block animate-pulse">💎</span> СТЕНА СЛАВЫ <span className="inline-block animate-pulse">💎</span>
    </PageTitle>
    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
      Лучшие проекты, отобранные руководством кафедры
    </p>
  </motion.div>
);

export default HallOfFameHeader;
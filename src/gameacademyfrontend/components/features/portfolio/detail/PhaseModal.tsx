// src/components/features/portfolio/PhaseModal.tsx
'use client';

import { motion } from "framer-motion";
import { ProjectPhase } from "@/types/portfolio";
import Modal from "@/components/features/Modal";

type PhaseModalProps = {
  phase: ProjectPhase | null;
  onClose: () => void;
};

const PhaseModal = ({ phase, onClose }: PhaseModalProps) => {
  if (!phase) return null;

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{phase.title}</h2>
        <div className="text-sm text-gray-500 mb-2">
          {phase.date}
        </div>
        <p className="text-gray-700">{phase.description}</p>

        {phase.skills && phase.skills.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Развиваемые навыки
            </h3>
            <div className="space-y-3">
              {phase.skills.map((skill, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}/100</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PhaseModal;
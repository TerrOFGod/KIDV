/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { StaffMember } from "@/types/staff";
import staffList from "@/data/staff";
import Link from "next/link";
import Image from "next/image";
import SearchFilter from "@/components/ui/SearchFilter";

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = useMemo(() => {
    let filtered = staffList;

    if (searchQuery) {
      filtered = filtered.filter(staff =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.researchInterests?.some(interest => 
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return filtered.slice(0, 6); // Limit to 6 for homepage
  }, [searchQuery]);

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated educators, researchers, and professionals guiding the next generation of innovators
          </p>
        </motion.div>

        {/* Search for Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-50 rounded-xl p-6 mb-8 max-w-2xl mx-auto"
        >
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search team members by name, position, or expertise..."
            className="w-full"
          />
        </motion.div>

        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {filteredStaff.map((staff, index) => (
            <motion.div
              key={staff.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-2 ${
                staff.rarity === 'LEGENDARY' ? 'card-glow-legendary' : 
                staff.rarity === 'RARE' ? 'card-glow-rare' : ''
              }`}
            >
              <Link href={`/staff/${staff.slug}`}>
                <div className="relative h-64 bg-gray-200">
                  {staff.photo ? (
                    <Image
                      src={staff.photo}
                      alt={staff.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">👤</span>
                        </div>
                        <p className="text-sm">No Photo</p>
                      </div>
                    </div>
                  )}
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
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/staff"
            className="inline-flex items-center px-8 py-3 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors text-lg font-semibold"
          >
            View Full Team
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
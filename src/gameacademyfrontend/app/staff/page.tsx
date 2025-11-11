'use client';

import { useState, useEffect } from 'react';
import { StaffMember } from "@/types/staff";
import staffList from "@/data/staff";
import StaffGrid from "@/components/features/staff/StaffGrid";
import SkillFilter from "@/components/features/staff/SkillFilter";
import SearchFilter from "@/components/features/staff/SearchFilter";

export default function AllStaffPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>(staffList);

  // Get all unique skills
  const allSkills = Array.from(
    new Set(staffList.flatMap(staff => staff.stats?.map(stat => stat.label) || []))
  ).sort();

  useEffect(() => {
    let filtered = staffList;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(staff =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.researchInterests?.some(interest => 
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by selected skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(staff =>
        selectedSkills.every(selected =>
          staff.stats?.some(stat => stat.label === selected)
        )
      );
    }

    setFilteredStaff(filtered);
  }, [searchQuery, selectedSkills]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Team</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet our talented team of educators, researchers, and industry professionals
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <SearchFilter 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by name, position, or research interests..."
          />
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <SkillFilter 
          skills={allSkills}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
        />
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          Showing {filteredStaff.length} of {staffList.length} team members
        </div>
        {filteredStaff.length === 0 && (
          <button
            onClick={resetFilters}
            className="text-blue-300 hover:text-blue-300/80 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Staff Grid */}
      {filteredStaff.length > 0 ? (
        <StaffGrid staffList={filteredStaff} />
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No team members found</div>
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
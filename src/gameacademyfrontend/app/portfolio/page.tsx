'use client';

import { useState, useMemo } from "react";
import { PortfolioItem } from "@/types/portfolio";
import portfolioData from "@/data/portfolio";
import Link from "next/link";
import Image from "next/image";
import SearchFilter from "@/components/ui/SearchFilter";
import AnimatedDiv from '@/components/layout/AnimatedDiv';

export default function AllPortfolioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(portfolioData.map(project => project.category)))];
  }, []);

  const filteredProjects = useMemo(() => {
    return portfolioData.filter((project: PortfolioItem) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.authors?.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === "all" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <AnimatedDiv className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">All Portfolio Projects</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of student projects, research work, and creative endeavors
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search projects by title, description, tags, or authors..."
              className="w-full"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {filteredProjects.length} of {portfolioData.length} projects
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>
                Hall of Fame: {portfolioData.filter(p => p.hallOfFame).length}
              </span>
              <span>
                Categories: {categories.length - 1}
              </span>
            </div>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-sm text-blue-300 hover:text-blue-300/80 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-1"
              >
                <div className="relative h-48 bg-gray-200">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {project.hallOfFame && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
                        ★ Hall of Fame
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {project.year}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags!.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{project.tags!.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {project.authors?.length} author{project.authors?.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No projects found</div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-300/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </AnimatedDiv>
  );
}
'use client';

import { useState, useMemo } from "react";
import { NewsItem } from "@/types/news";
import newsData from "@/data/news";
import Link from "next/link";
import Image from "next/image";
import SearchFilter from "@/components/ui/SearchFilter";
import AnimatedDiv from '@/components/layout/AnimatedDiv';

export default function AllNewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(newsData.map(item => item.category)))];
  }, []);

  const filteredNews = useMemo(() => {
    return newsData.filter((item: NewsItem) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <AnimatedDiv className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">All News & Blog Posts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, tutorials, and insights from our community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search news by title, author, or tags..."
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
              Showing {filteredNews.length} of {newsData.length} articles
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
        {filteredNews.length > 0 ? (
          <div className="grid gap-6">
            {filteredNews.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="md:flex">
                  {item.image && (
                    <div className="md:flex-shrink-0 md:w-64">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={256}
                        height={160}
                        className="h-48 w-full object-cover md:w-64 md:h-full"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.markdown.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="text-gray-900 font-medium">{item.author?.name}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No articles found</div>
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
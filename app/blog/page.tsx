"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { blogs } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "title">("newest");

  const filteredBlogs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const base = blogs.filter((blog) => {
      // Text match
      const haystack = [
        blog.title,
        blog.excerpt,
        blog.author,
        blog.category,
        ...(blog.tags || [])
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery
        ? haystack.includes(normalizedQuery)
        : true;
      return matchesQuery;
    });

    // Sort based on selected option
    const sorted = [...base].sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
      }
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [searchQuery, sortOption]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <Navbar currentPath="/blog" />

      {/* Hero Section */
      }
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            {...fadeIn}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blog</span>
          </motion.h1>
          
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Insights, tips, and stories about AI-powered publishing, writing excellence, and the future of content creation.
          </motion.p>

          <motion.div
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="md:col-span-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts by title, tags, author..."
                  className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Sort by</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Name (A to Z)</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSortOption("newest");
                  }}
                  className="w-full px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Clear filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            {...fadeIn}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Stay Updated
          </motion.h2>
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="text-blue-100 mb-8"
          >
            Subscribe to our newsletter for the latest insights on AI-powered publishing.
          </motion.p>
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer is global via RootLayout */}
    </main>
  );
}

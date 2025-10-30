"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Blog } from "@/data/blogs";
import ClockIcon from "./svg/ClockIcon";
import UserIcon from "./svg/UserIcon";
import TagIcon from "./svg/TagIcon";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {blog.category}
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {blog.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-t pt-4">
            <div className="flex items-center gap-1">
              <UserIcon className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <span className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

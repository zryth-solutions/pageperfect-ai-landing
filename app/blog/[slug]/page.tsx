"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { blogs } from "@/data/blogs";
import Navbar from "@/components/Navbar";
import CalendarIcon from "@/components/svg/CalendarIcon";
import ClockIcon from "@/components/svg/ClockIcon";
import UserIcon from "@/components/svg/UserIcon";
import TagIcon from "@/components/svg/TagIcon";
import ArrowLeftIcon from "@/components/svg/ArrowLeftIcon";
import ArrowRightIcon from "@/components/svg/ArrowRightIcon";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  
  const blog = blogs.find((b) => b.slug === slug);
  
  if (!blog) {
    notFound();
  }

  // Find previous and next blogs
  const currentIndex = blogs.findIndex((b) => b.slug === slug);
  const previousBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <Navbar currentPath="/blog" />

      {/* Back to Blog */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Blog
        </Link>
      </section>

      {/* Hero Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          {...fadeIn}
          className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {blog.category}
          </div>
        </motion.div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              <span className="font-medium">{blog.author}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span>
                {new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <TagIcon className="w-4 h-4" />
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-gray-700 mb-8 leading-relaxed">
              {blog.excerpt}
            </div>
            
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: blog.content
                  .split('\n')
                  .map(line => {
                    // Convert markdown headings
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-4xl font-bold mt-8 mb-4">${line.substring(2)}</h1>`;
                    } else if (line.startsWith('## ')) {
                      return `<h2 class="text-3xl font-bold mt-8 mb-4">${line.substring(3)}</h2>`;
                    } else if (line.startsWith('### ')) {
                      return `<h3 class="text-2xl font-semibold mt-6 mb-3">${line.substring(4)}</h3>`;
                    } else if (line.startsWith('#### ')) {
                      return `<h4 class="text-xl font-semibold mt-4 mb-2">${line.substring(5)}</h4>`;
                    } else if (line.startsWith('- ')) {
                      return `<li class="ml-6 mb-2">${line.substring(2)}</li>`;
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      return `<p class="font-bold mb-4">${line.substring(2, line.length - 2)}</p>`;
                    } else if (line.trim() === '') {
                      return '<br />';
                    } else {
                      return `<p class="mb-4">${line}</p>`;
                    }
                  })
                  .join('')
              }}
            />
          </div>
        </motion.div>
      </article>

      {/* Navigation to Previous/Next Blog */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previousBlog && (
              <Link 
                href={`/blog/${previousBlog.slug}`}
                className="group"
              >
                <motion.div
                  whileHover={{ x: -5 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex items-center gap-2 text-blue-600 mb-3">
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase">Previous</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {previousBlog.title}
                  </h3>
                </motion.div>
              </Link>
            )}
            
            {nextBlog && (
              <Link 
                href={`/blog/${nextBlog.slug}`}
                className="group md:ml-auto"
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex items-center justify-end gap-2 text-blue-600 mb-3">
                    <span className="text-sm font-semibold uppercase">Next</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-right">
                    {nextBlog.title}
                  </h3>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            More Articles You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs
              .filter((b) => b.slug !== slug && b.category === blog.category)
              .slice(0, 3)
              .map((relatedBlog) => (
                <Link key={relatedBlog.id} href={`/blog/${relatedBlog.slug}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 text-sm">
                        {relatedBlog.excerpt}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 PagePerfect AI by Zryth Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

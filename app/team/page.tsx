"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowLeft, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Kushagra Agarwal",
    role: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/kushagra-agarwal",
    image: "/team/kushagra.jpg" // You'll need to add the actual image
  },
  {
    name: "Manas Dewari",
    role: "Co-Founder",
    linkedin: "https://www.linkedin.com/in/manas-dewari",
    image: "/team/manas.jpg" // You'll need to add the actual image
  },
  {
    name: "Apurv Shashvat",
    role: "AI Engineer",
    linkedin: "https://www.linkedin.com/in/apurv-shashvat",
    image: "/team/apurv.jpg" // You'll need to add the actual image
  }
];

export default function TeamPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              <span className="text-lg sm:text-xl font-bold gradient-text">PagePerfect AI</span>
            </Link>
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Team Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            {...fadeIn}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
              Meet Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Led by visionary leadership and driven by innovation, our team brings together expertise in AI, software development, and business strategy to deliver transformative publishing solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="glass-effect p-6 sm:p-8 rounded-2xl text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            // Fallback to initial-based avatar if image fails to load
                            e.currentTarget.style.display = 'none';
                            if (!e.currentTarget.nextElementSibling) {
                              const fallback = document.createElement('div');
                              fallback.className = 'w-full h-full rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-4xl font-bold text-gray-700';
                              fallback.textContent = member.name.charAt(0);
                              e.currentTarget.parentElement?.appendChild(fallback);
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-4xl sm:text-5xl font-bold text-gray-700">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition-colors text-gray-600"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              <span className="text-lg sm:text-xl font-bold gradient-text">PagePerfect AI</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Professional AI book auditing and content quality solutions by{" "}
              <a href="https://zryth.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition underline">
                Zryth Solutions
              </a>
            </p>
            <div className="text-gray-600 text-sm space-y-1">
              <p>
                📞 <a href="tel:+919870661438" className="hover:text-blue-600 transition">+91-9870661438</a>
              </p>
              <p>
                ✉️ <a href="mailto:contact@zryth.com" className="hover:text-blue-600 transition">contact@zryth.com</a>
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-6">
              © 2024 Zryth Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


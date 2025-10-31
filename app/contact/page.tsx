"use client";

import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

function ContactForm() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "1";
  const hasError = searchParams.get("error");
  const [nextUrl, setNextUrl] = useState<string>("/contact?success=1");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNextUrl(`${window.location.origin}/contact?success=1`);
    }
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      {isSuccess && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 text-green-800 p-4">
          Thank you! Your message has been sent.
        </div>
      )}
      {hasError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-800 p-4">
          We couldn&apos;t send your message. Please try again in a moment.
        </div>
      )}

      <motion.form
        {...fadeIn}
        action="https://formsubmit.co/kushagra@zryth.com"
        method="POST"
        className="glass-effect rounded-2xl p-6 sm:p-8 bg-white"
      >
        <input type="hidden" name="_cc" value="sharshit416@gmail.com, manas@zryth.com" />
        <input type="hidden" name="_subject" value="New Contact Request - PagePerfect AI" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={nextUrl} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
            <input
              type="text"
              name="company"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
              placeholder="Your company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
              placeholder="+91-XXXXXXXXXX"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition resize-none"
            placeholder="Tell us about your project or questions"
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Submit
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition text-gray-700"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </>
  );
}

export default function ContactPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <Navbar currentPath="/contact" />

      {/* Hero */}
      <section className="pt-32 pb-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            {...fadeIn}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Tell us about your needs. We usually respond within 1 business day.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={
            <div className="glass-effect rounded-2xl p-6 sm:p-8 bg-white">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          }>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 PagePerfect AI by Zryth Solutions. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}



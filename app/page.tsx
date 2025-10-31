"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { 
  Bot, 
  ArrowRight,
  Zap,
  Target,
  Star,
  Brain,
  X,
  Send,
  Phone,
  Mail,
  FileCheck,
  Languages,
  Layout,
  Image as ImageIcon,
  GraduationCap
} from "lucide-react";
import TryItOut from "@/components/TryItOut";

const HERO_PHRASES = [
  "10x Your Efficiency",
  "Works in Weeknds",
  "Works 24 x 7",
];

function HomeContent() {
  const searchParams = useSearchParams();
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    plan: 'Basic'
  });
  
  // Hero typewriter effect with erase-and-type cycle
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentPhrase = HERO_PHRASES[heroPhraseIndex];
    const baseTypeSpeed = 100; // ms per character while typing
    const baseDeleteSpeed = 50; // ms per character while deleting
    const endHoldMs = 3000; // pause after full phrase typed (3s)
    const startHoldMs = 500; // brief pause before typing next phrase after delete

    let timeoutDelay = isDeleting ? baseDeleteSpeed : baseTypeSpeed;

    if (!isDeleting && typedText === currentPhrase) {
      timeoutDelay = endHoldMs;
    } else if (isDeleting && typedText === "") {
      timeoutDelay = startHoldMs;
    }

    const timeoutId = setTimeout(() => {
      if (!isDeleting) {
        // If full phrase is shown, after the hold switch to deleting
        if (typedText === currentPhrase) {
          setIsDeleting(true);
          return;
        }
        const next = currentPhrase.slice(0, typedText.length + 1);
        setTypedText(next);
      } else {
        const next = currentPhrase.slice(0, Math.max(typedText.length - 1, 0));
        setTypedText(next);
        if (next === "") {
          setIsDeleting(false);
          setHeroPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
        }
      }
    }, timeoutDelay);

    return () => clearTimeout(timeoutId);
  }, [typedText, isDeleting, heroPhraseIndex]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [nextUrl, setNextUrl] = useState<string>("/");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setNextUrl(`${window.location.origin}/?lead=1`);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("lead") === "1") {
      alert("Your form has been submitted. We will contact you within 24 hours.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar onGetStartedClick={() => setShowContactModal(true)} currentPath="/" />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-3 sm:px-4 py-2 glass-effect rounded-full mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-blue-600">Powered by <a href="https://zryth.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition underline">Zryth Solutions</a></span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gray-900">
              AI Book Auditing That
              <span className="block gradient-text" aria-live="polite">
                {typedText}
                <span className="typing-cursor">|</span>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Professional manuscript review with unmatched accuracy, custom knowledge base integration, and agentic workflows. 
              Perfect for authors, publishers, and writing professionals who demand excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <button 
                onClick={() => setShowContactModal(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition text-sm sm:text-base"
              >
                Start Free Trial <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-8 sm:mt-20 px-4"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            {/* Mobile: Compact grid layout */}
            <div className="sm:hidden">
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-effect p-3 rounded-lg text-center">
                  <div className="text-xl font-bold gradient-text mb-1">99.9%</div>
                  <div className="text-gray-600 text-xs">Accuracy Rate</div>
                </div>
                <div className="glass-effect p-3 rounded-lg text-center">
                  <div className="text-xl font-bold gradient-text mb-1">10x</div>
                  <div className="text-gray-600 text-xs">Faster Reviews</div>
                </div>
                <div className="glass-effect p-3 rounded-lg text-center col-span-2">
                  <div className="text-xl font-bold gradient-text mb-1">50K+</div>
                  <div className="text-gray-600 text-xs">Pages Analyzed</div>
                </div>
              </div>
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden sm:grid grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">99.9%</div>
                <div className="text-gray-600 text-sm sm:text-base">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">10x</div>
                <div className="text-gray-600 text-sm sm:text-base">Faster Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">50K+</div>
                <div className="text-gray-600 text-sm sm:text-base">Pages Analyzed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            {...fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Why Choose <span className="gradient-text">PagePerfect AI</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Specialized AI auditing for authors, publishers, and writing professionals</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Unmatched Accuracy</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our AI models are specifically trained for manuscript analysis with 99.9% accuracy in detecting inconsistencies, grammar issues, and style violations.
              </p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Agentic Workflows</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Automated multi-step review processes that handle complex editing tasks, fact-checking, and consistency validation across entire manuscripts.
              </p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">10x Efficiency Boost</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Review entire manuscripts in minutes, not days. Our parallel processing handles multiple chapters simultaneously while maintaining consistency.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Offerings Section */}
      <section id="offerings" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            {...fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Our <span className="gradient-text">Product Offerings</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Comprehensive AI-powered solutions for book publishing and content creation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <FileCheck className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">AI-powered Book Proofreader</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Detects grammatical, contextual, and stylistic errors, providing improvement suggestions for enhanced book quality.
              </p>
              <p className="text-sm font-semibold text-blue-600">For pricing contact us</p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <Languages className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Multilingual Publishing AI Agent</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Translates and localizes books into multiple languages, eliminating expensive translation costs.
              </p>
              <p className="text-sm font-semibold text-purple-600">For pricing contact us</p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">AI Book Content Generator</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Generates structured book content based on topic, plot, and author style, including educational and research-oriented material.
              </p>
              <p className="text-sm font-semibold text-green-600">For pricing contact us</p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <Layout className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">AI Template and Style Sheet Generator</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Creates ready-to-use professional book layouts and design frameworks.
              </p>
              <p className="text-sm font-semibold text-yellow-600">For pricing contact us</p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-pink-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Book Cover Generator</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Designs context-aware and brand-aligned book covers using AI.
              </p>
              <p className="text-sm font-semibold text-pink-600">For pricing contact us</p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Interactive Learning Generators</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Develops e-learning modules and interactive content for educational publishers.
              </p>
              <p className="text-sm font-semibold text-indigo-600">For pricing contact us</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Try It Out Section */}
      <TryItOut />

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            {...fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Flexible <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Feature-wise pricing tailored to your needs</p>
          </motion.div>

          <motion.div 
            className="glass-effect p-8 sm:p-12 rounded-3xl max-w-4xl mx-auto text-center"
          >
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Custom Pricing for Every Client</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                We offer feature-wise pricing with customized plans for different clients. Our flexible pricing model ensures you only pay for what you need.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">For Pricing Contact Us</p>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Get a personalized quote based on your specific requirements and scale.
              </p>
            </div>
            <button 
              onClick={() => setShowContactModal(true)}
              className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:opacity-90 transition text-sm sm:text-base flex items-center justify-center gap-2 mx-auto"
            >
              Contact Us for Pricing <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <a href="tel:+919870661438" className="hover:text-blue-600 transition">+91-9870661438</a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-purple-500" />
                  <a href="mailto:contact@zryth.com" className="hover:text-purple-600 transition">contact@zryth.com</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            {...fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">See what authors and publishers say about us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                &ldquo;PagePerfect AI transformed our educational content quality. With their custom knowledge base, we achieved 99.9% accuracy in textbook auditing. The agentic workflows reduced our review time by 10x while maintaining our high standards.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">Rajesh Kumar</div>
                  <div className="text-xs sm:text-sm text-gray-600">Content Director, Oswaal Books</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                &ldquo;The agentic workflows are phenomenal. We automated our entire manuscript review pipeline and reduced errors by 95%. The 10x efficiency boost is real - ROI was immediate.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">PBPD Publications</div>
                  <div className="text-xs sm:text-sm text-gray-600">Publishing House</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-effect p-8 sm:p-12 rounded-3xl text-center"
            {...fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Ready to <span className="gradient-text">10x Your Efficiency?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
              Join authors, publishers, and writing professionals using PagePerfect AI to achieve unmatched accuracy and 10x efficiency
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button 
                onClick={() => setShowContactModal(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition text-sm sm:text-base"
              >
                Start Free Trial <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">No credit card required • 14-day free trial</p>
          </motion.div>
        </div>
      </section>

      {/* Footer is now global via RootLayout */}

      {/* Contact Form Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Get Started with PagePerfect AI</h3>
              <p className="text-gray-600 text-sm sm:text-base">Let&rsquo;s discuss your content auditing needs and analyze your books for quality</p>
            </div>

            <form
              action="https://formsubmit.co/kushagra@zryth.com"
              method="POST"
              className="space-y-4 sm:space-y-6"
            >
              <input type="hidden" name="_cc" value="sharshit416@gmail.com, manas@zryth.com" />
              <input type="hidden" name="_subject" value="New Get Started Request - PagePerfect AI" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={nextUrl} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition text-sm sm:text-base"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition text-sm sm:text-base"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition text-sm sm:text-base"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Interest</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none transition text-sm sm:text-base"
                >
                  <option value="Basic">AI-powered Book Proofreader</option>
                  <option value="Professional">Multilingual Publishing AI Agent</option>
                  <option value="Enterprise">AI Book Content Generator</option>
                  <option value="Templates">AI Template and Style Sheet Generator</option>
                  <option value="Cover">Book Cover Generator</option>
                  <option value="Learning">Interactive Learning Generators</option>
                  <option value="Multiple">Multiple Products</option>
                  <option value="Not Sure">Not Sure - Need Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your content auditing needs *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition resize-none text-sm sm:text-base"
                  placeholder="Describe your books, manuscripts, or content that needs auditing. What type of analysis are you looking for?"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:opacity-90 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition text-sm sm:text-base text-gray-700"
                >
                  Cancel
                </button>
              </div>

              <div className="text-center text-xs sm:text-sm text-gray-500">
                <p>Or contact us directly:</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-2">
                  <a href="tel:+919870661438" className="flex items-center justify-center gap-2 hover:text-blue-600 transition">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    +91-9870661438
                  </a>
                  <a href="mailto:contact@zryth.com" className="flex items-center justify-center gap-2 hover:text-blue-600 transition">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    contact@zryth.com
                  </a>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
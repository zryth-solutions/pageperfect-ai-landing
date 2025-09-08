"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Sparkles, 
  Bot, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Shield,
  Target,
  Users,
  BarChart3,
  Globe,
  Star,
  Brain,
  X,
  Play,
  Send,
  Phone,
  Mail
} from "lucide-react";

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    plan: 'Basic'
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon to discuss your content auditing needs.');
    setShowContactModal(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      plan: 'Basic'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              <span className="text-lg sm:text-xl font-bold gradient-text">PagePerfect AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition">Testimonials</a>
              <button 
                onClick={() => setShowContactModal(true)}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:opacity-90 transition text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

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
              <span className="block gradient-text">10x Your Efficiency</span>
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
              <button 
                onClick={() => setShowDemoModal(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 glass-effect rounded-full font-semibold hover:bg-gray-100 transition text-sm sm:text-base text-gray-700"
              >
                View Demo
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
              className="glass-effect p-6 sm:p-8 rounded-2xl hover:scale-105 transition-transform"
              whileHover={{ y: -10 }}
            >
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Unmatched Accuracy</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our AI models are specifically trained for manuscript analysis with 99.9% accuracy in detecting inconsistencies, grammar issues, and style violations.
              </p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl hover:scale-105 transition-transform"
              whileHover={{ y: -10 }}
            >
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Custom Knowledge Base</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Upload your style guides, previous works, and reference materials. Our AI learns your unique voice and requirements for perfectly tailored audits.
              </p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl hover:scale-105 transition-transform"
              whileHover={{ y: -10 }}
            >
              <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Agentic Workflows</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Automated multi-step review processes that handle complex editing tasks, fact-checking, and consistency validation across entire manuscripts.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl hover:scale-105 transition-transform"
              whileHover={{ y: -10 }}
            >
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">10x Efficiency Boost</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Review entire manuscripts in minutes, not days. Our parallel processing handles multiple chapters simultaneously while maintaining consistency.
              </p>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl hover:scale-105 transition-transform"
              whileHover={{ y: -10 }}
            >
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Enterprise Security</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Bank-level encryption, SOC 2 compliance, and complete data privacy. Your manuscripts are protected with industry-leading security protocols.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            {...fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Pay per page, scale as you grow</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Basic Plan */}
            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Basic</h3>
                <p className="text-gray-600 text-sm sm:text-base">Essential AI auditing</p>
              </div>
              <div className="mb-6 sm:mb-8">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">$0.24</span>
                <span className="text-gray-600 text-sm sm:text-base">/page</span>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">₹20 per page</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Grammar & spelling check</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Basic style consistency</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Standard processing speed</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Export in PDF/DOCX</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowContactModal(true)}
                className="w-full py-3 sm:py-3 glass-effect rounded-full hover:bg-gray-100 transition text-sm sm:text-base font-semibold text-gray-700"
              >
                Get Started
              </button>
            </motion.div>

            {/* Professional Plan */}
            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl border-2 border-blue-500 relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xs sm:text-sm text-white">
                Most Popular
              </div>
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Professional</h3>
                <p className="text-gray-600 text-sm sm:text-base">With custom knowledge base</p>
              </div>
              <div className="mb-6 sm:mb-8">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">$0.48</span>
                <span className="text-gray-600 text-sm sm:text-base">/page</span>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">₹40 per page</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Everything in Basic</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Custom knowledge base</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Style guide integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Priority processing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Advanced analytics</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowContactModal(true)}
                className="w-full py-3 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:opacity-90 transition text-sm sm:text-base font-semibold"
              >
                Get Started
              </button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Enterprise</h3>
                <p className="text-gray-600 text-sm sm:text-base">AI agent + knowledge base</p>
              </div>
              <div className="mb-6 sm:mb-8">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">$0.72</span>
                <span className="text-gray-600 text-sm sm:text-base">/page</span>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">₹60 per page</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Everything in Professional</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">AI agent workflows</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Multi-document analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">API access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-600">Dedicated support</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowContactModal(true)}
                className="w-full py-3 sm:py-3 glass-effect rounded-full hover:bg-gray-100 transition text-sm sm:text-base font-semibold text-gray-700"
              >
                Contact Sales
              </button>
            </motion.div>
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
              whileHover={{ y: -10 }}
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
              whileHover={{ y: -10 }}
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
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">Michael Chen</div>
                  <div className="text-xs sm:text-sm text-gray-600">Bestselling Author</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="glass-effect p-6 sm:p-8 rounded-2xl"
              whileHover={{ y: -10 }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                &ldquo;As an author, PagePerfect AI&rsquo;s accuracy is unmatched. The AI catches subtle plot inconsistencies and character development issues that human editors miss. It&rsquo;s like having a super-powered editor.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">Emily Rodriguez</div>
                  <div className="text-xs sm:text-sm text-gray-600">CEO, Literary Studios</div>
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
              <button 
                onClick={() => setShowDemoModal(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 glass-effect rounded-full font-semibold hover:bg-gray-100 transition text-sm sm:text-base text-gray-700"
              >
                Schedule Demo
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">No credit card required • 14-day free trial</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                <span className="text-lg sm:text-xl font-bold gradient-text">PagePerfect AI</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Professional AI book auditing and content quality solutions by <a href="https://zryth.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition underline">Zryth Solutions</a>
              </p>
              <div className="text-gray-600 text-sm space-y-1">
                <p>📞 <a href="tel:+917455900568" className="hover:text-blue-600 transition">+91-7455900568</a></p>
                <p>✉️ <a href="mailto:contact@zryth.com" className="hover:text-blue-600 transition">contact@zryth.com</a></p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Product</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition">Features</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">API Docs</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Security</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Zryth Solutions. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition" />
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition" />
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition" />
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Video Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-2xl p-6 max-w-4xl w-full relative shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button 
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">PagePerfect AI Demo</h3>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Watch our demo video to see PagePerfect AI in action</p>
                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-700 mb-2">Demo Video Coming Soon!</p>
                  <p className="text-xs text-gray-500">
                    Contact us at <a href="mailto:contact@zryth.com" className="text-blue-500 hover:underline">contact@zryth.com</a> to schedule a live demo
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

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

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Interest</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none transition text-sm sm:text-base"
                >
                  <option value="Basic">Basic ($0.24/page)</option>
                  <option value="Professional">Professional ($0.48/page)</option>
                  <option value="Enterprise">Enterprise ($0.72/page)</option>
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
                  <a href="tel:+917455900568" className="flex items-center justify-center gap-2 hover:text-blue-600 transition">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    +91-7455900568
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
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, BookOpen, Zap, Volume2, VolumeX } from "lucide-react";

export default function VisionPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    if (typeof window !== "undefined") {
      const audio = new Audio("/ai-voice.mp3");
      audio.volume = 0.8;
      audioRef.current = audio;

      // Audio event listeners
      audio.addEventListener("play", () => setIsSpeaking(true));
      audio.addEventListener("ended", () => setIsSpeaking(false));
      audio.addEventListener("pause", () => {
        setIsSpeaking(false);
        setAnimationPhase(0);
      });

      // Sync animation phases with audio timing
      audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;
        if (currentTime < 5) setAnimationPhase(1);
        else if (currentTime < 10) setAnimationPhase(2);
        else if (currentTime < 15) setAnimationPhase(3);
        else if (currentTime < 20) setAnimationPhase(4);
        else setAnimationPhase(5);
      });

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, []);

  useEffect(() => {
    // Show popup after 1.5 seconds on every visit
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showPopup && !isMuted && audioRef.current) {
      // Wait a bit for the popup animation to complete
      const timer = setTimeout(() => {
        audioRef.current?.play().catch(error => {
          console.log("Audio playback failed:", error);
          setIsSpeaking(false);
        });
      }, 800);

      return () => {
        clearTimeout(timer);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }
  }, [showPopup, isMuted]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.log("Audio playback failed:", error);
        });
      }
    } else {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-xl overflow-y-auto py-4 px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative max-w-4xl w-full my-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Control buttons */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10 flex gap-2">
              {/* Mute/Unmute button */}
              <button
                onClick={toggleMute}
                className="p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
                title={isMuted ? "Unmute narration" : "Mute narration"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                    {isSpeaking && (
                      <motion.span
                        className="absolute inset-0 rounded-full border-2 border-blue-500"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </>
                )}
              </button>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
            </div>

            {/* Background glow effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl md:rounded-3xl">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl" />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 sm:p-6 md:p-12">
              {/* Left side - Animated Sphere */}
              <div className="flex items-center justify-center py-4 md:py-0">
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80">
                  {/* Animated Sphere */}
                  <AnimatedSphere isSpeaking={isSpeaking} animationPhase={animationPhase} />
                  
                  {/* Floating icons - Hidden on small mobile */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="hidden sm:block absolute top-8 -left-4"
                  >
                    <div className="p-2 md:p-3 bg-blue-50 rounded-2xl border border-blue-200">
                      <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="hidden sm:block absolute bottom-12 -right-4"
                  >
                    <div className="p-2 md:p-3 bg-purple-50 rounded-2xl border border-purple-200">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="hidden sm:block absolute top-1/2 -right-6"
                  >
                    <div className="p-2 md:p-3 bg-blue-50 rounded-2xl border border-blue-200">
                      <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="flex flex-col justify-center space-y-3 md:space-y-6 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-blue-50 rounded-full border border-blue-200 mb-2 md:mb-4">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2 text-blue-600" />
                    <span className="text-xs md:text-sm font-semibold text-blue-600">Introducing AI Book Writing Agent</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight break-words">
                    Publishing, Re-Imagined
                  </h2>
                  
                  <p className="text-xs sm:text-sm md:text-lg text-gray-600 leading-relaxed break-words">
                    We're revolutionizing how books are created, <span className="font-semibold text-blue-600 whitespace-nowrap">at half the cost</span>.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2 md:space-y-4"
                >
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="mt-1 p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed break-words flex-1 min-w-0">
                      <span className="font-semibold text-gray-900">Intelligent proofreading</span> with unmatched accuracy and <span className="font-semibold text-gray-900">seamless multi-lingual publishing</span> — empowering publishers worldwide
                    </p>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="mt-1 p-1.5 bg-purple-100 rounded-lg flex-shrink-0">
                      <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed break-words flex-1 min-w-0">
                      <span className="font-semibold text-gray-900">Just share your core idea</span> through natural conversation — our AI captures its essence and builds a complete, publication-ready manuscript
                    </p>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="mt-1 p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed break-words flex-1 min-w-0">
                      <span className="font-semibold text-gray-900 inline-block">Fiction, fantasy, research papers</span> — our AI agents bring your vision to life. And this is just the tip of the iceberg
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-2 md:pt-4"
                >
                  <button
                    onClick={handleClose}
                    className="w-full md:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    Experience the Future
                    <span>→</span>
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Animated Sphere Component
function AnimatedSphere({ isSpeaking, animationPhase }: { isSpeaking: boolean; animationPhase: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main sphere */}
      <motion.div
        className="absolute w-40 h-40 sm:w-52 sm:h-52 md:w-72 md:h-72 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.4), rgba(29, 78, 216, 0.2))",
          boxShadow: "0 0 80px rgba(59, 130, 246, 0.6), inset 0 0 40px rgba(59, 130, 246, 0.3)",
        }}
        animate={isSpeaking ? {
          scale: [1, 1.08, 1.03, 1.08, 1],
          rotate: [0, 3, -3, 3, 0],
        } : {
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={isSpeaking ? {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        } : {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Particle layers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{
            width: `${200 + i * 25}px`,
            height: `${200 + i * 25}px`,
            borderColor: `rgba(59, 130, 246, ${0.2 - i * 0.05})`,
          }}
          animate={isSpeaking ? {
            rotate: 360,
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.7, 0.3],
          } : {
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={isSpeaking ? {
            rotate: {
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          } : {
            rotate: {
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glow effect */}
      <motion.div
        className="absolute w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={isSpeaking ? {
          scale: [1, 1.3, 1.15, 1.3, 1],
          opacity: [0.5, 1, 0.7, 1, 0.5],
        } : {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={isSpeaking ? {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        } : {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Inner core */}
      <motion.div
        className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.4))",
          boxShadow: "0 0 40px rgba(147, 197, 253, 0.8)",
        }}
        animate={isSpeaking ? {
          scale: [1, 1.15, 1.05, 1.15, 1],
          opacity: [0.8, 1, 0.9, 1, 0.8],
        } : {
          scale: [1, 1.1, 1],
        }}
        transition={isSpeaking ? {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        } : {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan accent particles */}
      {[...Array(15)].map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 120 + Math.random() * 40;
        return (
          <motion.div
            key={`cyan-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}


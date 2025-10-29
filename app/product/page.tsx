"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  ArrowLeft,
  Download,
  Eye,
  Clock,
  Brain,
  Zap,
  Target,
  X,
  Sparkles
} from "lucide-react";

interface AnalysisResult {
  errors: Array<{
    id: string;
    type: 'grammar' | 'spelling' | 'style' | 'consistency' | 'plot' | 'character' | 'pacing';
    severity: 'low' | 'medium' | 'high' | 'critical';
    page: number;
    line: number;
    text: string;
    suggestion: string;
    confidence: number;
    category: string;
    detailedExplanation?: string;
  }>;
  corrections: Array<{
    id: string;
    original: string;
    corrected: string;
    reason: string;
    page: number;
    category: string;
    autoApplied: boolean;
  }>;
  suggestions: Array<{
    id: string;
    type: 'improvement' | 'enhancement' | 'optimization' | 'plot' | 'character' | 'dialogue' | 'description';
    content: string;
    impact: 'low' | 'medium' | 'high' | 'critical';
    page: number;
    category: string;
    detailedAnalysis?: string;
    examples?: string[];
  }>;
  characterAnalysis: Array<{
    name: string;
    consistency: number;
    development: string;
    issues: string[];
    strengths: string[];
    suggestions: string[];
  }>;
  plotAnalysis: {
    structure: string;
    pacing: string;
    conflicts: string[];
    resolution: string;
    issues: string[];
    suggestions: string[];
  };
  styleAnalysis: {
    voice: string;
    tone: string;
    consistency: number;
    issues: string[];
    strengths: string[];
    recommendations: string[];
  };
  summary: {
    totalPages: number;
    errorsFound: number;
    correctionsMade: number;
    suggestionsProvided: number;
    accuracyScore: number;
    processingTime: string;
    overallRating: string;
    readabilityScore: number;
    genreClassification: string;
  };
}

interface KnowledgeBaseItem {
  id: string;
  name: string;
  type: 'style-guide' | 'previous-work' | 'reference-material' | 'character-profile' | 'world-building';
  fileSize: string;
  uploadDate: string;
  relevanceScore: number;
  description: string;
  tags: string[];
}

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'user' | 'ai', message: string, timestamp: Date}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'errors' | 'characters' | 'plot' | 'style' | 'knowledge'>('overview');
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [knowledgeBaseItems, setKnowledgeBaseItems] = useState<KnowledgeBaseItem[]>([
    {
      id: '1',
      name: 'Chicago Manual of Style Guide',
      type: 'style-guide',
      fileSize: '2.3 MB',
      uploadDate: '2024-01-15',
      relevanceScore: 95,
      description: 'Comprehensive style guide for academic and professional writing',
      tags: ['grammar', 'style', 'formatting', 'citations']
    },
    {
      id: '2',
      name: 'Previous Novel - The Silent Echo',
      type: 'previous-work',
      fileSize: '1.8 MB',
      uploadDate: '2024-01-10',
      relevanceScore: 88,
      description: 'My previous published novel for style consistency reference',
      tags: ['voice', 'tone', 'character-development', 'dialogue']
    },
    {
      id: '3',
      name: 'Character Development Template',
      type: 'character-profile',
      fileSize: '156 KB',
      uploadDate: '2024-01-08',
      relevanceScore: 92,
      description: 'Detailed character profiles and development guidelines',
      tags: ['characters', 'personality', 'backstory', 'motivation']
    },
    {
      id: '4',
      name: 'Fantasy World Building Notes',
      type: 'world-building',
      fileSize: '3.1 MB',
      uploadDate: '2024-01-05',
      relevanceScore: 76,
      description: 'Comprehensive world-building documentation and lore',
      tags: ['world-building', 'magic-system', 'history', 'geography']
    }
  ]);

  const sampleResult: AnalysisResult = {
    errors: [
      {
        id: '1',
        type: 'grammar',
        severity: 'high',
        page: 12,
        line: 8,
        text: "The character's motivation was unclear, and it's actions seemed contradictory.",
        suggestion: "The character's motivation was unclear, and its actions seemed contradictory.",
        confidence: 95,
        category: 'Grammar & Syntax',
        detailedExplanation: "This is a common possessive pronoun error. 'It's' is a contraction for 'it is' or 'it has', while 'its' is the possessive form. This correction follows the Chicago Manual of Style Guide (95% relevance) from your knowledge base.",
        knowledgeBaseReference: "Chicago Manual of Style Guide - Section 5.2"
      },
      {
        id: '2',
        type: 'spelling',
        severity: 'medium',
        page: 45,
        line: 3,
        text: "The protagonist embraked on a journey of self-discovery.",
        suggestion: "The protagonist embarked on a journey of self-discovery.",
        confidence: 98,
        category: 'Spelling',
        detailedExplanation: "Simple spelling error - 'embraked' should be 'embarked'. This appears to be a typo rather than a knowledge gap."
      },
      {
        id: '3',
        type: 'consistency',
        severity: 'medium',
        page: 78,
        line: 12,
        text: "Sarah's eye color changed from blue to green without explanation.",
        suggestion: "Consider maintaining consistent character descriptions or adding explanation for the change.",
        confidence: 87,
        category: 'Character Consistency',
        detailedExplanation: "Character descriptions should remain consistent unless there's a plot reason for the change. Consider adding context or maintaining the original description. This analysis references your Character Development Template (92% relevance) and Previous Novel (88% relevance) for consistency patterns.",
        knowledgeBaseReference: "Character Development Template - Consistency Guidelines"
      },
      {
        id: '4',
        type: 'plot',
        severity: 'high',
        page: 95,
        line: 15,
        text: "The sudden appearance of the antagonist feels rushed and lacks proper foreshadowing.",
        suggestion: "Add subtle hints or mentions of the antagonist earlier in the story to create better narrative flow.",
        confidence: 92,
        category: 'Plot Development',
        detailedExplanation: "Major plot elements should be properly foreshadowed to maintain narrative credibility and reader engagement."
      },
      {
        id: '5',
        type: 'pacing',
        severity: 'medium',
        page: 67,
        line: 22,
        text: "This chapter contains too much exposition in a single scene.",
        suggestion: "Break up the exposition across multiple scenes or add action to maintain reader interest.",
        confidence: 89,
        category: 'Pacing & Structure',
        detailedExplanation: "Large blocks of exposition can slow down the narrative pace and disengage readers."
      }
    ],
    corrections: [
      {
        id: '1',
        original: "it's actions",
        corrected: "its actions",
        reason: "Possessive pronoun correction",
        page: 12,
        category: 'Grammar',
        autoApplied: true
      },
      {
        id: '2',
        original: "embraked",
        corrected: "embarked",
        reason: "Spelling correction",
        page: 45,
        category: 'Spelling',
        autoApplied: true
      },
      {
        id: '3',
        original: "alot",
        corrected: "a lot",
        reason: "Common spelling error correction",
        page: 23,
        category: 'Spelling',
        autoApplied: true
      },
      {
        id: '4',
        original: "there going to",
        corrected: "they're going to",
        reason: "Homophone correction",
        page: 56,
        category: 'Grammar',
        autoApplied: true
      }
    ],
    suggestions: [
      {
        id: '1',
        type: 'dialogue',
        content: "Consider adding more dialogue to break up the lengthy narrative paragraphs in Chapter 3.",
        impact: 'medium',
        page: 23,
        category: 'Dialogue Enhancement',
        detailedAnalysis: "Dialogue can help break up dense narrative sections and make the story more engaging. Consider adding conversations that reveal character traits or advance the plot.",
        examples: ["Add character conversations", "Include internal monologue", "Use dialogue tags effectively"]
      },
      {
        id: '2',
        type: 'character',
        content: "The character development could be strengthened by adding internal monologue to show motivation.",
        impact: 'high',
        page: 67,
        category: 'Character Development',
        detailedAnalysis: "Internal monologue helps readers understand character motivations and creates deeper emotional connections.",
        examples: ["Show character thoughts", "Reveal internal conflicts", "Express character fears and hopes"]
      },
      {
        id: '3',
        type: 'description',
        content: "This section could benefit from more sensory details to enhance reader immersion.",
        impact: 'medium',
        page: 89,
        category: 'Descriptive Writing',
        detailedAnalysis: "Sensory details help readers visualize scenes and create more immersive reading experiences.",
        examples: ["Add visual descriptions", "Include sounds and smells", "Describe textures and temperatures"]
      },
      {
        id: '4',
        type: 'plot',
        content: "The subplot involving the secondary character could be better integrated with the main storyline.",
        impact: 'high',
        page: 112,
        category: 'Plot Structure',
        detailedAnalysis: "Subplots should complement and enhance the main plot rather than feeling disconnected.",
        examples: ["Connect subplot events to main plot", "Use subplot characters to advance main story", "Create thematic connections"]
      }
    ],
    characterAnalysis: [
      {
        name: "Sarah Mitchell",
        consistency: 85,
        development: "Strong character arc with clear motivation and growth throughout the story.",
        issues: ["Eye color inconsistency", "Some dialogue feels out of character"],
        strengths: ["Well-defined personality", "Clear motivation", "Realistic reactions"],
        suggestions: ["Maintain consistent physical descriptions", "Review dialogue for character voice consistency"]
      },
      {
        name: "Marcus Thompson",
        consistency: 92,
        development: "Excellent character development with believable transformation.",
        issues: ["Minor dialogue inconsistencies"],
        strengths: ["Complex personality", "Realistic character flaws", "Strong character voice"],
        suggestions: ["Fine-tune dialogue to match character background"]
      },
      {
        name: "Dr. Elena Rodriguez",
        consistency: 78,
        development: "Good character concept but needs more development.",
        issues: ["Underdeveloped backstory", "Inconsistent expertise level"],
        strengths: ["Unique perspective", "Important role in plot"],
        suggestions: ["Add more backstory details", "Clarify character expertise and limitations"]
      }
    ],
    plotAnalysis: {
      structure: "Three-act structure with clear beginning, middle, and end. Well-paced overall with minor pacing issues in middle chapters.",
      pacing: "Generally good pacing with some slower sections in chapters 4-6. Climax is well-timed and satisfying.",
      conflicts: ["Man vs. Self (internal struggle)", "Man vs. Society (social pressures)", "Man vs. Nature (environmental challenges)"],
      resolution: "Satisfying resolution that addresses all major plot threads. Some minor subplots could be better resolved.",
      issues: ["Foreshadowing could be stronger", "Some plot points feel rushed", "Minor plot holes in timeline"],
      suggestions: ["Add more subtle foreshadowing", "Expand on rushed plot points", "Review timeline consistency"]
    },
    styleAnalysis: {
      voice: "Clear, engaging narrative voice with good balance of description and action.",
      tone: "Consistent tone throughout, though some sections could benefit from tonal variety.",
      consistency: 88,
      issues: ["Some repetitive sentence structures", "Occasional tonal shifts"],
      strengths: ["Strong narrative voice", "Good use of literary devices", "Effective pacing"],
      recommendations: ["Vary sentence structures", "Maintain consistent tone", "Continue strong narrative voice"]
    },
    summary: {
      totalPages: 150,
      errorsFound: 5,
      correctionsMade: 4,
      suggestionsProvided: 4,
      accuracyScore: 94.2,
      processingTime: "45 seconds",
      overallRating: "Excellent",
      readabilityScore: 78,
      genreClassification: "Literary Fiction"
    }
  };

  const analysisTasks = [
    "Uploading document...",
    "Extracting text content...",
    "Loading knowledge base...",
    "Cross-referencing with style guides...",
    "Analyzing grammar and spelling...",
    "Checking style consistency...",
    "Reviewing character development...",
    "Validating plot coherence...",
    "Generating AI suggestions...",
    "Compiling final report..."
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      startAnalysis();
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const startAnalysis = () => {
    setCurrentStep('analyzing');
    setAnalysisProgress(0);
    setCurrentTask(analysisTasks[0]);

    let progress = 0;
    let taskIndex = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 8 + 3; // Random progress between 3-11% (slower)
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setAnalysisResult(sampleResult);
          setCurrentStep('results');
        }, 2000); // Longer delay before showing results
      }

      setAnalysisProgress(progress);

      // Update task based on progress
      const newTaskIndex = Math.floor((progress / 100) * analysisTasks.length);
      if (newTaskIndex !== taskIndex && newTaskIndex < analysisTasks.length) {
        taskIndex = newTaskIndex;
        setCurrentTask(analysisTasks[taskIndex]);
      }
    }, 1200); // Increased interval from 800ms to 1200ms
  };

  const resetDemo = () => {
    setCurrentStep('upload');
    setUploadedFile(null);
    setAnalysisProgress(0);
    setCurrentTask('');
    setAnalysisResult(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100 border-red-200';
      case 'high': return 'text-red-500 bg-red-50 border-red-100';
      case 'medium': return 'text-yellow-500 bg-yellow-50 border-yellow-100';
      case 'low': return 'text-green-500 bg-green-50 border-green-100';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grammar': return <CheckCircle className="w-4 h-4" />;
      case 'spelling': return <AlertCircle className="w-4 h-4" />;
      case 'style': return <Target className="w-4 h-4" />;
      case 'consistency': return <Brain className="w-4 h-4" />;
      case 'plot': return <Zap className="w-4 h-4" />;
      case 'character': return <Users className="w-4 h-4" />;
      case 'pacing': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      message: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        message: generateAIResponse(chatInput),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('character') || input.includes('sarah') || input.includes('marcus')) {
      return "Based on your knowledge base and the analysis, Sarah Mitchell shows strong character development but has some consistency issues with physical descriptions. I've referenced your Character Development Template (92% relevance) and Previous Novel (88% relevance) to ensure suggestions align with your established character voice. Would you like me to suggest specific improvements for any character?";
    } else if (input.includes('plot') || input.includes('story') || input.includes('narrative')) {
      return "The plot structure follows a solid three-act format with good pacing overall. I've cross-referenced your World Building Notes (76% relevance) to ensure plot elements align with your established lore. The main issues are around foreshadowing and some rushed plot points. What aspect of the plot would you like to focus on?";
    } else if (input.includes('grammar') || input.includes('spelling') || input.includes('error')) {
      return "I found 5 errors in your manuscript, using your Chicago Manual of Style Guide (95% relevance) as the primary reference. Most have been automatically corrected according to your style preferences, but I can explain any specific corrections or help you understand the rules behind them. Which error would you like to discuss?";
    } else if (input.includes('style') || input.includes('voice') || input.includes('tone')) {
      return "Your writing style shows a clear, engaging voice with good narrative flow. I've analyzed it against your Previous Novel (88% relevance) to maintain consistency with your established voice. The main areas for improvement are sentence structure variety and maintaining consistent tone throughout. What would you like to work on?";
    } else if (input.includes('knowledge') || input.includes('reference')) {
      return "Your knowledge base contains 4 reference materials with an average relevance score of 87.5%. The Chicago Manual of Style Guide (95% relevance) is most relevant for grammar corrections, while your Character Development Template (92% relevance) helps with character consistency. Would you like me to explain how any specific reference material influenced the analysis?";
    } else {
      return "I'm here to help you improve your manuscript using your personalized knowledge base! I can discuss character development, plot structure, grammar corrections, style improvements, or how your reference materials influenced the analysis. What would you like to focus on?";
    }
  };

  const addKnowledgeBaseItem = (item: Omit<KnowledgeBaseItem, 'id'>) => {
    const newItem: KnowledgeBaseItem = {
      ...item,
      id: Date.now().toString()
    };
    setKnowledgeBaseItems(prev => [...prev, newItem]);
  };

  const removeKnowledgeBaseItem = (id: string) => {
    setKnowledgeBaseItems(prev => prev.filter(item => item.id !== id));
  };

  const getKnowledgeBaseTypeIcon = (type: string) => {
    switch (type) {
      case 'style-guide': return <BookOpen className="w-4 h-4" />;
      case 'previous-work': return <FileText className="w-4 h-4" />;
      case 'reference-material': return <Database className="w-4 h-4" />;
      case 'character-profile': return <Users className="w-4 h-4" />;
      case 'world-building': return <Target className="w-4 h-4" />;
      default: return <FileCheck className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'style-guide': return 'bg-blue-100 text-blue-800';
      case 'previous-work': return 'bg-green-100 text-green-800';
      case 'reference-material': return 'bg-purple-100 text-purple-800';
      case 'character-profile': return 'bg-yellow-100 text-yellow-800';
      case 'world-building': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-blue-500" />
              <div>
                <h1 className="text-xl font-bold gradient-text">PagePerfect AI</h1>
                <p className="text-sm text-gray-600">Interactive Demo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={resetDemo}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
              >
                Reset Demo
              </button>
              <a
                href="/"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Upload Step */}
          {currentStep === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                  Upload Your Book PDF
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Experience our AI-powered book auditing system. Upload a PDF and watch as we analyze your content for errors, corrections, and improvements.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Choose PDF File</h3>
                  <p className="text-gray-600 mb-6">Upload your manuscript or book PDF for analysis</p>
                  
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:opacity-90 transition cursor-pointer"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Select PDF File
                  </label>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <p>Supported formats: PDF (up to 50MB)</p>
                  <p>Your file is processed securely and never stored</p>
                </div>

                {/* Knowledge Base Indicator */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-purple-500" />
                    <div>
                      <h4 className="font-medium text-purple-900">Knowledge Base Active</h4>
                      <p className="text-sm text-purple-700">
                        Analysis will be enhanced using your {knowledgeBaseItems.length} reference materials
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {knowledgeBaseItems.slice(0, 3).map((item) => (
                      <span key={item.id} className="px-2 py-1 bg-white rounded-full text-xs text-purple-700 border border-purple-200">
                        {item.name}
                      </span>
                    ))}
                    {knowledgeBaseItems.length > 3 && (
                      <span className="px-2 py-1 bg-white rounded-full text-xs text-purple-700 border border-purple-200">
                        +{knowledgeBaseItems.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6 text-blue-500" />
                  </div>
                  <h4 className="font-semibold mb-2">1. Upload</h4>
                  <p className="text-sm text-gray-600">Upload your PDF manuscript</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-purple-500" />
                  </div>
                  <h4 className="font-semibold mb-2">2. Analyze</h4>
                  <p className="text-sm text-gray-600">AI processes your content</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <h4 className="font-semibold mb-2">3. Results</h4>
                  <p className="text-sm text-gray-600">Get detailed analysis report</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Analyzing Step */}
          {currentStep === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                  Analyzing Your Book
                </h2>
                <p className="text-lg text-gray-600">
                  Our AI is processing your content with advanced algorithms
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{Math.round(analysisProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-8 h-8 text-blue-500" />
                  </motion.div>
                  <span className="text-lg font-medium text-gray-700">{currentTask}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-700">Grammar Check</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <Target className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-700">Style Analysis</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-700">Consistency</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-700">AI Suggestions</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Step */}
          {currentStep === 'results' && analysisResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative"
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                  Comprehensive Analysis Complete!
                </h2>
                <p className="text-lg text-gray-600">
                  Your novel has been thoroughly analyzed. Here's your detailed report.
                </p>
              </div>

              {/* Enhanced Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                  <div className="text-2xl font-bold text-blue-500 mb-1">{analysisResult.summary.totalPages}</div>
                  <div className="text-sm text-gray-600">Pages Analyzed</div>
                  <div className="text-xs text-gray-500 mt-1">{analysisResult.summary.genreClassification}</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                  <div className="text-2xl font-bold text-red-500 mb-1">{analysisResult.summary.errorsFound}</div>
                  <div className="text-sm text-gray-600">Issues Found</div>
                  <div className="text-xs text-gray-500 mt-1">Across {analysisResult.summary.totalPages} pages</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                  <div className="text-2xl font-bold text-green-500 mb-1">{analysisResult.summary.correctionsMade}</div>
                  <div className="text-sm text-gray-600">Auto-Corrected</div>
                  <div className="text-xs text-gray-500 mt-1">Grammar & spelling</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                  <div className="text-2xl font-bold text-purple-500 mb-1">{analysisResult.summary.readabilityScore}</div>
                  <div className="text-sm text-gray-600">Readability Score</div>
                  <div className="text-xs text-gray-500 mt-1">{analysisResult.summary.overallRating} quality</div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="bg-white rounded-xl shadow-lg mb-8">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
                      { id: 'errors', label: 'Issues & Fixes', icon: <AlertCircle className="w-4 h-4" /> },
                      { id: 'characters', label: 'Character Analysis', icon: <Users className="w-4 h-4" /> },
                      { id: 'plot', label: 'Plot & Structure', icon: <Zap className="w-4 h-4" /> },
                      { id: 'style', label: 'Style & Voice', icon: <Target className="w-4 h-4" /> },
                      { id: 'knowledge', label: 'Knowledge Base', icon: <Database className="w-4 h-4" /> }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-blue-900 mb-3">Quick Summary</h3>
                          <div className="space-y-2 text-sm">
                            <p><strong>Genre:</strong> {analysisResult.summary.genreClassification}</p>
                            <p><strong>Overall Rating:</strong> {analysisResult.summary.overallRating}</p>
                            <p><strong>Readability:</strong> {analysisResult.summary.readabilityScore}/100</p>
                            <p><strong>Processing Time:</strong> {analysisResult.summary.processingTime}</p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-green-900 mb-3">Key Strengths</h3>
                          <ul className="space-y-1 text-sm text-green-800">
                            <li>• Strong narrative voice</li>
                            <li>• Well-developed characters</li>
                            <li>• Good plot structure</li>
                            <li>• Engaging dialogue</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-yellow-900 mb-3">Areas for Improvement</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
                          <div>
                            <p className="font-medium mb-2">Character Development:</p>
                            <ul className="space-y-1">
                              <li>• Consistency in character descriptions</li>
                              <li>• Dialogue refinement for some characters</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium mb-2">Plot & Structure:</p>
                            <ul className="space-y-1">
                              <li>• Strengthen foreshadowing</li>
                              <li>• Better integration of subplots</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Errors Tab */}
                  {activeTab === 'errors' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Issues Found */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                              Issues Found
                    </h3>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {analysisResult.errors.length} issues
                    </span>
                  </div>
                          <div className="space-y-3">
                    {analysisResult.errors.map((error) => (
                              <div key={error.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(error.type)}
                            <span className="font-medium text-gray-900 capitalize">{error.type}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(error.severity)}`}>
                              {error.severity}
                            </span>
                          </div>
                                  <span className="text-sm text-gray-500">Page {error.page}</span>
                        </div>
                        <div className="bg-gray-50 rounded p-3 mb-2">
                          <p className="text-sm text-gray-700 font-mono">{error.text}</p>
                        </div>
                                <div className="text-sm text-gray-600 mb-2">
                          <strong>Suggestion:</strong> {error.suggestion}
                        </div>
                                {error.detailedExplanation && (
                                  <button
                                    onClick={() => toggleSection(`error-${error.id}`)}
                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                  >
                                    {expandedSections.has(`error-${error.id}`) ? 'Hide' : 'Show'} detailed explanation
                                    <span className="ml-1">{expandedSections.has(`error-${error.id}`) ? '▲' : '▼'}</span>
                                  </button>
                                )}
                                {expandedSections.has(`error-${error.id}`) && error.detailedExplanation && (
                                  <div className="mt-2 p-3 bg-blue-50 rounded text-sm text-blue-800">
                                    {error.detailedExplanation}
                                    {error.knowledgeBaseReference && (
                                      <div className="mt-2 p-2 bg-blue-100 rounded border-l-4 border-blue-400">
                                        <div className="flex items-center text-xs text-blue-700">
                                          <Link className="w-3 h-3 mr-1" />
                                          <strong>Knowledge Base Reference:</strong> {error.knowledgeBaseReference}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                        <div className="text-xs text-gray-500 mt-1">
                                  Confidence: {error.confidence}% • Category: {error.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                        {/* Auto Corrections */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                              Auto Corrections
                            </h3>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {analysisResult.corrections.length} applied
                            </span>
                          </div>
                          <div className="space-y-3">
                            {analysisResult.corrections.map((correction) => (
                              <div key={correction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="font-medium text-gray-900">Page {correction.page}</span>
                                  <span className="text-sm text-gray-500">{correction.category}</span>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <div className="text-sm text-gray-600 mb-1">Original:</div>
                                    <div className="bg-red-50 border border-red-200 rounded p-2">
                                      <span className="text-red-700 line-through">{correction.original}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-600 mb-1">Corrected:</div>
                                    <div className="bg-green-50 border border-green-200 rounded p-2">
                                      <span className="text-green-700 font-medium">{correction.corrected}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600 mt-2">
                                  <strong>Reason:</strong> {correction.reason}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {correction.autoApplied ? '✓ Automatically applied' : 'Manual review required'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* AI Suggestions */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                            AI Enhancement Suggestions
                    </h3>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {analysisResult.suggestions.length} suggestions
                    </span>
                  </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysisResult.suggestions.map((suggestion) => (
                            <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-medium text-gray-900 capitalize">{suggestion.type}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    suggestion.impact === 'critical' ? 'bg-red-100 text-red-800' :
                              suggestion.impact === 'high' ? 'bg-red-100 text-red-800' :
                              suggestion.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {suggestion.impact} impact
                            </span>
                            <span className="text-sm text-gray-500">Page {suggestion.page}</span>
                          </div>
                        </div>
                              <p className="text-sm text-gray-700 mb-2">{suggestion.content}</p>
                              {suggestion.detailedAnalysis && (
                                <button
                                  onClick={() => toggleSection(`suggestion-${suggestion.id}`)}
                                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center mb-2"
                                >
                                  {expandedSections.has(`suggestion-${suggestion.id}`) ? 'Hide' : 'Show'} detailed analysis
                                  <span className="ml-1">{expandedSections.has(`suggestion-${suggestion.id}`) ? '▲' : '▼'}</span>
                                </button>
                              )}
                              {expandedSections.has(`suggestion-${suggestion.id}`) && suggestion.detailedAnalysis && (
                                <div className="mt-2 p-3 bg-blue-50 rounded text-sm text-blue-800">
                                  <p className="mb-2">{suggestion.detailedAnalysis}</p>
                                  {suggestion.examples && (
                                    <div>
                                      <p className="font-medium mb-1">Examples:</p>
                                      <ul className="list-disc list-inside space-y-1">
                                        {suggestion.examples.map((example, idx) => (
                                          <li key={idx}>{example}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="text-xs text-gray-500">
                                Category: {suggestion.category}
                              </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
                  )}

                  {/* Characters Tab */}
                  {activeTab === 'characters' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Character Analysis</h3>
                      <div className="space-y-4">
                        {analysisResult.characterAnalysis.map((character, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-semibold text-gray-900">{character.name}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Consistency Score:</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  character.consistency >= 90 ? 'bg-green-100 text-green-800' :
                                  character.consistency >= 80 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {character.consistency}%
                  </span>
                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h5 className="font-medium text-gray-900 mb-2">Development</h5>
                                <p className="text-sm text-gray-700 mb-4">{character.development}</p>
                                
                                <h5 className="font-medium text-gray-900 mb-2">Strengths</h5>
                                <ul className="text-sm text-green-700 space-y-1">
                                  {character.strengths.map((strength, idx) => (
                                    <li key={idx}>• {strength}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h5 className="font-medium text-gray-900 mb-2">Issues</h5>
                                <ul className="text-sm text-red-700 space-y-1 mb-4">
                                  {character.issues.map((issue, idx) => (
                                    <li key={idx}>• {issue}</li>
                                  ))}
                                </ul>
                                
                                <h5 className="font-medium text-gray-900 mb-2">Suggestions</h5>
                                <ul className="text-sm text-blue-700 space-y-1">
                                  {character.suggestions.map((suggestion, idx) => (
                                    <li key={idx}>• {suggestion}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Plot Tab */}
                  {activeTab === 'plot' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Plot & Structure Analysis</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Structure</h4>
                            <p className="text-sm text-blue-800">{analysisResult.plotAnalysis.structure}</p>
                      </div>
                          
                          <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="font-semibold text-green-900 mb-2">Pacing</h4>
                            <p className="text-sm text-green-800">{analysisResult.plotAnalysis.pacing}</p>
                          </div>
                          
                          <div className="bg-purple-50 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-900 mb-2">Resolution</h4>
                            <p className="text-sm text-purple-800">{analysisResult.plotAnalysis.resolution}</p>
                        </div>
                          </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Conflicts</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {analysisResult.plotAnalysis.conflicts.map((conflict, idx) => (
                                <li key={idx}>• {conflict}</li>
                              ))}
                            </ul>
                        </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Issues</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                              {analysisResult.plotAnalysis.issues.map((issue, idx) => (
                                <li key={idx}>• {issue}</li>
                              ))}
                            </ul>
                      </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Suggestions</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              {analysisResult.plotAnalysis.suggestions.map((suggestion, idx) => (
                                <li key={idx}>• {suggestion}</li>
                              ))}
                            </ul>
                    </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Style Tab */}
                  {activeTab === 'style' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Style & Voice Analysis</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Narrative Voice</h4>
                            <p className="text-sm text-blue-800">{analysisResult.styleAnalysis.voice}</p>
                          </div>
                          
                          <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="font-semibold text-green-900 mb-2">Tone</h4>
                            <p className="text-sm text-green-800">{analysisResult.styleAnalysis.tone}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Consistency Score:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              analysisResult.styleAnalysis.consistency >= 90 ? 'bg-green-100 text-green-800' :
                              analysisResult.styleAnalysis.consistency >= 80 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {analysisResult.styleAnalysis.consistency}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Strengths</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              {analysisResult.styleAnalysis.strengths.map((strength, idx) => (
                                <li key={idx}>• {strength}</li>
                              ))}
                            </ul>
                </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Issues</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                              {analysisResult.styleAnalysis.issues.map((issue, idx) => (
                                <li key={idx}>• {issue}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              {analysisResult.styleAnalysis.recommendations.map((rec, idx) => (
                                <li key={idx}>• {rec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Knowledge Base Tab */}
                  {activeTab === 'knowledge' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <Database className="w-5 h-5 text-purple-500 mr-2" />
                          Knowledge Base Management
                  </h3>
                        <button
                          onClick={() => setShowKnowledgeBase(!showKnowledgeBase)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition flex items-center"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Reference Material
                        </button>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                        <h4 className="font-semibold text-purple-900 mb-3">Knowledge Base Overview</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="bg-white rounded-lg p-4">
                            <div className="text-2xl font-bold text-purple-600 mb-1">{knowledgeBaseItems.length}</div>
                            <div className="text-gray-600">Reference Materials</div>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                              {Math.round(knowledgeBaseItems.reduce((acc, item) => acc + item.relevanceScore, 0) / knowledgeBaseItems.length)}%
                            </div>
                            <div className="text-gray-600">Avg. Relevance Score</div>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              {knowledgeBaseItems.filter(item => item.relevanceScore >= 90).length}
                            </div>
                            <div className="text-gray-600">High Relevance Items</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {knowledgeBaseItems.map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                {getKnowledgeBaseTypeIcon(item.type)}
                                <div>
                                  <h5 className="font-semibold text-gray-900">{item.name}</h5>
                                  <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                                  {item.type.replace('-', ' ')}
                  </span>
                                <button
                                  onClick={() => removeKnowledgeBaseItem(item.id)}
                                  className="p-1 text-red-500 hover:text-red-700 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <div className="text-sm text-gray-600 mb-1">Relevance Score</div>
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        item.relevanceScore >= 90 ? 'bg-green-500' :
                                        item.relevanceScore >= 80 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                      }`}
                                      style={{ width: `${item.relevanceScore}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">{item.relevanceScore}%</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600 mb-1">File Size</div>
                                <div className="text-sm font-medium text-gray-900">{item.fileSize}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600 mb-1">Upload Date</div>
                                <div className="text-sm font-medium text-gray-900">{item.uploadDate}</div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-600 mb-2">Tags</div>
                              <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add New Reference Material Modal */}
                      {showKnowledgeBase && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                          <motion.div 
                            className="bg-white rounded-2xl p-6 max-w-2xl w-full relative shadow-2xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                          >
                            <button 
                              onClick={() => setShowKnowledgeBase(false)}
                              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                            >
                              <X className="w-6 h-6" />
                            </button>
                            
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Add Reference Material</h3>
                            
                <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Material Name</label>
                                <input
                                  type="text"
                                  placeholder="e.g., My Style Guide, Character Profiles"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                      </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                                  <option value="style-guide">Style Guide</option>
                                  <option value="previous-work">Previous Work</option>
                                  <option value="reference-material">Reference Material</option>
                                  <option value="character-profile">Character Profile</option>
                                  <option value="world-building">World Building</option>
                                </select>
                          </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                  rows={3}
                                  placeholder="Describe what this material contains and how it should be used..."
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                                />
                        </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                  <p className="text-xs text-gray-500 mt-1">PDF, DOCX, TXT files supported</p>
                          </div>
                        </div>
                              
                              <div className="flex justify-end space-x-3">
                                <button
                                  onClick={() => setShowKnowledgeBase(false)}
                                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                                >
                                  Cancel
                                </button>
                                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition">
                                  Add to Knowledge Base
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* AI Chat Section */}
              <div className="bg-white rounded-xl shadow-lg mb-8">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Brain className="w-5 h-5 text-purple-500 mr-2" />
                      AI Writing Assistant
                    </h3>
                    <button
                      onClick={() => setShowChat(!showChat)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition"
                    >
                      {showChat ? 'Hide Chat' : 'Ask AI Questions'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Get personalized advice on improving your manuscript. Ask about characters, plot, style, or any writing concerns.
                  </p>
                </div>
                
                {showChat && (
                  <div className="p-6">
                    <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-500">
                          <Brain className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>Start a conversation with your AI writing assistant!</p>
                          <p className="text-sm mt-1">Try asking about characters, plot, or style improvements.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {chatMessages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                  message.type === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white border border-gray-200 text-gray-900'
                                }`}
                              >
                                <p className="text-sm">{message.message}</p>
                                <p className={`text-xs mt-1 ${
                                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {message.timestamp.toLocaleTimeString()}
                                </p>
                      </div>
                    </div>
                  ))}
                </div>
                      )}
                    </div>
                    
                    <form onSubmit={handleChatSubmit} className="flex space-x-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about your manuscript..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:opacity-90 transition flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Report
                </button>
                <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition flex items-center justify-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Export to Word
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-semibold hover:opacity-90 transition flex items-center justify-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Get AI Rewrite
                </button>
                <button
                  onClick={resetDemo}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition"
                >
                  Try Another File
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Processing time: {analysisResult.summary.processingTime}</p>
                <p>This is a comprehensive demo simulation. In production, results may vary based on document complexity.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

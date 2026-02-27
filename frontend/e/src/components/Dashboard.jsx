import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const navigate = useNavigate();
  const [marketPrice, setMarketPrice] = useState(57420.45);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userXP, setUserXP] = useState(2450);
  const [chatMessage, setChatMessage] = useState("");
  const [aiResponse, setAiResponse] = useState(
    "Portfolio risk: Moderate. Tech sector showing volatility.",
  );
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [learningModules, setLearningModules] = useState([
    {
      id: 1,
      name: "Market Basics",
      status: "completed",
      xp: 100,
      progress: 100,
    },
    {
      id: 2,
      name: "Technical Analysis",
      status: "completed",
      xp: 150,
      progress: 100,
    },
    {
      id: 3,
      name: "Risk Management",
      status: "current",
      xp: 200,
      progress: 62,
    },
    { id: 4, name: "Portfolio Theory", status: "locked", xp: 250, progress: 0 },
  ]);
  const [portfolio, setPortfolio] = useState({
    stocks: 45,
    crypto: 25,
    cash: 30,
    riskLevel: "Moderate",
    volatility: 63,
  });

  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const chartRef = useRef(null);
  const progressRef = useRef(null);
  const newsPathRef = useRef(null);
  const newsChartRef = useRef(null);
  const aiAssistantRef = useRef(null);
  const cardsRef = useRef([]);

  // News data
  const newsData = [
    {
      id: 1,
      title: "Fed Signals Rate Cut",
      sentiment: "positive",
      impact: "High",
      time: "2m ago",
      description:
        "Federal Reserve signals potential rate cut in September, boosting market sentiment.",
      correlation: 92,
      priceImpact: "+2.4%",
    },
    {
      id: 2,
      title: "Tech Earnings Beat Estimates",
      sentiment: "positive",
      impact: "Medium",
      time: "15m ago",
      description:
        "Major tech companies report better-than-expected Q2 earnings.",
      correlation: 85,
      priceImpact: "+1.8%",
    },
    {
      id: 3,
      title: "Regulatory Concerns Rise",
      sentiment: "negative",
      impact: "High",
      time: "1h ago",
      description:
        "New regulatory framework proposed for cryptocurrency markets.",
      correlation: 78,
      priceImpact: "-3.2%",
    },
    {
      id: 4,
      title: "Oil Prices Stabilize",
      sentiment: "neutral",
      impact: "Low",
      time: "2h ago",
      description: "Oil prices stabilize after weeks of volatility.",
      correlation: 45,
      priceImpact: "+0.3%",
    },
  ];

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    const ctx = gsap.context(() => {
      // Entrance Animations with Stagger
      gsap.from(".stat-card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Circular Progress Animation
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          strokeDashoffset: 138,
          duration: 2,
          ease: "power2.inOut",
          delay: 0.5,
        });
      }

      // Chart Animation
      if (chartRef.current) {
        gsap.from(".candle", {
          scaleY: 0,
          transformOrigin: "bottom",
          stagger: 0.03,
          duration: 1,
          ease: "back.out(1.2)",
        });
      }

      // News Feed Entrance
      gsap.from(".news-item", {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.8,
      });

      // ScrollTrigger Animations
      gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, containerRef);

    // Auto-update market price
    const interval = setInterval(() => {
      setMarketPrice((prev) => {
        const change = Math.random() * 10 - 5;
        return prev + change;
      });
    }, 3000);

    return () => {
      ctx.revert();
      scroll.destroy();
      clearInterval(interval);
    };
  }, []);

  // Quiz popup handler with animation
  const handleLessonComplete = () => {
    setShowQuiz(true);
    gsap.from(".quiz-popup", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  };

  // XP gain handler with animation
  const handleCorrectAnswer = () => {
    setUserXP((prev) => prev + 100);
    setShowQuiz(false);

    // XP Flash Animation
    gsap
      .timeline()
      .to(".xp-flash", {
        scale: 1.2,
        color: "#10B981",
        duration: 0.2,
        ease: "power2.out",
      })
      .to(".xp-flash", {
        scale: 1,
        color: "#FFFFFF",
        duration: 0.3,
        ease: "elastic.out(1, 0.3)",
      });

    // Update learning progress
    setLearningModules((prev) =>
      prev.map((module) =>
        module.status === "current"
          ? { ...module, status: "completed", progress: 100 }
          : module,
      ),
    );
  };

  // AI Chat handler with enhanced response
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Animate button
      gsap.to(".chat-submit", {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });

      // Simulate AI thinking
      setAiResponse("🤔 Analyzing...");

      setTimeout(() => {
        const responses = [
          "Based on current market conditions, I recommend diversifying into defensive sectors like healthcare and utilities.",
          "Your portfolio risk is moderate. Consider reducing crypto exposure by 5% to optimize returns.",
          "Tech sector showing volatility. Set stop-loss at 5% below current levels.",
          "Great question! Check out our learning module on Risk Management for detailed insights.",
        ];
        setAiResponse(responses[Math.floor(Math.random() * responses.length)]);

        // Animate response
        gsap.from(".ai-response", {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
        });
      }, 1500);

      setChatMessage("");
    }
  };

  // Navigation handlers
  const handleNavigate = (path) => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      onComplete: () => navigate(path),
    });
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news);

    // Animate path in visualizer
    if (newsPathRef.current) {
      const paths = {
        positive: "M0,80 L100,60 L200,40 L300,20 L400,10",
        negative: "M0,20 L100,40 L200,60 L300,80 L400,95",
        neutral: "M0,50 L100,45 L200,55 L300,48 L400,52",
      };

      gsap.to(newsPathRef.current, {
        attr: { d: paths[news.sentiment] },
        duration: 0.8,
        ease: "power2.inOut",
      });
    }

    // Animate news chart bars
    if (newsChartRef.current) {
      gsap.fromTo(
        newsChartRef.current.children,
        { scaleY: 0.2, transformOrigin: "bottom" },
        {
          scaleY: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.2)",
          backgroundColor:
            news.sentiment === "positive"
              ? "#10B981"
              : news.sentiment === "negative"
                ? "#EF4444"
                : "#F59E0B",
        },
      );
    }

    // Pulse effect on impact dot
    gsap.fromTo(
      ".impact-flash",
      { scale: 0.8, opacity: 0.5 },
      {
        scale: 1.5,
        opacity: 1,
        duration: 0.6,
        yoyo: true,
        repeat: 2,
        ease: "power2.inOut",
      },
    );
  };

  const handlePrediction = (type) => {
    setSelectedPrediction(type);

    // Animate prediction buttons
    gsap.to(`.${type}-btn`, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });

    // Show result
    setTimeout(() => {
      gsap.from(".outcome-explainer", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "back.out(1.2)",
      });
    }, 500);
  };

  const handleOptimizeAllocation = () => {
    // Animate portfolio changes
    gsap
      .timeline()
      .to(".asset-bar", {
        width: (i) => {
          const newValues = [40, 20, 40];
          return `${newValues[i]}%`;
        },
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(
        ".risk-level",
        {
          textContent: "Low",
          duration: 1,
          ease: "power1.in",
          snap: { textContent: 1 },
        },
        0,
      );

    setPortfolio((prev) => ({
      stocks: 40,
      crypto: 20,
      cash: 40,
      riskLevel: "Low",
      volatility: 45,
    }));
  };

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="bg-white min-h-screen text-slate-900 font-sans selection:bg-indigo-100 overflow-x-hidden"
    >
      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setShowAIAssistant(true)}
        className="fixed bottom-24 right-8 z-50 w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-all cursor-pointer group"
      >
        🤖
        <span className="absolute -top-12 right-0 bg-slate-900 text-white text-xs px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant
        </span>
      </button>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
          <div
            ref={aiAssistantRef}
            className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
          >
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🤖</span>
                <div>
                  <h3 className="text-xl font-black">Neural AI Assistant</h3>
                  <p className="text-xs opacity-80">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIAssistant(false)}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none">
                    <p className="text-sm">
                      Hi! I'm your AI financial advisor. How can I help you
                      today?
                    </p>
                    <span className="text-[8px] text-slate-500 mt-1 block">
                      Just now
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    👤
                  </div>
                  <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none ml-auto">
                    <p className="text-sm">
                      {chatMessage || "Show me my portfolio insights"}
                    </p>
                    <span className="text-[8px] text-white/60 mt-1 block">
                      Now
                    </span>
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-2xl">
                  <p className="text-sm font-medium text-indigo-900">
                    {aiResponse}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Portfolio Analysis",
                    "Risk Assessment",
                    "Learning Path",
                    "Market News",
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setChatMessage(suggestion)}
                      className="p-3 bg-slate-50 rounded-xl text-xs font-black hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-full focus:border-indigo-600 outline-none text-sm"
                />
                <button
                  type="submit"
                  className="chat-submit w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section
        ref={containerRef}
        className="pt-10 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto"
        data-scroll-section
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div data-scroll data-scroll-speed="0.5">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-[#4F46E5] rounded-full"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F46E5]">
                Mainframe Terminal
              </span>
            </div>
            <h2 className="text-6xl font-black tracking-tighter text-slate-900 mb-2">
              Neural <span className="italic text-[#4F46E5]">Wealth OS</span>
            </h2>
            <p className="text-slate-600 font-bold text-xs uppercase tracking-widest">
              Live Sync:{" "}
              <span className="text-green-600 animate-pulse">
                ● Web3 Active
              </span>
            </p>
          </div>

          {/* User Profile Card */}
          <div
            onClick={() => handleNavigate("/profile")}
            className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-6 py-3 rounded-[2rem] shadow-sm hover:border-indigo-600 transition-all cursor-pointer"
          >
            <div className="text-right leading-none">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">
                Level 04
              </p>
              <p className="text-[11px] font-black text-green-600 uppercase italic flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                Web3 Wallet
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-indigo-600 rounded-full flex items-center justify-center font-black text-white shadow-lg cursor-pointer hover:scale-110 transition-all">
              JD
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {/* Learning Snapshot */}
          <div className="stat-card bg-white border border-slate-200 p-8 rounded-[3rem] flex flex-col items-center cursor-pointer hover:border-indigo-600 transition-all">
            <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-4">
              Learning Progress
            </p>
            <div className="relative w-24 h-24 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#E2E8F0"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  ref={progressRef}
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#4F46E5"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset="264"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-[#4F46E5]">
                62%
              </span>
            </div>
            <p className="text-xs font-bold text-slate-600">
              Module 3/7 Complete
            </p>
          </div>

          {/* Prediction Performance */}
          <div className="stat-card bg-white border border-slate-200 p-8 rounded-[3rem] flex flex-col items-center cursor-pointer hover:border-indigo-600 transition-all">
            <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-4">
              Prediction Accuracy
            </p>
            <div className="text-5xl font-black text-[#4F46E5] mb-2">78%</div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#4F46E5] h-full rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
            <p className="text-xs font-bold text-slate-600 mt-4">
              Top 15% of Traders
            </p>
          </div>

          {/* XP Counter */}
          <div className="stat-card bg-gradient-to-br from-[#4F46E5] to-indigo-600 p-8 rounded-[3rem] text-white flex flex-col items-center cursor-pointer hover:scale-105 transition-all">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-white/80">
              Experience Points
            </p>
            <div className="text-4xl font-black mb-2 xp-flash">{userXP} XP</div>
            <p className="text-xs font-bold text-white/80">+100 this week</p>
          </div>

          {/* Quick Advisor */}
          <div className="stat-card bg-slate-50 border border-slate-200 p-8 rounded-[3rem] flex flex-col">
            <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-4">
              AI Quick Advisor
            </p>
            <p className="ai-response text-sm font-bold text-slate-800 mb-4">
              {aiResponse}
            </p>
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask AI..."
                className="flex-1 bg-white border-2 border-slate-200 rounded-full px-4 py-2 text-sm focus:border-[#4F46E5] outline-none"
              />
              <button
                type="submit"
                className="chat-submit w-10 h-10 bg-[#4F46E5] text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all cursor-pointer"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Learning Module */}
        <div className="mb-32">
          <div className="flex items-center gap-3 mb-12 section-title">
            <span className="h-[2px] w-12 bg-[#4F46E5] rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F46E5]">
              Learning Module
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Growth Path */}
            <div className="bg-white border border-slate-200 p-8 rounded-[3rem] md:col-span-1">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="text-2xl">🗺️</span> Growth Path
              </h3>
              <div className="space-y-4">
                {learningModules.map((module, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      module.status !== "locked" && handleNavigate("/learning")
                    }
                    className={`flex items-center gap-3 ${
                      module.status !== "locked"
                        ? "cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black
                      ${
                        module.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : module.status === "current"
                            ? "bg-[#4F46E5] text-white"
                            : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {module.status === "completed" ? "✓" : i + 1}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-bold text-sm ${module.status === "locked" ? "text-slate-400" : "text-slate-900"}`}
                      >
                        {module.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] text-slate-400">
                          {module.xp} XP
                        </p>
                        {module.status === "current" && (
                          <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#4F46E5]"
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Viewer */}
            <div className="bg-[#4F46E5] p-8 rounded-[3rem] text-white md:col-span-1 cursor-pointer hover:scale-[1.02] transition-all">
              <div className="h-full flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-4">
                  Current Lesson
                </span>
                <h4 className="text-2xl font-black mb-3">
                  Risk Management Fundamentals
                </h4>
                <p className="text-sm text-white/80 mb-6">
                  Learn how institutional traders protect their capital...
                </p>
                <div className="mt-auto">
                  <button
                    onClick={handleLessonComplete}
                    className="bg-white text-[#4F46E5] px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-opacity-90 transition-all cursor-pointer"
                  >
                    Continue Lesson →
                  </button>
                </div>
              </div>
            </div>

            {/* Assessment Preview */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-[3rem] md:col-span-1 relative cursor-pointer hover:border-indigo-600 transition-all">
              <h3 className="text-xl font-black mb-4">Market Scenario Quiz</h3>
              <p className="text-sm text-slate-600 mb-6">
                Test your knowledge with real-world scenarios
              </p>
              <div className="space-y-3">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 bg-slate-200 rounded-full w-full"
                  ></div>
                ))}
              </div>
              <button
                onClick={() => handleNavigate("/learning")}
                className="absolute bottom-8 right-8 bg-[#4F46E5] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all cursor-pointer"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Prediction Arena */}
        <div className="mb-32">
          <div className="flex items-center gap-3 mb-12 section-title">
            <span className="h-[2px] w-12 bg-[#4F46E5] rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F46E5]">
              Prediction Arena
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Live Chart */}
            <div className="bg-white border border-slate-200 p-8 rounded-[3rem] md:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black">BTC/USD Live</h3>
                <span className="text-sm font-bold text-green-600">+2.4%</span>
              </div>

              <div ref={chartRef} className="h-48 flex items-end gap-1 mb-6">
                {[
                  45, 62, 38, 55, 48, 72, 58, 43, 67, 52, 48, 63, 71, 55, 49,
                  58, 62, 45, 53, 68,
                ].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className="candle w-full bg-green-500 rounded-t-sm"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="w-0.5 h-3 bg-slate-300"></div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handlePrediction("bullish")}
                  className={`bullish-btn flex-1 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all cursor-pointer
                    ${
                      selectedPrediction === "bullish"
                        ? "bg-green-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-green-100"
                    }`}
                >
                  🐂 Bullish
                </button>
                <button
                  onClick={() => handlePrediction("bearish")}
                  className={`bearish-btn flex-1 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all cursor-pointer
                    ${
                      selectedPrediction === "bearish"
                        ? "bg-red-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-red-100"
                    }`}
                >
                  🐻 Bearish
                </button>
              </div>
            </div>

            {/* AI vs Human */}
            <div className="bg-slate-900 p-8 rounded-[3rem] text-white">
              <h3 className="text-xl font-black mb-6">AI vs Human</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-xs text-slate-400 mb-2">
                    Platform AI (ML)
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#4F46E5] rounded-full flex items-center justify-center">
                      🤖
                    </div>
                    <div>
                      <p className="font-bold">Bearish (72% confidence)</p>
                      <p className="text-xs text-slate-400">
                        Based on RSI divergence
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-2">Your Prediction</p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <p className="font-bold">
                        {selectedPrediction
                          ? selectedPrediction === "bullish"
                            ? "Bullish"
                            : "Bearish"
                          : "No prediction yet"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="outcome-explainer mt-6 p-4 bg-slate-800 rounded-2xl">
                <p className="text-xs font-bold text-[#4F46E5] mb-2">
                  OUTCOME EXPLAINER
                </p>
                <p className="text-sm text-slate-300">
                  Market moved up 2.4% due to positive jobs report. Your bullish
                  prediction was correct!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* News Intelligence */}
        <div className="mb-32">
          <div className="flex items-center gap-3 mb-12 section-title">
            <span className="h-[2px] w-12 bg-[#4F46E5] rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F46E5]">
              News Intelligence
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sentiment Feed */}
            <div className="space-y-4">
              {newsData.map((news, i) => (
                <div
                  key={i}
                  onClick={() => handleNewsClick(news)}
                  className={`news-item bg-white border-2 p-6 rounded-[2rem] flex items-center justify-between group cursor-pointer transition-all
                    ${
                      selectedNews?.id === news.id
                        ? "border-indigo-600 shadow-xl"
                        : "border-slate-200 hover:border-indigo-300"
                    }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-[10px] font-black uppercase px-3 py-1 rounded-full
                        ${
                          news.sentiment === "positive"
                            ? "bg-green-100 text-green-700"
                            : news.sentiment === "negative"
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {news.sentiment}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {news.time}
                      </span>
                    </div>
                    <h4 className="font-black text-sm mb-1">{news.title}</h4>
                    <p className="text-[10px] text-slate-500">
                      Impact: {news.impact} • Correlation: {news.correlation}%
                    </p>
                  </div>
                  <div
                    className={`w-1 h-12 rounded-full transition-all ${
                      selectedNews?.id === news.id
                        ? "bg-[#4F46E5]"
                        : "bg-transparent"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Impact Visualizer with Animation */}
            <div className="bg-[#4F46E5] p-8 rounded-[3rem] text-white">
              <h3 className="text-xl font-black mb-4">
                News Impact Visualizer
              </h3>
              <div className="h-48 relative mb-6">
                <svg className="w-full h-full" viewBox="0 0 400 100">
                  <path
                    ref={newsPathRef}
                    d="M0,50 L100,45 L200,55 L300,48 L400,52"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle
                    className="impact-flash fill-white"
                    cx="200"
                    cy="48"
                    r="6"
                  />
                </svg>

                {/* Animated bars based on sentiment */}
                <div
                  ref={newsChartRef}
                  className="absolute bottom-0 left-0 right-0 flex items-end gap-1 h-20 px-4"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-white/30 rounded-t"
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        transformOrigin: "bottom",
                      }}
                    ></div>
                  ))}
                </div>

                {selectedNews && (
                  <div className="absolute top-4 right-4 text-right">
                    <p className="text-sm font-black">
                      {selectedNews.priceImpact}
                    </p>
                    <p className="text-[10px] opacity-80">Price Impact</p>
                  </div>
                )}
              </div>
              <p className="text-sm opacity-90">
                {selectedNews
                  ? selectedNews.description
                  : "Click on any news item to see impact visualization"}
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Analyzer */}
        <div className="mb-32">
          <div className="flex items-center gap-3 mb-12 section-title">
            <span className="h-[2px] w-12 bg-[#4F46E5] rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F46E5]">
              Portfolio Analyzer
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Allocation Pie */}
            <div className="bg-white border border-slate-200 p-8 rounded-[3rem]">
              <h3 className="text-xl font-black mb-6">Asset Allocation</h3>
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="20"
                    strokeDasharray="251.2"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="20"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="20"
                    strokeDasharray="251.2"
                    strokeDashoffset="125.6"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#4F46E5] rounded-full"></span>
                    Stocks
                  </span>
                  <span
                    className="font-bold asset-bar"
                    style={{ width: "auto" }}
                  >
                    {portfolio.stocks}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#10B981] rounded-full"></span>
                    Crypto
                  </span>
                  <span
                    className="font-bold asset-bar"
                    style={{ width: "auto" }}
                  >
                    {portfolio.crypto}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#F59E0B] rounded-full"></span>
                    Cash
                  </span>
                  <span
                    className="font-bold asset-bar"
                    style={{ width: "auto" }}
                  >
                    {portfolio.cash}%
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Exposure Meter */}
            <div className="bg-white border border-slate-200 p-8 rounded-[3rem]">
              <h3 className="text-xl font-black mb-6">Risk Exposure</h3>
              <div className="relative h-4 bg-slate-100 rounded-full mb-4 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-2/3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
                <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-white border-2 border-slate-900 rounded-full transform -translate-y-1/2"></div>
              </div>
              <p className="risk-level text-center font-bold text-lg mb-2">
                {portfolio.riskLevel} Risk
              </p>
              <p className="text-xs text-slate-400 text-center">
                {portfolio.volatility}% volatility exposure
              </p>

              <button
                onClick={handleOptimizeAllocation}
                className="w-full mt-6 bg-[#4F46E5] text-white py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all cursor-pointer"
              >
                Optimize Allocation →
              </button>
            </div>

            {/* AI Strategy Advisor */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[3rem] text-white cursor-pointer hover:scale-[1.02] transition-all">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <span>🤖</span> Strategy Advisor
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                "I noticed your tech stocks are underperforming. Want to review
                your allocation?"
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAIAssistant(true)}
                  className="flex-1 bg-[#4F46E5] text-white py-2 rounded-full text-xs font-black hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  Review Now
                </button>
                <button className="flex-1 bg-white/10 text-white py-2 rounded-full text-xs font-black hover:bg-white/20 transition-all cursor-pointer">
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Popup Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="quiz-popup bg-white rounded-[3rem] p-8 max-w-md w-full">
            <h3 className="text-2xl font-black mb-4">Quick Assessment</h3>
            <p className="text-sm text-slate-600 mb-6">
              In a bear market, which strategy typically performs best?
            </p>
            <div className="space-y-3 mb-6">
              {[
                "Aggressive growth stocks",
                "Defensive sectors & bonds",
                "Leveraged ETFs",
                "High-risk derivatives",
              ].map((option, i) => (
                <button
                  key={i}
                  onClick={handleCorrectAnswer}
                  className="w-full text-left p-4 border border-slate-200 rounded-2xl hover:border-[#4F46E5] hover:bg-indigo-50 transition-all cursor-pointer"
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowQuiz(false)}
              className="w-full bg-slate-100 text-slate-600 py-3 rounded-full text-xs font-black hover:bg-slate-200 transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full px-6 py-3 shadow-2xl z-50 flex gap-4">
        {[
          { path: "/dashboard", label: "Dashboard", icon: "📊" },
          { path: "/learning", label: "Learning", icon: "📚" },
          { path: "/playground", label: "Trade", icon: "📈" },
          { path: "/advisor", label: "AI", icon: "🤖" },
          { path: "/portfolio", label: "Portfolio", icon: "💰" },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => handleNavigate(item.path)}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-full hover:bg-indigo-50 transition-all group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="text-[8px] font-black text-slate-500 group-hover:text-indigo-600">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

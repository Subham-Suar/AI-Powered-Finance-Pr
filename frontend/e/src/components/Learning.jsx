import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";

const Learning = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentXP, setCurrentXP] = useState(450);
  const [completedModules, setCompletedModules] = useState([1]);
  const [quizAnswers, setQuizAnswers] = useState({});

  // New state for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterDuration, setFilterDuration] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const locoInstance = useRef(null);
  const progressRef = useRef(null);
  const searchInputRef = useRef(null);
  const filterPanelRef = useRef(null);

  useEffect(() => {
    locoInstance.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
    });

    // Entrance animations
    const ctx = gsap.context(() => {
      gsap.from(".module-item", {
        opacity: 0,
        x: -50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".stats-card", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

      // Animate search bar
      gsap.from(".search-bar", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
        ease: "back.out(1.2)",
      });
    }, containerRef);

    return () => {
      if (locoInstance.current) locoInstance.current.destroy();
      ctx.revert();
    };
  }, []);

  // Animate filter panel
  useEffect(() => {
    if (showFilters && filterPanelRef.current) {
      gsap.fromTo(
        filterPanelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [showFilters]);

  useEffect(() => {
    if (selectedCourse) {
      if (locoInstance.current) locoInstance.current.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (locoInstance.current) locoInstance.current.start();
      document.body.style.overflow = "unset";
    }
  }, [selectedCourse]);

  // Quiz handler
  const handleQuizComplete = (isCorrect) => {
    if (isCorrect) {
      setCurrentXP((prev) => prev + 100);
      gsap.to(".xp-counter", {
        scale: 1.2,
        color: "#10B981",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    }
    setShowQuiz(false);
    setQuizAnswers({});
  };

  const courses = [
    {
      id: 1,
      title: "Market Foundations",
      videoLink: "https://www.youtube.com/watch?v=Xn7KWR9EOGQ",
      docLink: "https://www.nseindia.com/learn/introduction-to-capital-market",
      desc: "Stock market ke fundamentals aur exchange ka structure samjhein.",
      xp: 100,
      duration: "45 min",
      durationMinutes: 45,
      level: "Beginner",
      category: "Fundamentals",
      tags: ["stocks", "basics", "exchange"],
      quiz: {
        question: "What is the primary function of a stock exchange?",
        options: [
          "To print currency",
          "To facilitate buying/selling of securities",
          "To set interest rates",
          "To regulate banks",
        ],
        correct: 1,
      },
    },
    {
      id: 2,
      title: "Technical Analysis Pro",
      videoLink: "https://www.youtube.com/watch?v=9aMKXREn9bY",
      docLink: "https://www.investopedia.com/technical-analysis-4689657",
      desc: "Charts, patterns aur indicators ka depth analysis.",
      xp: 150,
      duration: "60 min",
      durationMinutes: 60,
      level: "Intermediate",
      category: "Technical Analysis",
      tags: ["charts", "patterns", "indicators"],
      quiz: {
        question: "What does RSI indicator measure?",
        options: [
          "Trading volume",
          "Price momentum",
          "Market capitalization",
          "Dividend yield",
        ],
        correct: 1,
      },
    },
    {
      id: 3,
      title: "Price Action Mastery",
      videoLink: "https://www.youtube.com/watch?v=mC9Gst_D5_I",
      docLink:
        "https://tradingstrategyguides.com/price-action-trading-strategy/",
      desc: "Market psychology aur supply-demand zones ki mastery.",
      xp: 200,
      duration: "75 min",
      durationMinutes: 75,
      level: "Advanced",
      category: "Price Action",
      tags: ["psychology", "support", "resistance"],
      quiz: {
        question: "What is a 'support level' in price action?",
        options: [
          "Price ceiling where selling pressure increases",
          "Price floor where buying pressure increases",
          "Average price over 30 days",
          "Daily trading volume",
        ],
        correct: 1,
      },
    },
    {
      id: 4,
      title: "Options Greek Hub",
      videoLink: "https://www.youtube.com/watch?v=S0m9HshS34I",
      docLink:
        "https://www.optionseducation.org/referencelibrary/option-greeks",
      desc: "Options pricing aur mathematical greeks ka professional use.",
      xp: 250,
      duration: "90 min",
      durationMinutes: 90,
      level: "Advanced",
      category: "Options",
      tags: ["derivatives", "greeks", "pricing"],
      quiz: {
        question: "What does 'Delta' measure in options trading?",
        options: [
          "Time decay",
          "Price sensitivity to underlying asset",
          "Volatility change",
          "Interest rate impact",
        ],
        correct: 1,
      },
    },
    {
      id: 5,
      title: "Algo Trading AI",
      videoLink: "https://www.youtube.com/watch?v=F0Kst0v6IqU",
      docLink:
        "https://www.quantconnect.com/docs/v2/writing-algorithms/getting-started/introduction",
      desc: "Python coding aur automated execution systems.",
      xp: 300,
      duration: "120 min",
      durationMinutes: 120,
      level: "Expert",
      category: "Algorithmic",
      tags: ["python", "automation", "coding"],
      quiz: {
        question: "What is 'backtesting' in algorithmic trading?",
        options: [
          "Testing strategy on historical data",
          "Testing with fake money",
          "Testing during market holidays",
          "Testing with paper trading",
        ],
        correct: 0,
      },
    },
    {
      id: 6,
      title: "Forex & Commodities",
      videoLink: "https://www.youtube.com/watch?v=6r0E_mG_p1k",
      docLink: "https://www.babypips.com/learn/forex/what-is-forex-trading",
      desc: "International currency pairs aur commodity cycles.",
      xp: 150,
      duration: "55 min",
      durationMinutes: 55,
      level: "Intermediate",
      category: "Forex",
      tags: ["currency", "commodities", "pairs"],
      quiz: {
        question: "What is a 'pip' in Forex trading?",
        options: [
          "Percentage in point",
          "Price increment percentage",
          "Point in price",
          "Profit in pips",
        ],
        correct: 0,
      },
    },
    {
      id: 7,
      title: "Crypto Markets",
      videoLink: "https://www.youtube.com/watch?v=1YyAzVmP9Xg",
      docLink:
        "https://academy.binance.com/en/articles/a-complete-guide-to-cryptocurrency-trading-for-beginners",
      desc: "On-chain data, DeFi aur crypto assets management.",
      xp: 200,
      duration: "80 min",
      durationMinutes: 80,
      level: "Intermediate",
      category: "Crypto",
      tags: ["blockchain", "defi", "bitcoin"],
      quiz: {
        question: "What is DeFi?",
        options: [
          "Decentralized Finance",
          "Digital Finance",
          "Derivative Finance",
          "Direct Finance",
        ],
        correct: 0,
      },
    },
    {
      id: 8,
      title: "Trading Psychology",
      videoLink: "https://www.youtube.com/watch?v=Kz69k5k6S_s",
      docLink: "https://www.investopedia.com/articles/trading/02/110502.asp",
      desc: "Mindset training aur emotional discipline for consistent profit.",
      xp: 175,
      duration: "50 min",
      durationMinutes: 50,
      level: "Beginner",
      category: "Psychology",
      tags: ["mindset", "emotions", "discipline"],
      quiz: {
        question: "What is 'FOMO' in trading?",
        options: [
          "Fear Of Missing Out",
          "Fear Of Market Orders",
          "Fear Of Moving Average",
          "Fear Of Money Out",
        ],
        correct: 0,
      },
    },
  ];

  // Filter and search logic
  const filteredCourses = courses.filter((course) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    // Level filter
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;

    // Duration filter
    const matchesDuration =
      filterDuration === "all" ||
      (filterDuration === "short"
        ? course.durationMinutes < 60
        : filterDuration === "medium"
          ? course.durationMinutes >= 60 && course.durationMinutes <= 90
          : filterDuration === "long"
            ? course.durationMinutes > 90
            : true);

    return matchesSearch && matchesLevel && matchesDuration;
  });

  // Sort logic
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "xp-high":
        return b.xp - a.xp;
      case "xp-low":
        return a.xp - b.xp;
      case "duration-short":
        return a.durationMinutes - b.durationMinutes;
      case "duration-long":
        return b.durationMinutes - a.durationMinutes;
      case "level":
        const levelOrder = {
          Beginner: 1,
          Intermediate: 2,
          Advanced: 3,
          Expert: 4,
        };
        return levelOrder[a.level] - levelOrder[b.level];
      default:
        return a.id - b.id;
    }
  });

  const ModalPortal = ({ course, onClose }) => {
    if (!course) return null;

    const handleStartQuiz = () => {
      setShowQuiz(true);
      gsap.from(".quiz-container", {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.2)",
      });
    };

    const handleMarkComplete = () => {
      if (!completedModules.includes(course.id)) {
        setCompletedModules((prev) => [...prev, course.id]);
        setCurrentXP((prev) => prev + course.xp);
      }
      onClose();
    };

    return ReactDOM.createPortal(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70">
        <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-300 flex flex-col max-h-[90vh]">
          {/* Header with gradient */}
          <div className="p-8 flex-shrink-0 bg-gradient-to-br from-[#4F46E5] to-indigo-600 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 font-bold cursor-pointer transition-all hover:scale-110 text-white"
            >
              ✕
            </button>

            {/* Level badge */}
            <span className="inline-block px-4 py-1 bg-white/30 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 text-white">
              {course.level} • {course.duration}
            </span>

            <h3 className="text-3xl font-black tracking-tighter leading-none pr-10 uppercase text-white">
              {course.title}
            </h3>
            <p className="text-sm mt-4 text-white/90 font-medium">
              {course.desc}
            </p>

            {/* XP Reward */}
            <div className="absolute bottom-0 right-0 bg-white/20 px-6 py-2 rounded-tl-2xl">
              <span className="text-xs font-black text-white">
                {course.xp} XP
              </span>
            </div>
          </div>

          <div className="p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Learning Resources Grid */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={course.videoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-red-50 rounded-2xl hover:bg-red-100 transition-all group border border-red-200"
                >
                  <span className="text-3xl">🎥</span>
                  <span className="text-xs font-black text-red-800 uppercase tracking-widest">
                    Video Lesson
                  </span>
                </a>

                <a
                  href={course.docLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-all group border border-indigo-200"
                >
                  <span className="text-3xl">📄</span>
                  <span className="text-xs font-black text-indigo-800 uppercase tracking-widest">
                    Documentation
                  </span>
                </a>
              </div>

              {/* Progress & Actions */}
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-300">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                    Module Progress
                  </span>
                  <span className="text-xs font-black text-[#4F46E5]">
                    {completedModules.includes(course.id)
                      ? "✓ Completed"
                      : "Not Started"}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleStartQuiz}
                    className="flex-1 py-4 bg-[#4F46E5] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-700 transition-all cursor-pointer"
                  >
                    Take Assessment
                  </button>

                  {!completedModules.includes(course.id) && (
                    <button
                      onClick={handleMarkComplete}
                      className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-700 transition-all cursor-pointer"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>

              {/* AI Learning Assistant */}
              <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] text-white">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#4F46E5] rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    🤖
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-2 text-white">
                      AI Learning Assistant
                    </p>
                    <p className="text-xs text-white/90">
                      "Based on your progress, I recommend mastering{" "}
                      {course.title} before moving to advanced modules. Complete
                      the assessment to earn {course.xp} XP!"
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 border-2 border-slate-300 text-slate-800 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-indigo-50 transition-all bg-white cursor-pointer"
              >
                Return to Learning Path
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );
  };

  const QuizModal = ({ course, onClose, onComplete }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = () => {
      if (selectedOption !== null) {
        const isCorrect = selectedOption === course.quiz.correct;
        onComplete(isCorrect);
      }
    };

    return ReactDOM.createPortal(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70">
        <div className="quiz-container bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-300">
          <div className="p-8 bg-gradient-to-br from-[#4F46E5] to-indigo-600 text-white">
            <h3 className="text-2xl font-black mb-2">Quick Assessment</h3>
            <p className="text-sm text-white/90">
              Test your knowledge • +{course.xp} XP
            </p>
          </div>

          <div className="p-8">
            <p className="text-lg font-bold text-slate-900 mb-6">
              {course.quiz.question}
            </p>

            <div className="space-y-3 mb-8">
              {course.quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer
                    ${
                      selectedOption === index
                        ? "border-[#4F46E5] bg-indigo-50"
                        : "border-slate-300 hover:border-slate-500 bg-white"
                    }`}
                >
                  <span className="text-sm font-medium text-slate-800">
                    {option}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-4 border-2 border-slate-300 text-slate-800 rounded-full text-xs font-black uppercase tracking-widest bg-white hover:bg-slate-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className={`flex-1 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer
                  ${
                    selectedOption !== null
                      ? "bg-[#4F46E5] text-white hover:bg-indigo-700"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );
  };

  // Calculate overall progress
  const totalXP = courses.reduce((sum, course) => sum + course.xp, 0);
  const progressPercentage = (currentXP / totalXP) * 100;

  return (
    <>
      <div
        ref={scrollRef}
        data-scroll-container
        className="bg-white font-sans"
        style={{ minHeight: "100vh" }}
      >
        {/* Fixed navbar spacer */}
        <div className="h-20 lg:h-24 w-full"></div>

        <section
          ref={containerRef}
          className="max-w-5xl mx-auto pb-20 px-6"
          data-scroll-section
        >
          {/* Header with XP Stats */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
            <div data-scroll data-scroll-speed="0.5">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-12 bg-[#4F46E5] rounded-full"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F46E5]">
                  Learning Module
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-2">
                Open{" "}
                <span className="italic text-[#4F46E5] underline underline-offset-8">
                  Academy.
                </span>
              </h2>
              <p className="text-slate-700 font-bold text-xs uppercase tracking-widest">
                Free Institutional Learning Path v2.0
              </p>
            </div>

            {/* XP Stats Card */}
            <div className="stats-card flex items-center gap-6 bg-white border border-slate-300 px-8 py-4 rounded-[2rem] shadow-sm flex-shrink-0">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">
                  Total XP
                </p>
                <p className="xp-counter text-2xl font-black text-[#4F46E5]">
                  {currentXP}
                </p>
              </div>
              <div className="w-px h-10 bg-slate-400"></div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">
                  Modules
                </p>
                <p className="text-2xl font-black text-slate-900">
                  {completedModules.length}/{courses.length}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="stats-card mb-8 p-6 bg-white border border-slate-300 rounded-[2rem]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest">
                Learning Progress
              </span>
              <span className="text-sm font-black text-[#4F46E5]">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4F46E5] to-indigo-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            {/* Search Bar */}
            <div className="search-bar relative mb-4">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Search modules by title, description, or tags..."
                className="w-full px-6 py-4 bg-white border-2 border-slate-300 rounded-full text-sm focus:border-[#4F46E5] focus:outline-none transition-all pr-24 text-slate-800 placeholder-slate-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  showFilters
                    ? "bg-[#4F46E5] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Filters {showFilters ? "▲" : "▼"}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div
                ref={filterPanelRef}
                className="bg-white border-2 border-slate-300 rounded-2xl p-6 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Level Filter */}
                  <div>
                    <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2 block">
                      Level
                    </label>
                    <select
                      value={filterLevel}
                      onChange={(e) => setFilterLevel(e.target.value)}
                      className="w-full p-3 border-2 border-slate-300 rounded-xl text-sm focus:border-[#4F46E5] outline-none text-slate-800"
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>

                  {/* Duration Filter */}
                  <div>
                    <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2 block">
                      Duration
                    </label>
                    <select
                      value={filterDuration}
                      onChange={(e) => setFilterDuration(e.target.value)}
                      className="w-full p-3 border-2 border-slate-300 rounded-xl text-sm focus:border-[#4F46E5] outline-none text-slate-800"
                    >
                      <option value="all">Any Duration</option>
                      <option value="short">Short (&lt; 60 min)</option>
                      <option value="medium">Medium (60-90 min)</option>
                      <option value="long">Long (&gt; 90 min)</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2 block">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-3 border-2 border-slate-300 rounded-xl text-sm focus:border-[#4F46E5] outline-none text-slate-800"
                    >
                      <option value="default">Default</option>
                      <option value="xp-high">XP (High to Low)</option>
                      <option value="xp-low">XP (Low to High)</option>
                      <option value="duration-short">
                        Duration (Shortest)
                      </option>
                      <option value="duration-long">Duration (Longest)</option>
                      <option value="level">Level</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(searchTerm ||
                  filterLevel !== "all" ||
                  filterDuration !== "all") && (
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[10px] font-black text-slate-600 uppercase">
                      Active Filters:
                    </span>
                    {searchTerm && (
                      <span className="text-[10px] bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                        Search: "{searchTerm}"
                      </span>
                    )}
                    {filterLevel !== "all" && (
                      <span className="text-[10px] bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                        Level: {filterLevel}
                      </span>
                    )}
                    {filterDuration !== "all" && (
                      <span className="text-[10px] bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                        Duration: {filterDuration}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="mt-3 text-right">
              <span className="text-xs font-black text-slate-700">
                Showing {sortedCourses.length} of {courses.length} modules
              </span>
            </div>
          </div>

          {/* Learning Path Timeline */}
          <div className="relative border-l-4 border-slate-400 ml-6">
            {sortedCourses.length > 0 ? (
              sortedCourses.map((course) => (
                <div
                  key={course.id}
                  className="module-item relative pl-12 group cursor-pointer transition-all mb-6"
                  onClick={() => setSelectedCourse(course)}
                >
                  {/* Timeline dot with status */}
                  <div
                    className={`absolute left-[-14px] top-5 w-6 h-6 rounded-full border-4 border-white shadow-md transition-all 
                    ${
                      completedModules.includes(course.id)
                        ? "bg-green-500 group-hover:scale-125"
                        : "bg-[#4F46E5] group-hover:scale-125"
                    }`}
                  ></div>

                  {/* Module Card - FIXED CONTRAST */}
                  <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-300 shadow-sm hover:border-[#4F46E5] hover:shadow-xl transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="text-left flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                            MODULE {course.id.toString().padStart(2, "0")}
                          </span>
                          <span
                            className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border-2
                            ${
                              course.level === "Beginner"
                                ? "bg-green-100 text-green-800 border-green-300"
                                : course.level === "Intermediate"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                  : course.level === "Advanced"
                                    ? "bg-orange-100 text-orange-800 border-orange-300"
                                    : "bg-red-100 text-red-800 border-red-300"
                            }`}
                          >
                            {course.level}
                          </span>
                          <span className="text-[8px] font-black text-slate-700">
                            ⏱ {course.duration}
                          </span>
                          {/* Tags */}
                          <div className="flex gap-1 ml-2">
                            {course.tags.slice(0, 2).map((tag, i) => (
                              <span
                                key={i}
                                className="text-[8px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-black"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-slate-700 max-w-2xl font-medium">
                          {course.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        {/* XP Badge */}
                        <div className="text-right">
                          <span className="text-base font-black text-[#4F46E5] whitespace-nowrap">
                            +{course.xp} XP
                          </span>
                        </div>

                        {/* Status & Action */}
                        <div className="flex flex-col items-end min-w-[110px]">
                          {completedModules.includes(course.id) ? (
                            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full border-2 border-green-300">
                              <span className="text-green-800 font-black text-xs uppercase tracking-widest whitespace-nowrap">
                                ✓ COMPLETED
                              </span>
                            </div>
                          ) : (
                            <span className="text-[#4F46E5] font-black text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer whitespace-nowrap">
                              START LEARNING →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No results found
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  No modules found
                </h3>
                <p className="text-sm text-slate-600 font-medium">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterLevel("all");
                    setFilterDuration("all");
                    setSortBy("default");
                  }}
                  className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Extra bottom spacing for scroll */}
          <div className="h-10 w-full"></div>
        </section>
      </div>

      {/* Modals */}
      <ModalPortal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />

      {showQuiz && selectedCourse && (
        <QuizModal
          course={selectedCourse}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </>
  );
};

export default Learning;

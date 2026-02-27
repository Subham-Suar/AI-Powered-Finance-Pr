import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Playground = () => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1H");
  const [selectedIndicator, setSelectedIndicator] = useState("rsi");
  const [drawingMode, setDrawingMode] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Trading learning state
  const [learningMode, setLearningMode] = useState(false);
  const [selectedCandle, setSelectedCandle] = useState(null);
  const [showCandleInfo, setShowCandleInfo] = useState(false);

  // Leverage state
  const [leverage, setLeverage] = useState(1);
  const [orderAmount, setOrderAmount] = useState(100);
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");

  // Market data state
  const [marketData, setMarketData] = useState({
    symbol: "BTC/USD",
    price: 57420.45,
    change: 2.4,
    high: 58200.0,
    low: 56800.0,
    volume: 12456,
    rsi: 62,
    macd: "bullish",
    ema: 57100,
    support: 56800,
    resistance: 58200,
  });

  const [aiPrediction, setAiPrediction] = useState({
    direction: "bullish",
    confidence: 78,
    reason: "Golden cross forming on 4H chart with increasing volume",
    targets: [58200, 58800, 59500],
    stops: [56800, 56200],
  });

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What does a Bearish Engulfing pattern indicate?",
      options: [
        "Continuation of uptrend",
        "Potential bearish reversal",
        "Market indecision",
        "Strong buying pressure",
      ],
      correct: 1,
      explanation:
        "A Bearish Engulfing pattern shows sellers overwhelming buyers, indicating a potential trend reversal to the downside.",
      image: "bearish_engulfing",
    },
    {
      id: 2,
      question: "Which pattern shows market indecision?",
      options: ["Engulfing pattern", "Doji", "Marubozu", "Shooting Star"],
      correct: 1,
      explanation:
        "A Doji forms when open and close prices are nearly equal, showing buyers and sellers are in balance.",
      image: "doji",
    },
    {
      id: 3,
      question:
        "What is the ideal volume confirmation for a Bullish Engulfing pattern?",
      options: [
        "Below average volume",
        "Above average volume",
        "Any volume is fine",
        "Declining volume",
      ],
      correct: 1,
      explanation:
        "Above average volume confirms strong institutional participation in the reversal.",
      image: "volume",
    },
    {
      id: 4,
      question:
        "Where should you place a stop loss when trading a Bullish Engulfing pattern?",
      options: [
        "Above the pattern",
        "Below the pattern's low",
        "At the pattern's open",
        "No stop loss needed",
      ],
      correct: 1,
      explanation:
        "Place stop loss below the pattern's low to give the trade room while protecting capital if the pattern fails.",
      image: "stoploss",
    },
    {
      id: 5,
      question: "What market psychology does a Hammer candlestick represent?",
      options: [
        "Sellers completely in control",
        "Buyers rejected lower prices",
        "Market completely indecisive",
        "Extreme greed",
      ],
      correct: 1,
      explanation:
        "A Hammer shows sellers pushed price down but buyers fought back to close near the open, rejecting lower prices.",
      image: "hammer",
    },
  ];

  // Enhanced candlestick data with real patterns
  const [candles, setCandles] = useState([
    // Bullish engulfing pattern (indices 0-1)
    {
      open: 55000,
      high: 55500,
      low: 54800,
      close: 55100,
      volume: 1200,
      pattern: null,
    },
    {
      open: 55100,
      high: 56200,
      low: 55000,
      close: 56000,
      volume: 2500,
      pattern: "bullish_engulfing",
    },

    // Doji (indecision)
    {
      open: 56000,
      high: 56200,
      low: 55800,
      close: 56100,
      volume: 800,
      pattern: null,
    },
    {
      open: 56100,
      high: 56300,
      low: 55900,
      close: 56150,
      volume: 600,
      pattern: "doji",
    },

    // Hammer (reversal)
    {
      open: 56150,
      high: 56500,
      low: 55700,
      close: 56400,
      volume: 1800,
      pattern: null,
    },
    {
      open: 56400,
      high: 56600,
      low: 55900,
      close: 56000,
      volume: 2200,
      pattern: "hammer",
    },

    // Bearish engulfing
    {
      open: 56000,
      high: 56800,
      low: 55900,
      close: 56700,
      volume: 2000,
      pattern: null,
    },
    {
      open: 56700,
      high: 56900,
      low: 55800,
      close: 55900,
      volume: 2800,
      pattern: "bearish_engulfing",
    },

    // Morning star pattern
    {
      open: 55900,
      high: 56100,
      low: 55200,
      close: 55300,
      volume: 1900,
      pattern: null,
    },
    {
      open: 55300,
      high: 55500,
      low: 54800,
      close: 55000,
      volume: 2100,
      pattern: null,
    },
    {
      open: 55000,
      high: 56200,
      low: 54900,
      close: 56100,
      volume: 2700,
      pattern: "morning_star",
    },

    // Shooting star
    {
      open: 56100,
      high: 57200,
      low: 56000,
      close: 56300,
      volume: 2300,
      pattern: null,
    },
    {
      open: 56300,
      high: 57500,
      low: 56200,
      close: 56500,
      volume: 3200,
      pattern: "shooting_star",
    },

    // Marubozu (strong trend)
    {
      open: 56500,
      high: 57800,
      low: 56500,
      close: 57700,
      volume: 3500,
      pattern: "bullish_marubozu",
    },
    {
      open: 57700,
      high: 58000,
      low: 56800,
      close: 56900,
      volume: 2900,
      pattern: null,
    },
    {
      open: 56900,
      high: 57100,
      low: 56000,
      close: 56100,
      volume: 2600,
      pattern: "bearish_marubozu",
    },

    // Spinning top
    {
      open: 56100,
      high: 56500,
      low: 55900,
      close: 56200,
      volume: 1400,
      pattern: null,
    },
    {
      open: 56200,
      high: 56600,
      low: 56000,
      close: 56300,
      volume: 1300,
      pattern: "spinning_top",
    },
  ]);

  // Pattern information for learning
  const patternInfo = {
    bullish_engulfing: {
      name: "Bullish Engulfing",
      description:
        "A bullish reversal pattern where a small red candle is followed by a large green candle that completely 'engulfs' the previous candle's body.",
      signal: "Strong bullish reversal signal, especially after a downtrend",
      psychology:
        "Bears were in control but bulls overwhelmed them with strong buying pressure",
      reliability: "High",
      volume_needed: "Above average volume confirms strength",
    },
    bearish_engulfing: {
      name: "Bearish Engulfing",
      description:
        "A bearish reversal pattern where a small green candle is followed by a large red candle that completely engulfs the previous candle's body.",
      signal: "Strong bearish reversal signal, especially after an uptrend",
      psychology: "Bulls lost control as sellers entered with massive momentum",
      reliability: "High",
      volume_needed: "High volume increases reliability",
    },
    doji: {
      name: "Doji",
      description:
        "A candle where open and close prices are virtually equal, creating a cross-like shape.",
      signal:
        "Market indecision, potential trend reversal or continuation pause",
      psychology: "Buyers and sellers are in perfect balance",
      reliability: "Medium - needs confirmation",
      volume_needed: "Average volume is normal",
    },
    hammer: {
      name: "Hammer",
      description:
        "A bullish reversal pattern with a small body and long lower wick (at least twice the body size).",
      signal: "Bullish reversal after a downtrend",
      psychology:
        "Sellers pushed price down but buyers fought back to close near the open",
      reliability: "High with volume confirmation",
      volume_needed: "Higher volume than previous candles",
    },
    shooting_star: {
      name: "Shooting Star",
      description:
        "A bearish reversal pattern with a small body and long upper wick.",
      signal: "Bearish reversal after an uptrend",
      psychology: "Buyers pushed price up but sellers rejected higher prices",
      reliability: "High",
      volume_needed: "High volume indicates strong rejection",
    },
    morning_star: {
      name: "Morning Star",
      description:
        "A three-candle bullish reversal pattern: long red, short indecision, long green.",
      signal: "Strong bullish reversal",
      psychology: "Selling pressure exhausted, buyers take control",
      reliability: "Very High",
      volume_needed: "Increasing volume on the third candle",
    },
    bullish_marubozu: {
      name: "Bullish Marubozu",
      description:
        "A long green candle with little or no wicks, showing strong buying pressure throughout the session.",
      signal: "Strong bullish momentum continues",
      psychology: "Bulls in complete control from open to close",
      reliability: "High for trend continuation",
      volume_needed: "Above average volume",
    },
    bearish_marubozu: {
      name: "Bearish Marubozu",
      description:
        "A long red candle with little or no wicks, showing strong selling pressure throughout the session.",
      signal: "Strong bearish momentum continues",
      psychology: "Bears in complete control from open to close",
      reliability: "High for trend continuation",
      volume_needed: "Above average volume",
    },
    spinning_top: {
      name: "Spinning Top",
      description:
        "A small body candle with upper and lower wicks, showing indecision.",
      signal: "Potential trend weakening or reversal",
      psychology: "Neither bulls nor bears could gain control",
      reliability: "Low - needs confirmation",
      volume_needed: "Average volume",
    },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Text Reveal
      gsap.utils.toArray(".reveal-text").forEach((text) => {
        gsap.from(text, {
          scrollTrigger: {
            trigger: text,
            start: "top 95%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Animate candles on mount
      gsap.fromTo(
        ".candle-body",
        {
          scaleY: 0,
          transformOrigin: "bottom",
          opacity: 0,
        },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.03,
          delay: 0.2,
        },
      );

      gsap.fromTo(
        ".candle-wick",
        {
          scaleY: 0,
          transformOrigin: "bottom",
          opacity: 0,
        },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.02,
          delay: 0.4,
        },
      );

      gsap.fromTo(
        ".volume-bar",
        {
          scaleY: 0,
          transformOrigin: "bottom",
          opacity: 0,
        },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.02,
          delay: 0.6,
        },
      );

      // Section Tracker
      gsap.utils.toArray(".learning-section").forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          onEnter: () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate candles when they change
  useEffect(() => {
    gsap.fromTo(
      ".candle-body-new",
      {
        scaleY: 0,
        transformOrigin: "bottom",
        backgroundColor: "#FFD700",
      },
      {
        scaleY: 1,
        backgroundColor: (i, target) => {
          const candle = candles[parseInt(target.dataset.index)];
          return candle.close >= candle.open ? "#22c55e" : "#ef4444";
        },
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.05,
      },
    );
  }, [candles]);

  // Handle candle click for learning
  const handleCandleClick = (candle, index) => {
    if (candle.pattern) {
      setSelectedCandle({ ...candle, index });
      setShowCandleInfo(true);
      setLearningMode(true);

      gsap.fromTo(
        ".pattern-modal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      );
    }
  };

// Handle prediction
const handlePrediction = (direction) => {
  setSelectedPrediction(direction);

  // Calculate realistic outcome based on patterns
  const lastCandle = candles[candles.length - 1];
  const marketOutcome = lastCandle.pattern?.includes("bullish")
    ? "bullish"
    : lastCandle.pattern?.includes("bearish")
      ? "bearish"
      : Math.random() > 0.5
        ? "bullish"
        : "bearish";
  const userWon = direction === marketOutcome;
  const profitLoss = userWon ? orderAmount * (leverage * 0.05) : -orderAmount;

  setPredictionResult({
    userPrediction: direction,
    marketOutcome: marketOutcome,
    userWon: userWon,
    priceChange: (
      ((lastCandle.close - lastCandle.open) / lastCandle.open) *
      100
    ).toFixed(2),
    profitLoss: profitLoss.toFixed(2),
    reason: analyzeMarketMove(candles),
    patterns: findRecentPatterns(candles),
  });

  setShowResult(true);

  gsap.fromTo(
    ".result-popup",
    { scale: 0.8, opacity: 0, x: 50 },
    { scale: 1, opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.2)" },
  );
};

// AI Forecast Fetcher
const fetchAIForecast = async () => {
  const API_BASE_URL = "http://localhost:8000/api";
  try {
    const response = await fetch(`${API_BASE_URL}/playground/ai-forecast?symbol=BTC/USD`);
    const data = await response.json();
    setAiPrediction(data);
  } catch (error) {
    console.error("AI Forecast Fetch Error:", error);
  }
};

// Initial Load
useEffect(() => {
  fetchAIForecast();
}, []);

  // Quiz handlers
  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[q.id] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setShowQuizResults(true);

    gsap.fromTo(
      ".quiz-results",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" },
    );
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizSubmit();
    }
  };

  // Market analysis function
  const analyzeMarketMove = (candles) => {
    const recent = candles.slice(-5);
    const patterns = recent.filter((c) => c.pattern).map((c) => c.pattern);

    if (
      patterns.includes("bullish_engulfing") ||
      patterns.includes("morning_star")
    ) {
      return "Bullish reversal patterns detected with increasing volume. Institutional buying pressure suggests continuation.";
    } else if (
      patterns.includes("bearish_engulfing") ||
      patterns.includes("shooting_star")
    ) {
      return "Bearish reversal patterns at resistance level. Profit booking and short selling driving price down.";
    } else if (patterns.includes("doji")) {
      return "Market indecision with doji formation. Waiting for confirmation of next move.";
    } else {
      return "Price action shows consolidation within range. Breakout direction pending volume confirmation.";
    }
  };

  const findRecentPatterns = (candles) => {
    return candles
      .slice(-10)
      .filter((c) => c.pattern)
      .map((c) => patternInfo[c.pattern].name);
  };

  // Calculate candle properties
  const getCandleColor = (candle) => {
    return candle.close >= candle.open ? "bg-green-500" : "bg-red-500";
  };

  // Normalize values for display
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const minPrice = Math.min(...candles.map((c) => c.low));
  const priceRange = maxPrice - minPrice;

  return (
    <div
      ref={containerRef}
      className="bg-[#0B0E14] text-slate-200 font-sans min-h-screen overflow-x-hidden"
    >
      {/* Progress Tracker */}
      <div className="fixed top-10 right-10 z-50 flex gap-2">
        {[0, 1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeStep === step ? "w-8 bg-indigo-500" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Learning Mode Toggle */}
      <div className="fixed top-10 left-10 z-50">
        <button
          onClick={() => setLearningMode(!learningMode)}
          className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
            learningMode
              ? "bg-indigo-500 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {learningMode ? "🎓 Learning Mode Active" : "🔍 Enter Learning Mode"}
        </button>
      </div>

      {/* Quiz Button */}
      <div className="fixed top-10 left-64 z-50">
        <button
          onClick={() => {
            setShowQuiz(true);
            setCurrentQuestion(0);
            setQuizAnswers({});
            setShowQuizResults(false);
          }}
          className="px-6 py-3 bg-purple-500/20 border border-purple-500 rounded-full text-xs font-black uppercase tracking-widest text-purple-400 hover:bg-purple-500/30 transition-all"
        >
          📝 Take Quiz
        </button>
      </div>

      {/* --- PAGE 1: INTERACTIVE TRADING TERMINAL --- */}
      <section className="learning-section min-h-screen flex flex-col justify-center px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-12 bg-indigo-500 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Interactive Trading Terminal
            </span>
          </div>

          <h1 className="reveal-text text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase mb-2">
            Learn by<span className="text-indigo-500"> Doing.</span>
          </h1>

          <p className="reveal-text text-slate-400 text-sm mb-8 max-w-2xl">
            Click on any candlestick to learn about patterns • Practice with
            virtual trades • Understand market psychology
          </p>

          {/* Trading Controls */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Timeframe Selection */}
            <div className="flex bg-white/5 rounded-full p-1">
              {["1m", "5m", "15m", "1H", "4H", "1D"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                    selectedTimeframe === tf
                      ? "bg-indigo-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex bg-white/5 rounded-full p-1">
              {[
                { id: "rsi", label: "RSI" },
                { id: "macd", label: "MACD" },
                { id: "ema", label: "EMA" },
                { id: "bb", label: "Bollinger" },
              ].map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndicator(ind.id)}
                  className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                    selectedIndicator === ind.id
                      ? "bg-indigo-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>

            {/* Drawing Tools */}
            <div className="flex bg-white/5 rounded-full p-1">
              {[
                { id: "trend", label: "📈 Trend" },
                { id: "support", label: "🛡️ S/R" },
                { id: "fib", label: "📐 Fibonacci" },
              ].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setDrawingMode(tool.id)}
                  className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                    drawingMode === tool.id
                      ? "bg-indigo-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tool.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Chart */}
            <div className="lg:col-span-3">
              <div className="bg-slate-800/30 border border-white/5 p-6 rounded-[2rem] backdrop-blur-xl">
                {/* Chart Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {marketData.symbol}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedTimeframe} Chart • Real-time Simulation
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-white">
                      ${marketData.price.toFixed(2)}
                    </p>
                    <p
                      className={`text-sm font-black ${marketData.change > 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {marketData.change > 0 ? "+" : ""}
                      {marketData.change}%
                    </p>
                  </div>
                </div>

                {/* Candlestick Chart */}
                <div
                  ref={chartRef}
                  className="relative h-96 mb-6 cursor-crosshair overflow-hidden"
                  onClick={(e) => {
                    if (learningMode) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const candleWidth = rect.width / candles.length;
                      const index = Math.floor(x / candleWidth);
                      if (index >= 0 && index < candles.length) {
                        handleCandleClick(candles[index], index);
                      }
                    }
                  }}
                >
                  {/* Price Grid */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-full h-px bg-white/5 relative">
                        <span className="absolute left-0 -top-3 text-[8px] text-white/20">
                          ${(maxPrice - (i * priceRange) / 4).toFixed(0)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Candles */}
                  <div className="absolute inset-0 flex items-end gap-[2px]">
                    {candles.map((candle, i) => {
                      const heightPercent =
                        ((candle.high - candle.low) / priceRange) * 100;
                      const bodyPercent =
                        (Math.abs(candle.close - candle.open) / priceRange) *
                        100;
                      const topWickPercent =
                        ((candle.high - Math.max(candle.open, candle.close)) /
                          priceRange) *
                        100;
                      const bottomWickPercent =
                        ((Math.min(candle.open, candle.close) - candle.low) /
                          priceRange) *
                        100;

                      return (
                        <div
                          key={i}
                          data-index={i}
                          className={`flex-1 flex flex-col items-center relative group ${
                            candle.pattern
                              ? "cursor-pointer hover:opacity-80"
                              : ""
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        >
                          {/* Top Wick */}
                          {topWickPercent > 0 && (
                            <div
                              className={`candle-wick w-0.5 ${candle.close >= candle.open ? "bg-green-500/50" : "bg-red-500/50"}`}
                              style={{ height: `${topWickPercent}%` }}
                            />
                          )}

                          {/* Body */}
                          <div
                            className={`candle-body candle-body-new w-3/4 ${getCandleColor(candle)}/80 rounded-sm relative group-hover:ring-2 ring-indigo-500 transition-all`}
                            style={{ height: `${bodyPercent}%` }}
                            data-index={i}
                          >
                            {/* Pattern Indicator */}
                            {candle.pattern && learningMode && (
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                <span className="text-[8px] bg-indigo-500 text-white px-2 py-1 rounded-full">
                                  {patternInfo[candle.pattern]?.name}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Bottom Wick */}
                          {bottomWickPercent > 0 && (
                            <div
                              className={`candle-wick w-0.5 ${candle.close >= candle.open ? "bg-green-500/50" : "bg-red-500/50"}`}
                              style={{ height: `${bottomWickPercent}%` }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Support/Resistance Lines */}
                  {drawingMode === "support" && (
                    <>
                      <div className="absolute left-0 right-0 bottom-1/4 border-t-2 border-dashed border-green-500/50">
                        <span className="absolute -top-5 left-2 text-[10px] text-green-400">
                          Support ${marketData.support}
                        </span>
                      </div>
                      <div className="absolute left-0 right-0 top-1/4 border-t-2 border-dashed border-red-500/50">
                        <span className="absolute -top-5 right-2 text-[10px] text-red-400">
                          Resistance ${marketData.resistance}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Fibonacci Levels */}
                  {drawingMode === "fib" && (
                    <div className="absolute inset-0">
                      {[0, 0.236, 0.382, 0.5, 0.618, 0.786, 1].map(
                        (level, i) => (
                          <div
                            key={i}
                            className="absolute left-0 right-0 border-t border-dashed border-indigo-500/30"
                            style={{ bottom: `${level * 100}%` }}
                          >
                            <span className="absolute left-2 -top-3 text-[8px] text-indigo-400">
                              Fib {Math.round(level * 100)}%
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>

                {/* Volume Bars */}
                <div className="flex gap-[2px] h-16 mt-4">
                  {candles.map((candle, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col justify-end group"
                      title={`Volume: ${candle.volume}K`}
                    >
                      <div
                        className={`volume-bar w-full ${
                          candle.close >= candle.open
                            ? "bg-green-500/30"
                            : "bg-red-500/30"
                        } hover:bg-opacity-50 transition-all cursor-pointer`}
                        style={{
                          height: `${(candle.volume / 4000) * 100}%`,
                          transformOrigin: "bottom",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Indicator Panel */}
                {selectedIndicator && (
                  <div className="mt-6 p-4 bg-white/5 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-widest text-indigo-400">
                        {selectedIndicator.toUpperCase()} INDICATOR
                      </span>
                      <span className="text-xs text-slate-400">
                        Current Value
                      </span>
                    </div>

                    {selectedIndicator === "rsi" && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span>RSI (14)</span>
                          <span
                            className={`font-black ${
                              marketData.rsi > 70
                                ? "text-red-400"
                                : marketData.rsi < 30
                                  ? "text-green-400"
                                  : "text-white"
                            }`}
                          >
                            {marketData.rsi}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              marketData.rsi > 70
                                ? "bg-red-500"
                                : marketData.rsi < 30
                                  ? "bg-green-500"
                                  : "bg-indigo-500"
                            }`}
                            style={{ width: `${marketData.rsi}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                          {marketData.rsi > 70
                            ? "Overbought - Possible reversal"
                            : marketData.rsi < 30
                              ? "Oversold - Possible bounce"
                              : "Neutral - No extreme conditions"}
                        </p>
                      </div>
                    )}

                    {selectedIndicator === "macd" && (
                      <div className="mt-3">
                        <p className="text-sm font-black text-green-400">
                          Bullish Cross
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          MACD line crossed above signal line, suggesting upward
                          momentum
                        </p>
                      </div>
                    )}

                    {selectedIndicator === "ema" && (
                      <div className="mt-3">
                        <p className="text-sm">
                          EMA (20):{" "}
                          <span className="font-black">${marketData.ema}</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Price is trading above EMA, indicating bullish trend
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Trading Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-white/5 p-6 rounded-[2rem] backdrop-blur-xl sticky top-24">
                <h3 className="text-xl font-black mb-6">Place Trade</h3>

                {/* Account Info */}
                <div className="p-4 bg-white/5 rounded-2xl mb-6">
                  <p className="text-xs text-slate-400 mb-1">Virtual Balance</p>
                  <p className="text-2xl font-black text-white">$10,000</p>
                </div>

                {/* Order Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">
                      Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={orderAmount}
                      onChange={(e) => setOrderAmount(Number(e.target.value))}
                      min="10"
                      max="10000"
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">
                      Leverage
                    </label>
                    <select
                      value={leverage}
                      onChange={(e) => setLeverage(Number(e.target.value))}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                    >
                      <option value="1">1x (No leverage)</option>
                      <option value="2">2x</option>
                      <option value="5">5x</option>
                      <option value="10">10x</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">
                      Stop Loss ($)
                    </label>
                    <input
                      type="number"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      placeholder="Optional"
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">
                      Take Profit ($)
                    </label>
                    <input
                      type="number"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.value)}
                      placeholder="Optional"
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                {/* Trade Buttons */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handlePrediction("bullish")}
                    className="flex-1 py-4 bg-green-500/20 border-2 border-green-500 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-green-500/30 transition-all"
                  >
                    🐂 BUY/LONG
                  </button>
                  <button
                    onClick={() => handlePrediction("bearish")}
                    className="flex-1 py-4 bg-red-500/20 border-2 border-red-500 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-red-500/30 transition-all"
                  >
                    🐻 SELL/SHORT
                  </button>
                </div>

                {/* AI Prediction */}
                <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🤖</span>
                    <span className="text-xs text-indigo-400">AI ANALYSIS</span>
                  </div>
                  <p className="text-sm font-black mb-1">
                    {aiPrediction.direction.toUpperCase()} •{" "}
                    {aiPrediction.confidence}% confidence
                  </p>
                  <p className="text-xs text-slate-400">
                    {aiPrediction.reason}
                  </p>

                  {/* Price Targets */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-slate-400 mb-2">Targets:</p>
                    <div className="flex gap-2">
                      {aiPrediction.targets.map((target, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-white/10 rounded-full"
                        >
                          ${target}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PAGE 2: PATTERN RECOGNITION LAB --- */}
      <section className="learning-section min-h-screen flex flex-col justify-center px-6 md:px-20 bg-slate-800/20 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-12 bg-indigo-500 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Pattern Recognition Lab
            </span>
          </div>

          <h2 className="reveal-text text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase mb-4">
            Read the<span className="text-indigo-500"> Charts.</span>
          </h2>

          <p className="text-slate-400 mb-12 max-w-2xl">
            Click on any candlestick pattern in the chart above to learn its
            meaning and trading implications.
          </p>

          {/* Pattern Library */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(patternInfo).map(([key, pattern]) => (
              <div
                key={key}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all cursor-pointer group"
                onClick={() => {
                  setSelectedCandle({ pattern: key });
                  setShowCandleInfo(true);
                }}
              >
                <h3 className="font-black text-lg mb-2 group-hover:text-indigo-400 transition-colors">
                  {pattern.name}
                </h3>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                  {pattern.description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      pattern.reliability === "High" ||
                      pattern.reliability === "Very High"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {pattern.reliability}
                  </span>
                  <span className="text-indigo-400 text-xs group-hover:translate-x-2 transition-transform">
                    Learn more →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PAGE 3: TRADING SIMULATOR & QUIZ --- */}
      <section className="learning-section min-h-screen flex flex-col justify-center px-6 md:px-20 bg-indigo-600/5 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-12 bg-indigo-500 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Trading Simulator
            </span>
          </div>

          <h2 className="reveal-text text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase mb-4">
            Test Your<span className="text-indigo-500"> Skills.</span>
          </h2>

          <p className="text-slate-400 mb-12 max-w-2xl">
            Practice with virtual money • Learn from your mistakes • Build
            confidence
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Performance Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                <h3 className="text-lg font-black mb-6">Your Stats</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Win Rate</p>
                    <p className="text-3xl font-black text-green-400">62%</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 mb-1">Total Trades</p>
                    <p className="text-2xl font-black">47</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 mb-1">Profit Factor</p>
                    <p className="text-2xl font-black">1.85</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 mb-1">Avg Win/Loss</p>
                    <div className="flex gap-4">
                      <span className="text-green-400">+$124</span>
                      <span className="text-red-400">-$67</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-indigo-500/10 rounded-[2rem] border border-indigo-500/20">
                <h3 className="text-lg font-black mb-4">Next Challenge</h3>
                <p className="text-sm mb-4">
                  Identify the bullish reversal pattern forming on the 4H chart
                </p>
                <button
                  onClick={() => {
                    setShowQuiz(true);
                    setCurrentQuestion(0);
                    setQuizAnswers({});
                  }}
                  className="w-full py-3 bg-indigo-600 rounded-full text-xs font-black uppercase tracking-widest"
                >
                  Start Quiz
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { tip: "Always use stop losses", icon: "🛡️" },
                  { tip: "Risk max 2% per trade", icon: "📊" },
                  { tip: "Wait for confirmation", icon: "⏳" },
                  { tip: "Follow the trend", icon: "📈" },
                  { tip: "Keep a trading journal", icon: "📝" },
                  { tip: "Learn from losses", icon: "🎓" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 bg-white/5 rounded-xl flex items-center gap-4"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-black">{item.tip}</span>
                  </div>
                ))}
              </div>

              {/* Trading Rules */}
              <div className="mt-6 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20">
                <h4 className="text-sm font-black text-yellow-400 mb-3">
                  ⚠️ GOLDEN RULES
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    Never risk more than 2% on a single trade
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    Always have a stop loss before entering
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    Risk-to-reward ratio should be at least 1:2
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    Don't trade during major news events
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PAGE 4: MARKET PSYCHOLOGY --- */}
      <section className="learning-section min-h-screen flex flex-col justify-center px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-12 bg-indigo-500 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Market Psychology
            </span>
          </div>

          <h2 className="reveal-text text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase mb-16">
            Understand the<span className="text-indigo-500"> Mind.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Psychology Cards */}
            {[
              {
                emotion: "Fear",
                description:
                  "Selling pressure increases, creating long lower wicks",
                color: "red",
                example: "Hammer patterns form when fear is rejected",
              },
              {
                emotion: "Greed",
                description: "Buying pressure creates long upper wicks",
                color: "green",
                example: "Shooting stars show greed being rejected",
              },
              {
                emotion: "Indecision",
                description: "Doji patterns show market uncertainty",
                color: "yellow",
                example: "Spinning tops indicate trend exhaustion",
              },
              {
                emotion: "Conviction",
                description: "Marubozu candles show strong conviction",
                color: "indigo",
                example: "No wicks = complete control",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-3 h-3 rounded-full bg-${item.color}-500`}
                  />
                  <h3 className="font-black text-lg">{item.emotion}</h3>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  {item.description}
                </p>
                <p className="text-xs text-slate-400 italic">
                  "{item.example}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="quiz-container bg-slate-900 border border-indigo-500/30 rounded-[2.5rem] max-w-2xl w-full my-8">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-black text-white">
                  {showQuizResults
                    ? "Quiz Results"
                    : `Question ${currentQuestion + 1}/${quizQuestions.length}`}
                </h3>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              {!showQuizResults ? (
                <>
                  <div className="mb-8">
                    <p className="text-lg text-white mb-6">
                      {quizQuestions[currentQuestion].question}
                    </p>

                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleQuizAnswer(
                                quizQuestions[currentQuestion].id,
                                index,
                              )
                            }
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                              quizAnswers[quizQuestions[currentQuestion].id] ===
                              index
                                ? "border-indigo-500 bg-indigo-500/20"
                                : "border-white/10 bg-white/5 hover:border-white/20"
                            }`}
                          >
                            <span className="text-white">{option}</span>
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        setCurrentQuestion(Math.max(0, currentQuestion - 1))
                      }
                      disabled={currentQuestion === 0}
                      className={`px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest ${
                        currentQuestion === 0
                          ? "bg-white/5 text-white/30 cursor-not-allowed"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Previous
                    </button>

                    <button
                      onClick={handleNextQuestion}
                      disabled={
                        quizAnswers[quizQuestions[currentQuestion].id] ===
                        undefined
                      }
                      className={`px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest ${
                        quizAnswers[quizQuestions[currentQuestion].id] ===
                        undefined
                          ? "bg-white/5 text-white/30 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {currentQuestion === quizQuestions.length - 1
                        ? "Submit"
                        : "Next"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="quiz-results">
                  <div className="text-center mb-8">
                    <p className="text-6xl font-black text-indigo-400 mb-4">
                      {quizScore}/{quizQuestions.length}
                    </p>
                    <p className="text-2xl font-black text-white mb-2">
                      {quizScore === quizQuestions.length
                        ? "Perfect Score! 🏆"
                        : quizScore >= quizQuestions.length * 0.7
                          ? "Good Job! 👏"
                          : "Keep Learning! 📚"}
                    </p>
                    <p className="text-slate-400">
                      {quizScore === quizQuestions.length
                        ? "You're a pattern recognition master!"
                        : quizScore >= quizQuestions.length * 0.7
                          ? "You have solid understanding of patterns."
                          : "Review the patterns and try again."}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                    {quizQuestions.map((q, i) => (
                      <div key={q.id} className="p-4 bg-white/5 rounded-xl">
                        <p className="text-sm font-black text-white mb-2">
                          {q.question}
                        </p>
                        <p className="text-xs mb-2">
                          Your answer:{" "}
                          <span
                            className={
                              quizAnswers[q.id] === q.correct
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {q.options[quizAnswers[q.id]]}
                          </span>
                        </p>
                        {quizAnswers[q.id] !== q.correct && (
                          <p className="text-xs text-green-400">
                            Correct: {q.options[q.correct]}
                          </p>
                        )}
                        <p className="text-xs text-slate-400 mt-2 italic">
                          {q.explanation}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowQuiz(false)}
                    className="w-full py-4 bg-indigo-600 rounded-full text-sm font-black uppercase tracking-widest hover:bg-indigo-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pattern Info Modal */}
      {showCandleInfo && selectedCandle && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="pattern-modal bg-slate-900 border border-indigo-500/30 rounded-[2.5rem] max-w-2xl w-full my-8">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-black text-white">
                  {selectedCandle.pattern
                    ? patternInfo[selectedCandle.pattern]?.name
                    : "Candlestick Pattern"}
                </h3>
                <button
                  onClick={() => setShowCandleInfo(false)}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              {selectedCandle.pattern &&
                patternInfo[selectedCandle.pattern] && (
                  <div className="space-y-6">
                    {/* Visual Representation */}
                    <div className="p-6 bg-white/5 rounded-2xl flex justify-center gap-4 h-32 items-end">
                      {selectedCandle.pattern.includes("bullish") && (
                        <>
                          <div
                            className="w-12 bg-red-500/50 rounded-t-sm"
                            style={{ height: "40px" }}
                          />
                          <div
                            className="w-12 bg-green-500 rounded-sm"
                            style={{ height: "70px" }}
                          />
                        </>
                      )}
                      {selectedCandle.pattern.includes("bearish") && (
                        <>
                          <div
                            className="w-12 bg-green-500/50 rounded-t-sm"
                            style={{ height: "60px" }}
                          />
                          <div
                            className="w-12 bg-red-500 rounded-sm"
                            style={{ height: "80px" }}
                          />
                        </>
                      )}
                      {selectedCandle.pattern === "doji" && (
                        <div className="relative w-12">
                          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-yellow-500" />
                          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-yellow-500" />
                        </div>
                      )}
                      {selectedCandle.pattern === "hammer" && (
                        <div className="relative w-12">
                          <div className="w-full h-8 bg-green-500/50 rounded-t-sm" />
                          <div className="absolute bottom-0 left-1/2 w-0.5 h-12 bg-green-500/50" />
                        </div>
                      )}
                      {selectedCandle.pattern === "shooting_star" && (
                        <div className="relative w-12">
                          <div className="w-full h-8 bg-red-500/50 rounded-t-sm" />
                          <div className="absolute top-0 left-1/2 w-0.5 h-12 bg-red-500/50" />
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="p-6 bg-white/5 rounded-2xl">
                      <p className="text-white text-lg leading-relaxed">
                        {patternInfo[selectedCandle.pattern].description}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-indigo-400 mb-2">SIGNAL</p>
                        <p className="text-sm">
                          {patternInfo[selectedCandle.pattern].signal}
                        </p>
                      </div>

                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-indigo-400 mb-2">
                          PSYCHOLOGY
                        </p>
                        <p className="text-sm">
                          {patternInfo[selectedCandle.pattern].psychology}
                        </p>
                      </div>

                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-indigo-400 mb-2">
                          RELIABILITY
                        </p>
                        <p className="text-sm font-black">
                          {patternInfo[selectedCandle.pattern].reliability}
                        </p>
                      </div>

                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-indigo-400 mb-2">
                          VOLUME NEEDED
                        </p>
                        <p className="text-sm">
                          {patternInfo[selectedCandle.pattern].volume_needed}
                        </p>
                      </div>
                    </div>

                    {/* Trading Strategy */}
                    <div className="p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/30">
                      <p className="text-sm font-black text-indigo-400 mb-3">
                        📈 TRADING STRATEGY
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-green-400">•</span>
                          Enter on confirmation (next candle)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-400">•</span>
                          Place stop loss below low (for bullish) or above high
                          (for bearish)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-400">•</span>
                          Target previous swing points
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        setShowCandleInfo(false);
                      }}
                      className="w-full py-4 bg-indigo-600 rounded-full text-sm font-black uppercase tracking-widest hover:bg-indigo-700"
                    >
                      Close
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Trade Result Popup */}
      {showResult && predictionResult && (
        <div className="result-popup fixed bottom-10 right-10 w-96 bg-slate-900 border border-indigo-500/30 rounded-[2rem] p-6 shadow-2xl z-50">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-black">Trade Result</h4>
            <button
              onClick={() => setShowResult(false)}
              className="text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div
            className={`text-center p-4 rounded-2xl mb-4 ${
              predictionResult.userWon ? "bg-green-500/20" : "bg-red-500/20"
            }`}
          >
            <p className="text-3xl mb-2">
              {predictionResult.userWon ? "✓" : "✗"}
            </p>
            <p className="text-sm font-black">
              {predictionResult.userWon
                ? `PROFIT: +$${predictionResult.profitLoss}`
                : `LOSS: -$${Math.abs(predictionResult.profitLoss)}`}
            </p>
          </div>

          <div className="space-y-2 text-sm mb-4">
            <p>
              Your position:{" "}
              <span className="font-black uppercase">
                {predictionResult.userPrediction}
              </span>
            </p>
            <p>
              Market moved:{" "}
              <span className="font-black uppercase">
                {predictionResult.marketOutcome}
              </span>
            </p>
            <p>
              Price change:{" "}
              <span
                className={`font-black ${
                  parseFloat(predictionResult.priceChange) > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {predictionResult.priceChange}%
              </span>
            </p>
          </div>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-full py-3 bg-indigo-600 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-700"
          >
            {showInfo ? "HIDE" : "SHOW"} MARKET ANALYSIS
          </button>

          {showInfo && (
            <div className="mt-4 p-4 bg-white/5 rounded-2xl text-xs leading-relaxed max-h-60 overflow-y-auto">
              <p className="font-black text-indigo-400 mb-2">
                📊 MARKET ANALYSIS
              </p>
              <p className="mb-2">{predictionResult.reason}</p>
              {predictionResult.patterns &&
                predictionResult.patterns.length > 0 && (
                  <>
                    <p className="font-black text-indigo-400 mt-3 mb-1">
                      Patterns detected:
                    </p>
                    <ul className="list-disc pl-4">
                      {predictionResult.patterns.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Playground;

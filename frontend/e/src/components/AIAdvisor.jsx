import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const AIAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "👋 Welcome back, Jatin! I've been analyzing your portfolio and trading patterns.",
      time: "10:30 AM",
      type: "greeting",
    },
    {
      id: 2,
      role: "ai",
      text: "I noticed your **Tech Stocks** prediction accuracy is at 62%. Would you like a quick lesson on 'Volatility in IT Sector'? 📈",
      time: "10:30 AM",
      type: "suggestion",
      action: "lesson",
      metric: "62% accuracy",
      sector: "Tech Stocks",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [advisorMode, setAdvisorMode] = useState("conversational"); // conversational, learning, trading
  const [userData, setUserData] = useState({
    name: "Jatin",
    level: 4,
    xp: 2450,
    accuracy: 62,
    riskTolerance: "Moderate",
    topSector: "Tech",
    recentTrades: 12,
    winRate: 58,
    portfolioValue: 574220,
    learningProgress: 45,
  });

  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      type: "lesson",
      title: "Improve Tech Stock Accuracy",
      description: "Your tech sector accuracy is below average",
      action: "Start Lesson",
      icon: "📚",
      priority: "high",
    },
    {
      id: 2,
      type: "trade",
      title: "Rebalance Portfolio",
      description: "Reduce crypto exposure by 2%",
      action: "View Suggestion",
      icon: "⚖️",
      priority: "medium",
    },
    {
      id: 3,
      type: "alert",
      title: "Market News",
      description: "Fed meeting today at 2:30 PM",
      action: "Learn More",
      icon: "📰",
      priority: "low",
    },
  ]);

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Automatic Scroll to Bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Entrance Animation
  useEffect(() => {
    gsap.from(".advisor-card", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.from(".suggestion-item", {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  // Simulate AI typing and response
  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // Portfolio related queries
    if (input.includes("portfolio") || input.includes("performance")) {
      return {
        text: `📊 Based on my analysis, your portfolio has grown **${userData.portfolioValue > 600000 ? "15.2%" : "12.5%"}** this month. The tech sector is driving most gains, but I'd recommend diversifying into healthcare for better risk management.`,
        type: "analysis",
      };
    }

    // Risk related queries
    else if (input.includes("risk") || input.includes("exposure")) {
      return {
        text: `⚠️ Your current risk level is **${userData.riskTolerance}**. Crypto exposure is 12% (2% above target). Consider reducing by 2% to optimize your risk-reward ratio.`,
        type: "warning",
      };
    }

    // Learning related queries
    else if (
      input.includes("learn") ||
      input.includes("lesson") ||
      input.includes("study")
    ) {
      return {
        text: `🎓 Great initiative! Based on your weak areas, I recommend starting with **Technical Analysis for Tech Stocks**. This 15-min lesson could improve your accuracy by 15-20%. Shall I begin?`,
        type: "learning",
        action: "Start Lesson",
      };
    }

    // Market related queries
    else if (
      input.includes("market") ||
      input.includes("news") ||
      input.includes("today")
    ) {
      return {
        text: `📈 **Market Update**: Nifty up 0.8% | Fed meeting at 2:30 PM | Tech stocks showing strength. Key levels: Support at 18,500, Resistance at 18,800.`,
        type: "market",
      };
    }

    // Trade related queries
    else if (
      input.includes("trade") ||
      input.includes("buy") ||
      input.includes("sell")
    ) {
      return {
        text: `💡 I've analyzed 3 potential trades for today:\n1. **RELIANCE** - Bullish breakout (Target: ₹2,850)\n2. **HDFC Bank** - Support bounce (Target: ₹1,680)\n3. **INFY** - Consolidation breakout (Target: ₹1,520)`,
        type: "trading",
      };
    }

    // Greetings
    else if (
      input.includes("hi") ||
      input.includes("hello") ||
      input.includes("hey")
    ) {
      return {
        text: `👋 Hey ${userData.name}! How can I help with your trading today? I've been monitoring your progress - you're doing great!`,
        type: "greeting",
      };
    }

    // Default response
    else {
      return {
        text: `🤔 I understand you're asking about "${userInput}". To give you the best advice, could you be more specific? You can ask me about:\n• Portfolio performance\n• Risk management\n• Learning modules\n• Market news\n• Trade suggestions`,
        type: "clarification",
      };
    }
  };

const handleSendMessage = async () => {
  if (!inputValue.trim()) return;

  const userMsg = { role: "user", text: inputValue, time: "Just now" };
  setMessages((prev) => [...prev, userMsg]);
  setInputValue("");
  setIsTyping(true);

  // Simulate AI thinking
  setTimeout(() => {
    const aiResponse = generateAIResponse(inputValue);

    // Add follow-up suggestion based on context
    let followUpText = "";
    if (aiResponse.type === "analysis") {
      followUpText = " Would you like to see a detailed breakdown?";
    } else if (aiResponse.type === "warning") {
      followUpText =
        " I can suggest an optimal rebalancing plan if you want.";
    } else if (aiResponse.type === "learning") {
      followUpText =
        " The lesson includes interactive charts and a quick quiz.";
    }

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        role: "ai",
        text: aiResponse.text + followUpText,
        time: "Just now",
        type: aiResponse.type,
      },
    ]);

    // Update suggestions based on context
    if (aiResponse.type === "learning") {
      setSuggestions((prev) => [
        {
          id: prev.length + 1,
          type: "lesson",
          title: "Technical Analysis Basics",
          description: "15-min interactive lesson",
          action: "Start Now",
          icon: "📊",
          priority: "high",
        },
        ...prev,
      ]);
    }

    setIsTyping(false);
  }, 1500);
};

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "lesson") {
      const lessonMsg = {
        id: messages.length + 1,
        role: "user",
        text: `I want to learn about ${suggestion.title}`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "user",
      };
      setMessages((prev) => [...prev, lessonMsg]);
      setIsTyping(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            role: "ai",
            text: `🎓 Great choice! Let's start with "${suggestion.title}". This will help improve your ${userData.topSector} sector trading. I'll guide you through key concepts and test your understanding with a quick quiz. Ready?`,
            time: "Just now",
            type: "learning",
          },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const getMessageStyle = (type) => {
    switch (type) {
      case "greeting":
        return "border-l-4 border-green-500";
      case "suggestion":
        return "border-l-4 border-yellow-500";
      case "warning":
        return "border-l-4 border-red-500";
      case "analysis":
        return "border-l-4 border-blue-500";
      case "learning":
        return "border-l-4 border-purple-500";
      case "market":
        return "border-l-4 border-indigo-500";
      case "trading":
        return "border-l-4 border-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-[2px] w-12 bg-indigo-600 rounded-full"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
                Neural AI Assistant
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-slate-800 uppercase">
              AI Strategy<span className="text-indigo-600"> Advisor</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
              Neural Sync Status:{" "}
              <span className="text-green-600 animate-pulse">● Active</span> •
              Learning Mode:{" "}
              <span className="text-indigo-600">
                {advisorMode === "conversational"
                  ? "Conversational"
                  : advisorMode === "learning"
                    ? "Learning"
                    : "Trading"}
              </span>
            </p>
          </div>

          {/* User Profile Quick Stats */}
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm">
            <div className="text-right">
              <p className="text-[8px] font-black text-slate-400 uppercase">
                Level {userData.level}
              </p>
              <p className="text-xs font-black text-indigo-600">
                {userData.xp} XP
              </p>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black">
              {userData.name[0]}
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2 mb-6">
          {["conversational", "learning", "trading"].map((mode) => (
            <button
              key={mode}
              onClick={() => setAdvisorMode(mode)}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                advisorMode === mode
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-400 hover:text-slate-600 border border-slate-200"
              }`}
            >
              {mode} Mode
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: CHAT INTERFACE */}
          <div className="lg:col-span-8 flex flex-col h-[600px] md:h-[700px] bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="font-black text-sm">Neural AI Assistant</h3>
                <p className="text-[10px] text-slate-400">
                  Online • Learning your patterns
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[75%] p-5 rounded-[2rem] shadow-sm ${
                      msg.role === "ai"
                        ? `bg-slate-50 border border-slate-100 rounded-tl-none ${getMessageStyle(msg.type)}`
                        : "bg-indigo-600 text-white rounded-tr-none"
                    }`}
                  >
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>

                    {/* Action Buttons for AI messages */}
                    {msg.role === "ai" && msg.action && (
                      <button className="mt-3 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black hover:bg-indigo-200 transition-all">
                        {msg.action} →
                      </button>
                    )}

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[8px] font-black uppercase opacity-40">
                        {msg.time}
                      </span>
                      {msg.role === "ai" && (
                        <span className="text-[8px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                          AI
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 p-5 rounded-[2rem] rounded-tl-none border border-slate-100">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me about portfolio, risk, markets, or learning..."
                  className="w-full bg-white border-2 border-slate-200 rounded-full py-4 px-6 pr-24 focus:outline-none focus:border-indigo-600 text-sm font-medium"
                />
                <div className="absolute right-2 flex gap-1">
                  <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors">
                    📎
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="bg-indigo-600 p-3 rounded-full text-white hover:bg-indigo-700 transition-all active:scale-90"
                  >
                    <svg
                      className="w-4 h-4 rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Quick Reply Chips */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {[
                  "How's my portfolio?",
                  "What's my risk?",
                  "Show me learning",
                  "Market news",
                  "Trade ideas",
                ].map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputValue(chip);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black whitespace-nowrap hover:border-indigo-600 hover:text-indigo-600 transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR - Enhanced with Contextual Suggestions */}
          <div className="lg:col-span-4 space-y-6">
            {/* User Context Card */}
            <div className="advisor-card bg-gradient-to-br from-indigo-900 to-indigo-800 p-6 rounded-[2.5rem] text-white shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-60">
                Your Context
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-80">Trading Accuracy</span>
                  <span className="text-lg font-black text-green-400">
                    {userData.accuracy}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-80">Risk Tolerance</span>
                  <span className="text-sm font-black text-yellow-400">
                    {userData.riskTolerance}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-80">Top Sector</span>
                  <span className="text-sm font-black text-indigo-300">
                    {userData.topSector}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-80">Win Rate</span>
                  <span className="text-sm font-black text-green-400">
                    {userData.winRate}%
                  </span>
                </div>
              </div>

              {/* Learning Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-[10px] mb-2">
                  <span className="opacity-60">Learning Progress</span>
                  <span className="font-black">
                    {userData.learningProgress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: `${userData.learningProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Contextual Suggestions */}
            <div className="advisor-card bg-white border border-slate-200 p-6 rounded-[2.5rem] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-slate-800">
                  AI Suggestions
                </h3>
                <span className="text-[8px] bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                  {suggestions.filter((s) => s.priority === "high").length} High
                  Priority
                </span>
              </div>

              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="suggestion-item p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-600 cursor-pointer transition-all group"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{suggestion.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-black text-sm">
                            {suggestion.title}
                          </h4>
                          {suggestion.priority === "high" && (
                            <span className="text-[8px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              !
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-2">
                          {suggestion.description}
                        </p>
                        <button className="text-[10px] font-black text-indigo-600 group-hover:translate-x-1 transition-transform">
                          {suggestion.action} →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="advisor-card bg-white border border-slate-200 p-6 rounded-[2.5rem] shadow-sm">
              <h3 className="text-sm font-black text-slate-800 mb-4">
                System Metrics
              </h3>

              <div className="space-y-4">
                {[
                  { label: "Context Sync", value: "100%", status: "active" },
                  { label: "Real-time Data", value: "98%", status: "active" },
                  { label: "Portfolio Link", value: "95%", status: "active" },
                  {
                    label: "Pattern Recognition",
                    value: "87%",
                    status: "active",
                  },
                  { label: "Risk Analysis", value: "92%", status: "active" },
                ].map((metric, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center group"
                  >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {metric.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-700">
                        {metric.value}
                      </span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    Overall Score
                  </span>
                  <span className="text-2xl font-black italic text-indigo-600">
                    94<span className="text-xs text-slate-400 ml-1">/100</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-indigo-50 rounded-xl text-center hover:bg-indigo-100 transition-all">
                <span className="text-2xl block mb-2">📊</span>
                <span className="text-[10px] font-black text-indigo-600">
                  Analyze Portfolio
                </span>
              </button>
              <button className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition-all">
                <span className="text-2xl block mb-2">📚</span>
                <span className="text-[10px] font-black text-green-600">
                  Start Lesson
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-[8px] text-slate-400">
            AI Advisor provides educational insights. Not financial advice.
            Always do your own research.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIAdvisor;

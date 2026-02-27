import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const NewsIntelligence = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsFeed, setNewsFeed] = useState([]);
  const [filterSentiment, setFilterSentiment] = useState("all");
  const [filterImpact, setFilterImpact] = useState("all");
  const [showCorrelation, setShowCorrelation] = useState(false);
  const [marketImpact, setMarketImpact] = useState({});
  const pathRef = useRef(null);
  const chartRef = useRef(null);

  // Initial news data with enhanced fields
  const initialNewsData = [
    {
      id: 1,
      title: "RBI INCREASES REPO RATE BY 25BPS",
      sentiment: "Negative",
      impact: "High",
      time: "2M AGO",
      timestamp: Date.now() - 120000,
      description:
        "Neural analysis detects heavy institutional selling in banking stocks. Liquidity crunch expected in mid-caps. Banking index down 2.3% post announcement.",
      score: "8.9",
      correlation: 92,
      volatility: "Sharp Spike",
      affectedSectors: ["Banking", "Financial Services", "Real Estate"],
      priceImpact: "-2.3%",
      volumeChange: "+156%",
      path: "M0,80 L50,85 L100,90 L150,95 L200,40 L250,50 L300,70 L350,80 L400,85",
      chartData: [45, 48, 52, 58, 62, 55, 48, 42, 38, 35, 40, 45],
    },
    {
      id: 2,
      title: "RELIANCE RETAIL EXPANDS TO 50 CITIES",
      sentiment: "Positive",
      impact: "Medium",
      time: "15M AGO",
      timestamp: Date.now() - 900000,
      description:
        "Strong bullish divergence observed. Retail expansion strategy aligning with long-term growth projections. Analyst target raised to ₹3,200.",
      score: "7.4",
      correlation: 78,
      volatility: "Stable Rise",
      affectedSectors: ["Retail", "Consumer Goods", "E-commerce"],
      priceImpact: "+1.8%",
      volumeChange: "+89%",
      path: "M0,90 L50,85 L100,80 L150,70 L200,60 L250,40 L300,30 L350,25 L400,20",
      chartData: [32, 35, 38, 42, 48, 52, 58, 62, 65, 68, 72, 75],
    },
    {
      id: 3,
      title: "HDFC BANK Q3 PROFITS JUMP 18%",
      sentiment: "Positive",
      impact: "High",
      time: "2H AGO",
      timestamp: Date.now() - 7200000,
      description:
        "Institutional buy-walls detected at 1650 levels. Profit growth beating analyst expectations by 5%. NII up 22% YoY.",
      score: "9.2",
      correlation: 95,
      volatility: "Gap Up",
      affectedSectors: ["Banking", "Private Sector Banks", "Financials"],
      priceImpact: "+3.2%",
      volumeChange: "+234%",
      path: "M0,80 L50,82 L100,81 L150,83 L200,30 L250,32 L300,28 L350,15 L400,10",
      chartData: [55, 58, 62, 68, 72, 78, 82, 85, 88, 92, 95, 98],
    },
    {
      id: 4,
      title: "NEW GREEN ENERGY SUBSIDY ANNOUNCED",
      sentiment: "Positive",
      impact: "Medium",
      time: "4H AGO",
      timestamp: Date.now() - 14400000,
      description:
        "Renewable energy stocks showing 4% momentum gain. Policy supports long-term ESG capital inflow. Solar sector expected to benefit most.",
      score: "6.8",
      correlation: 82,
      volatility: "Steady Momentum",
      affectedSectors: ["Renewable Energy", "Power", "Green Tech"],
      priceImpact: "+4.1%",
      volumeChange: "+112%",
      path: "M0,95 L50,90 L100,80 L150,75 L200,65 L250,55 L300,45 L350,35 L400,30",
      chartData: [40, 42, 45, 48, 52, 58, 65, 72, 78, 82, 85, 88],
    },
    {
      id: 5,
      title: "OIL PRICES SPIKED DUE TO TENSIONS",
      sentiment: "Negative",
      impact: "High",
      time: "5H AGO",
      timestamp: Date.now() - 18000000,
      description:
        "Energy costs rising. High correlation with inflation spike. Aviation and Paint stocks at risk. Crude up 4.2% in intraday.",
      score: "8.5",
      correlation: 96,
      volatility: "Volatile Drop",
      affectedSectors: ["Aviation", "Paints", "Logistics", "FMCG"],
      priceImpact: "-1.5% to -3.2%",
      volumeChange: "+189%",
      path: "M0,20 L50,25 L100,15 L150,35 L200,55 L250,75 L300,90 L350,85 L400,95",
      chartData: [85, 82, 78, 72, 68, 62, 55, 48, 42, 38, 35, 32],
    },
    {
      id: 6,
      title: "IT SECTOR WITNESSES ATTRITION DROP",
      sentiment: "Positive",
      impact: "Medium",
      time: "6H AGO",
      timestamp: Date.now() - 21600000,
      description:
        "Major IT firms report declining attrition rates. Margin expansion expected in coming quarters. Hiring sentiment improves.",
      score: "7.1",
      correlation: 75,
      volatility: "Gradual Uptrend",
      affectedSectors: ["Information Technology", "Consulting"],
      priceImpact: "+0.8%",
      volumeChange: "+45%",
      path: "M0,85 L50,80 L100,75 L150,70 L200,65 L250,60 L300,55 L350,50 L400,45",
      chartData: [48, 50, 52, 55, 58, 62, 65, 68, 70, 72, 74, 75],
    },
    {
      id: 7,
      title: "GOLD HITS ALL-TIME HIGH",
      sentiment: "Neutral",
      impact: "Medium",
      time: "8H AGO",
      timestamp: Date.now() - 28800000,
      description:
        "Safe-haven demand surges amid global uncertainty. Dollar index weakens. Jewellery stocks show mixed reaction.",
      score: "7.8",
      correlation: 88,
      volatility: "Parabolic Rise",
      affectedSectors: ["Jewellery", "Commodities", "Asset Management"],
      priceImpact: "+2.5%",
      volumeChange: "+167%",
      path: "M0,95 L50,88 L100,75 L150,60 L200,45 L250,30 L300,25 L350,20 L400,18",
      chartData: [25, 28, 32, 38, 45, 52, 60, 68, 75, 82, 88, 92],
    },
  ];

  useEffect(() => {
    setNewsFeed(initialNewsData);

    // Simulate real-time news updates
    const interval = setInterval(() => {
      // Add random price movements to simulate live updates
      setNewsFeed((prev) =>
        prev.map((news) => ({
          ...news,
          priceImpact: updatePriceImpact(news.priceImpact, news.sentiment),
        })),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Helper function to simulate price impact updates
  const updatePriceImpact = (current, sentiment) => {
    const change = (Math.random() * 0.2 - 0.1).toFixed(1);
    const value = parseFloat(current.replace(/[+-]/g, ""));
    const newValue = (value + parseFloat(change)).toFixed(1);
    return sentiment === "Positive" ? `+${newValue}%` : `-${newValue}%`;
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news);

    // Animate path change
    if (pathRef.current) {
      gsap.to(pathRef.current, {
        attr: { d: news.path },
        duration: 0.6,
        ease: "power2.inOut",
      });
    }

    // Animate chart
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current.children,
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.2)" },
      );
    }

    // Pulse effect
    gsap.fromTo(
      ".impact-flash",
      { scale: 0.8, opacity: 0 },
      { scale: 1.5, opacity: 1, duration: 0.4, yoyo: true, repeat: 1 },
    );

    // Calculate market impact
    calculateMarketImpact(news);
  };

  const calculateMarketImpact = (news) => {
    const impact = {
      immediate: Math.random() * 2 + 1,
      oneHour: Math.random() * 3 + 2,
      fourHour: Math.random() * 4 + 3,
      twentyFourHour: Math.random() * 5 + 4,
    };
    setMarketImpact(impact);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "text-green-600 bg-green-100 border-green-200";
      case "Negative":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "High":
        return "text-red-600 bg-red-50";
      case "Medium":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-blue-600 bg-blue-50";
    }
  };

  const filteredNews = newsFeed.filter((news) => {
    if (filterSentiment !== "all" && news.sentiment !== filterSentiment)
      return false;
    if (filterImpact !== "all" && news.impact !== filterImpact) return false;
    return true;
  });

  return (
    <div className="p-8 bg-white min-h-screen text-slate-900 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-12 bg-indigo-600 rounded-full"></span>
            <span className="text-[10px] font-black tracking-[0.3em] text-indigo-600">
              Neural Intelligence Feed
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-slate-900">
            Market<span className="text-indigo-600"> Intelligence.</span>
          </h2>
          <p className="text-slate-600 text-xs font-bold mt-4 uppercase tracking-widest">
            Real-time sentiment analysis • AI-powered impact prediction •
            Correlation scoring
          </p>
        </div>

        {/* Live Status */}
        <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-full border border-slate-200">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-black text-slate-700 uppercase tracking-widest">
            LIVE MARKET DATA
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-10">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full">
          <button
            onClick={() => setFilterSentiment("all")}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filterSentiment === "all"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterSentiment("Positive")}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filterSentiment === "Positive"
                ? "bg-green-600 text-white"
                : "text-slate-600 hover:text-green-600"
            }`}
          >
            Positive
          </button>
          <button
            onClick={() => setFilterSentiment("Negative")}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filterSentiment === "Negative"
                ? "bg-red-600 text-white"
                : "text-slate-600 hover:text-red-600"
            }`}
          >
            Negative
          </button>
          <button
            onClick={() => setFilterSentiment("Neutral")}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filterSentiment === "Neutral"
                ? "bg-yellow-600 text-white"
                : "text-slate-600 hover:text-yellow-600"
            }`}
          >
            Neutral
          </button>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full">
          <button
            onClick={() => setFilterImpact("all")}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filterImpact === "all"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Impact
          </button>
          <button
            onClick={() => setFilterImpact("High")}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filterImpact === "High"
                ? "bg-red-600 text-white"
                : "text-slate-600 hover:text-red-600"
            }`}
          >
            High
          </button>
          <button
            onClick={() => setFilterImpact("Medium")}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filterImpact === "Medium"
                ? "bg-orange-600 text-white"
                : "text-slate-600 hover:text-orange-600"
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilterImpact("Low")}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filterImpact === "Low"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Low
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: NEWS FEED */}
        <div className="lg:col-span-7 space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <div
                key={news.id}
                onClick={() => handleNewsClick(news)}
                className={`news-item p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
                  selectedNews?.id === news.id
                    ? "border-indigo-600 bg-indigo-50/30 shadow-xl"
                    : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    {/* Header Badges */}
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getSentimentColor(news.sentiment)}`}
                      >
                        {news.sentiment}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${getImpactColor(news.impact)}`}
                      >
                        {news.impact} Impact
                      </span>
                      <span className="text-[8px] font-black text-slate-500">
                        {news.time}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black tracking-tighter text-slate-900 mb-2">
                      {news.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {news.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Price Impact
                        </p>
                        <p
                          className={`text-sm font-black ${
                            news.priceImpact.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {news.priceImpact}
                        </p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Volume
                        </p>
                        <p className="text-sm font-black text-slate-900">
                          {news.volumeChange}
                        </p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Correlation
                        </p>
                        <p className="text-sm font-black text-indigo-600">
                          {news.correlation}%
                        </p>
                      </div>
                    </div>

                    {/* Affected Sectors */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {news.affectedSectors.map((sector, idx) => (
                        <span
                          key={idx}
                          className="text-[8px] px-2 py-1 bg-slate-100 rounded-full text-slate-600 font-black"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center self-center transition-all ${
                      selectedNews?.id === news.id
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-200 group-hover:border-indigo-600"
                    }`}
                  >
                    <span className="text-xl font-bold">→</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-[2rem]">
              <p className="text-slate-400 font-black text-sm">
                No news matches selected filters
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: ANALYTICS PANEL */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24">
            {selectedNews ? (
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[8px] font-black text-indigo-400 tracking-[0.3em] uppercase">
                      Neural Signal Analyzer
                    </span>
                    <h4 className="text-2xl font-black mt-2 uppercase tracking-tighter">
                      {selectedNews.title}
                    </h4>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border ${getSentimentColor(selectedNews.sentiment)}`}
                  >
                    {selectedNews.sentiment}
                  </span>
                </div>

                {/* Impact Visualizer */}
                <div className="mb-8">
                  <p className="text-xs text-slate-400 mb-3 font-black uppercase tracking-widest">
                    Impact Visualizer • {selectedNews.volatility}
                  </p>
                  <div className="h-48 relative bg-slate-800/50 rounded-2xl border border-white/10 p-4">
                    <svg className="w-full h-full" viewBox="0 0 400 100">
                      <path
                        ref={pathRef}
                        d={selectedNews.path}
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="opacity-80"
                      />
                      <circle
                        className="impact-flash fill-indigo-500 stroke-white"
                        cx="200"
                        cy="40"
                        r="8"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Price Labels */}
                    <div className="absolute top-2 right-4 text-right">
                      <p className="text-xs font-black text-indigo-400">
                        {selectedNews.volatility}
                      </p>
                      <p
                        className={`text-sm font-black ${
                          selectedNews.sentiment === "Positive"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {selectedNews.priceImpact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Market Impact Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-[8px] text-indigo-400 font-black uppercase mb-1">
                      Signal IQ
                    </p>
                    <p className="text-2xl font-black">
                      {selectedNews.score}
                      <span className="text-xs text-slate-400 ml-1">/10</span>
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-[8px] text-indigo-400 font-black uppercase mb-1">
                      Correlation
                    </p>
                    <p className="text-2xl font-black">
                      {selectedNews.correlation}%
                    </p>
                  </div>
                </div>

                {/* Price Impact Chart */}
                <div className="mb-6">
                  <p className="text-xs text-slate-400 mb-3 font-black uppercase tracking-widest">
                    Price Movement Analysis
                  </p>
                  <div ref={chartRef} className="flex items-end gap-1 h-24">
                    {selectedNews.chartData.map((value, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t"
                        style={{ height: `${value}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Impact Projection */}
                {marketImpact && Object.keys(marketImpact).length > 0 && (
                  <div className="mb-6 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <p className="text-xs font-black text-indigo-400 mb-3 uppercase tracking-widest">
                      Impact Projection
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[8px] text-slate-400">Immediate</p>
                        <p className="text-sm font-black text-green-400">
                          +{marketImpact.immediate.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-400">1 Hour</p>
                        <p className="text-sm font-black text-orange-400">
                          {marketImpact.oneHour.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-400">4 Hours</p>
                        <p className="text-sm font-black text-yellow-400">
                          {marketImpact.fourHour.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-400">24 Hours</p>
                        <p className="text-sm font-black text-blue-400">
                          {marketImpact.twentyFourHour.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="p-4 bg-white/5 rounded-xl italic text-sm text-slate-300 leading-relaxed">
                  "{selectedNews.description}"
                </div>

                {/* Toggle Correlation Button */}
                <button
                  onClick={() => setShowCorrelation(!showCorrelation)}
                  className="w-full mt-4 py-3 bg-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all"
                >
                  {showCorrelation ? "Hide" : "Show"} Correlation Matrix
                </button>

                {/* Correlation Matrix */}
                {showCorrelation && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl animate-in fade-in">
                    <p className="text-xs font-black text-indigo-400 mb-3">
                      Correlation Matrix
                    </p>
                    <div className="space-y-2">
                      {selectedNews.affectedSectors.map((sector, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center"
                        >
                          <span className="text-xs">{sector}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500"
                                style={{ width: `${Math.random() * 40 + 60}%` }}
                              />
                            </div>
                            <span className="text-xs font-black text-indigo-400">
                              {(Math.random() * 20 + 75).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[600px] border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-10">
                <div className="text-8xl font-black text-slate-100 mb-4">
                  📊
                </div>
                <p className="text-lg font-black text-slate-300 mb-2">
                  No Signal Selected
                </p>
                <p className="text-xs text-slate-400 max-w-xs">
                  Click on any news item to analyze its market impact and view
                  AI-powered insights
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4F46E5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }
      `}</style>
    </div>
  );
};

export default NewsIntelligence;

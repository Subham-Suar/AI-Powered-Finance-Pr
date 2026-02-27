import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Portfolio = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);
  const [optimizationSuggestion, setOptimizationSuggestion] = useState(null);
  const gaugeRef = useRef(null);
  const needleRef = useRef(null);
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  // Portfolio data that changes based on timeframe
  const [portfolio, setPortfolio] = useState({
    totalValue: 574220.0,
    dailyChange: 2.4,
    weeklyChange: 5.8,
    monthlyChange: 12.5,
    yearlyChange: 42.3,
    riskScore: 68,
    riskLevel: "Moderate-High",
    assets: [
      {
        name: "Equity (Stocks)",
        value: 373243,
        percentage: 65,
        color: "bg-indigo-600",
        allocation: 65,
        target: 55,
        deviation: 10,
        returns: "+15.2%",
        risk: "High",
      },
      {
        name: "Gold/Commodities",
        value: 86133,
        percentage: 15,
        color: "bg-yellow-500",
        allocation: 15,
        target: 20,
        deviation: -5,
        returns: "+8.4%",
        risk: "Medium",
      },
      {
        name: "Crypto",
        value: 68906.4,
        percentage: 12,
        color: "bg-orange-500",
        allocation: 12,
        target: 10,
        deviation: 2,
        returns: "+32.1%",
        risk: "Very High",
      },
      {
        name: "Cash/Liquid",
        value: 45937.6,
        percentage: 8,
        color: "bg-green-500",
        allocation: 8,
        target: 15,
        deviation: -7,
        returns: "+3.2%",
        risk: "Low",
      },
    ],
    historicalData: {
      "1D": [
        62, 58, 55, 52, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102,
        105, 108,
      ],
      "1W": [
        45, 48, 52, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102,
        105, 108, 112,
      ],
      "1M": [
        45, 52, 48, 58, 62, 55, 48, 42, 38, 45, 52, 58, 62, 68, 72, 75, 78, 82,
        85, 88,
      ],
      "3M": [
        38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95,
        98, 102,
      ],
      "1Y": [
        32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88,
        92, 95,
      ],
      ALL: [
        28, 30, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82,
        85, 88,
      ],
    },
  });

  // Performance metrics based on timeframe
  const getPerformanceMetrics = (timeframe) => {
    switch (timeframe) {
      case "1D":
        return {
          change: 2.4,
          high: 58200,
          low: 56800,
          volume: 12456,
          volatility: "Low",
        };
      case "1W":
        return {
          change: 5.8,
          high: 59800,
          low: 56200,
          volume: 89234,
          volatility: "Medium",
        };
      case "1M":
        return {
          change: 12.5,
          high: 62500,
          low: 54800,
          volume: 345678,
          volatility: "High",
        };
      case "3M":
        return {
          change: 18.2,
          high: 65800,
          low: 53200,
          volume: 987654,
          volatility: "High",
        };
      case "1Y":
        return {
          change: 42.3,
          high: 72500,
          low: 48500,
          volume: 2345678,
          volatility: "Very High",
        };
      case "ALL":
        return {
          change: 156.8,
          high: 89200,
          low: 32400,
          volume: 5678901,
          volatility: "Extreme",
        };
      default:
        return {
          change: 12.5,
          high: 62500,
          low: 54800,
          volume: 345678,
          volatility: "High",
        };
    }
  };

  // Asset allocation based on timeframe
  const getAssetAllocation = (timeframe) => {
    switch (timeframe) {
      case "1D":
      case "1W":
      case "1M":
        return [
          {
            name: "Equity (Stocks)",
            value: 373243,
            percentage: 65,
            color: "bg-indigo-600",
            allocation: 65,
            target: 55,
            deviation: 10,
            returns: "+15.2%",
            risk: "High",
          },
          {
            name: "Gold/Commodities",
            value: 86133,
            percentage: 15,
            color: "bg-yellow-500",
            allocation: 15,
            target: 20,
            deviation: -5,
            returns: "+8.4%",
            risk: "Medium",
          },
          {
            name: "Crypto",
            value: 68906.4,
            percentage: 12,
            color: "bg-orange-500",
            allocation: 12,
            target: 10,
            deviation: 2,
            returns: "+32.1%",
            risk: "Very High",
          },
          {
            name: "Cash/Liquid",
            value: 45937.6,
            percentage: 8,
            color: "bg-green-500",
            allocation: 8,
            target: 15,
            deviation: -7,
            returns: "+3.2%",
            risk: "Low",
          },
        ];
      case "3M":
        return [
          {
            name: "Equity (Stocks)",
            value: 412345,
            percentage: 68,
            color: "bg-indigo-600",
            allocation: 68,
            target: 55,
            deviation: 13,
            returns: "+18.5%",
            risk: "High",
          },
          {
            name: "Gold/Commodities",
            value: 78901,
            percentage: 13,
            color: "bg-yellow-500",
            allocation: 13,
            target: 20,
            deviation: -7,
            returns: "+6.2%",
            risk: "Medium",
          },
          {
            name: "Crypto",
            value: 78901,
            percentage: 13,
            color: "bg-orange-500",
            allocation: 13,
            target: 10,
            deviation: 3,
            returns: "+45.3%",
            risk: "Very High",
          },
          {
            name: "Cash/Liquid",
            value: 36416,
            percentage: 6,
            color: "bg-green-500",
            allocation: 6,
            target: 15,
            deviation: -9,
            returns: "+2.1%",
            risk: "Low",
          },
        ];
      case "1Y":
        return [
          {
            name: "Equity (Stocks)",
            value: 485000,
            percentage: 72,
            color: "bg-indigo-600",
            allocation: 72,
            target: 55,
            deviation: 17,
            returns: "+24.8%",
            risk: "High",
          },
          {
            name: "Gold/Commodities",
            value: 67400,
            percentage: 10,
            color: "bg-yellow-500",
            allocation: 10,
            target: 20,
            deviation: -10,
            returns: "+4.5%",
            risk: "Medium",
          },
          {
            name: "Crypto",
            value: 87620,
            percentage: 13,
            color: "bg-orange-500",
            allocation: 13,
            target: 10,
            deviation: 3,
            returns: "+89.7%",
            risk: "Very High",
          },
          {
            name: "Cash/Liquid",
            value: 33690,
            percentage: 5,
            color: "bg-green-500",
            allocation: 5,
            target: 15,
            deviation: -10,
            returns: "+1.8%",
            risk: "Low",
          },
        ];
      case "ALL":
        return [
          {
            name: "Equity (Stocks)",
            value: 623500,
            percentage: 78,
            color: "bg-indigo-600",
            allocation: 78,
            target: 55,
            deviation: 23,
            returns: "+156.3%",
            risk: "High",
          },
          {
            name: "Gold/Commodities",
            value: 56000,
            percentage: 7,
            color: "bg-yellow-500",
            allocation: 7,
            target: 20,
            deviation: -13,
            returns: "+32.8%",
            risk: "Medium",
          },
          {
            name: "Crypto",
            value: 96000,
            percentage: 12,
            color: "bg-orange-500",
            allocation: 12,
            target: 10,
            deviation: 2,
            returns: "+245.6%",
            risk: "Very High",
          },
          {
            name: "Cash/Liquid",
            value: 24000,
            percentage: 3,
            color: "bg-green-500",
            allocation: 3,
            target: 15,
            deviation: -12,
            returns: "+5.2%",
            risk: "Low",
          },
        ];
      default:
        return portfolio.assets;
    }
  };

  // Risk level based on timeframe
  const getRiskLevel = (timeframe) => {
    switch (timeframe) {
      case "1D":
        return "Low";
      case "1W":
        return "Moderate";
      case "1M":
        return "Moderate-High";
      case "3M":
        return "High";
      case "1Y":
        return "High";
      case "ALL":
        return "Very High";
      default:
        return "Moderate-High";
    }
  };

  // Risk score based on timeframe
  const getRiskScore = (timeframe) => {
    switch (timeframe) {
      case "1D":
        return 35;
      case "1W":
        return 52;
      case "1M":
        return 68;
      case "3M":
        return 78;
      case "1Y":
        return 82;
      case "ALL":
        return 91;
      default:
        return 68;
    }
  };

  // Needle rotation based on risk level
  const getNeedleRotation = (riskLevel) => {
    switch (riskLevel) {
      case "Low":
        return -30;
      case "Moderate":
        return 0;
      case "Moderate-High":
        return 45;
      case "High":
        return 75;
      case "Very High":
        return 90;
      default:
        return 45;
    }
  };

  // Handle timeframe change
  const handleTimeframeChange = (tf) => {
    setSelectedTimeframe(tf);

    const metrics = getPerformanceMetrics(tf);
    const newAssets = getAssetAllocation(tf);
    const newRiskLevel = getRiskLevel(tf);
    const newRiskScore = getRiskScore(tf);

    // Update portfolio state
    setPortfolio((prev) => ({
      ...prev,
      totalValue: newAssets.reduce((sum, asset) => sum + asset.value, 0),
      dailyChange: metrics.change,
      weeklyChange: tf === "1W" ? metrics.change : prev.weeklyChange,
      monthlyChange: tf === "1M" ? metrics.change : prev.monthlyChange,
      yearlyChange: tf === "1Y" ? metrics.change : prev.yearlyChange,
      riskScore: newRiskScore,
      riskLevel: newRiskLevel,
      assets: newAssets,
    }));

    // Animate needle to new position
    gsap.to(".risk-needle", {
      rotation: getNeedleRotation(newRiskLevel),
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    });

    // Animate historical chart
    gsap.fromTo(
      ".history-bar",
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 1, stagger: 0.02, ease: "back.out(1.2)" },
    );

    // Animate asset bars
    gsap.fromTo(
      ".asset-bar",
      { width: 0 },
      {
        width: (i, target) => target.style.width,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      },
    );

    // Animate metrics
    gsap.fromTo(
      ".metric-value",
      { textContent: 0 },
      {
        textContent: (i, target) => target.dataset.value,
        duration: 1.5,
        ease: "power1.in",
        snap: { textContent: 1 },
        stagger: 0.1,
      },
    );
  };

  // AI Rebalancer suggestions
  const rebalancingSuggestions = [
    {
      id: 1,
      action: "Reduce Crypto exposure",
      from: "BTC, ETH",
      to: "Gold ETF",
      reason: "Crypto volatility is high, gold provides stability",
      riskReduction: 15,
      potentialReturn: "+8.2%",
    },
    {
      id: 2,
      action: "Increase Cash position",
      from: "Tech Stocks",
      to: "Money Market",
      reason: "Market correction expected, cash for opportunities",
      riskReduction: 22,
      potentialReturn: "+4.5%",
    },
    {
      id: 3,
      action: "Add International Equity",
      from: "Domestic Stocks",
      to: "Global ETF",
      reason: "Diversification reduces country-specific risk",
      riskReduction: 18,
      potentialReturn: "+11.3%",
    },
  ];

  useEffect(() => {
    // Main entrance animation
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Animate asset bars
      gsap.from(".asset-bar", {
        width: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      });

      // Animate gauge needle based on risk level
      gsap.to(".risk-needle", {
        rotation: getNeedleRotation(portfolio.riskLevel),
        duration: 2,
        ease: "elastic.out(1, 0.5)",
        delay: 0.8,
      });

      // Animate historical chart
      gsap.from(".history-bar", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 1,
        stagger: 0.03,
        ease: "back.out(1.2)",
        delay: 1,
      });

      // Animate metrics
      gsap.from(".metric-value", {
        textContent: 0,
        duration: 2,
        ease: "power1.in",
        snap: { textContent: 1 },
        stagger: 0.2,
        delay: 1.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOptimizeClick = () => {
    setOptimizationSuggestion(
      rebalancingSuggestions[
        Math.floor(Math.random() * rebalancingSuggestions.length)
      ],
    );
    setShowRebalanceModal(true);

    gsap.fromTo(
      ".rebalance-modal",
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" },
    );
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "Low":
        return "text-green-500";
      case "Moderate":
        return "text-yellow-500";
      case "Moderate-High":
        return "text-orange-500";
      case "High":
        return "text-red-500";
      case "Very High":
        return "text-red-600";
      default:
        return "text-orange-500";
    }
  };

  const getDeviationBadge = (deviation) => {
    if (deviation > 0) {
      return (
        <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
          +{deviation}% over target
        </span>
      );
    } else if (deviation < 0) {
      return (
        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
          {deviation}% under target
        </span>
      );
    }
    return null;
  };

  const currentMetrics = getPerformanceMetrics(selectedTimeframe);

  return (
    <div
      ref={containerRef}
      className="p-8 bg-slate-50 min-h-screen text-slate-900 font-sans"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-12 bg-indigo-600 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
              Portfolio Analytics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
            Portfolio<span className="text-indigo-600"> Analyzer.</span>
          </h2>
          <p className="text-slate-600 text-xs font-bold mt-4 uppercase tracking-widest">
            AI-powered insights • Risk management • Smart rebalancing
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex bg-white rounded-full p-1 border border-slate-200 shadow-sm">
          {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                selectedTimeframe === tf
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="portfolio-card bg-white p-6 rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-2">
            Total Value
          </p>
          <p className="text-3xl font-black text-slate-900">
            ₹{portfolio.totalValue.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs font-black ${currentMetrics.change > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {currentMetrics.change > 0 ? "+" : ""}
              {currentMetrics.change}%
            </span>
            <span className="text-xs text-slate-400">
              vs previous {selectedTimeframe}
            </span>
          </div>
        </div>

        <div className="portfolio-card bg-white p-6 rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-2">
            Period High
          </p>
          <p className="text-3xl font-black text-slate-900">
            ₹{currentMetrics.high.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            {selectedTimeframe} high
          </p>
        </div>

        <div className="portfolio-card bg-white p-6 rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-2">
            Period Low
          </p>
          <p className="text-3xl font-black text-slate-900">
            ₹{currentMetrics.low.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-2">{selectedTimeframe} low</p>
        </div>

        <div className="portfolio-card bg-white p-6 rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-2">
            Volume
          </p>
          <p className="text-3xl font-black text-slate-900">
            {(currentMetrics.volume / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-slate-400 mt-2">Trading volume</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Asset Allocation */}
        <div className="lg:col-span-5 space-y-6">
          {/* Allocation Pie Chart */}
          <div className="portfolio-card bg-white p-6 rounded-3xl border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Asset Allocation ({selectedTimeframe})
              </h3>
              <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-black">
                {portfolio.assets.length} Assets
              </span>
            </div>

            {/* Pie Chart Visualization */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
              <div className="relative w-40 h-40">
                <svg
                  viewBox="0 0 100 100"
                  className="transform -rotate-90 w-full h-full"
                >
                  {portfolio.assets.map((asset, i) => {
                    const percentages = portfolio.assets
                      .slice(0, i)
                      .reduce((sum, a) => sum + a.percentage, 0);
                    const startAngle = percentages * 3.6;
                    const endAngle = (percentages + asset.percentage) * 3.6;

                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;

                    const x1 = 50 + 40 * Math.cos(startRad);
                    const y1 = 50 + 40 * Math.sin(startRad);
                    const x2 = 50 + 40 * Math.cos(endRad);
                    const y2 = 50 + 40 * Math.sin(endRad);

                    const largeArc = asset.percentage > 50 ? 1 : 0;

                    const colors = ["#4F46E5", "#EAB308", "#F97316", "#22C55E"];

                    return (
                      <path
                        key={i}
                        d={`M50 50 L${x1} ${y1} A40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={colors[i % colors.length]}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <title>
                          {asset.name}: {asset.percentage}%
                        </title>
                      </path>
                    );
                  })}
                  <circle cx="50" cy="50" r="25" fill="white" />
                </svg>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-3">
                {portfolio.assets.map((asset, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${asset.color}`}
                      ></div>
                      <span className="text-sm font-medium text-slate-700">
                        {asset.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black">
                        {asset.percentage}%
                      </span>
                      <p className="text-xs text-slate-500">
                        ₹{(asset.value / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Allocation */}
            <div className="space-y-4">
              {portfolio.assets.map((asset, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm">{asset.name}</span>
                      <span
                        className={`text-[8px] px-2 py-0.5 rounded-full ${
                          asset.risk === "Low"
                            ? "bg-green-100 text-green-700"
                            : asset.risk === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : asset.risk === "High"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {asset.risk} Risk
                      </span>
                    </div>
                    <span className="text-sm font-black">{asset.returns}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">
                          Current: {asset.allocation}%
                        </span>
                        <span className="text-slate-500">
                          Target: {asset.target}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`asset-bar h-full ${asset.color}`}
                          style={{
                            width: `${(asset.allocation / asset.target) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    {getDeviationBadge(asset.deviation)}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-4 bg-indigo-50 text-indigo-700 font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-sm uppercase tracking-widest">
              View Full Asset List →
            </button>
          </div>

          {/* Historical Performance */}
          <div className="portfolio-card bg-white p-6 rounded-3xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Performance History
              </h3>
              <span className="text-xs font-black text-indigo-600">
                {selectedTimeframe} Performance
              </span>
            </div>
            <div ref={chartRef} className="flex items-end gap-1 h-32">
              {portfolio.historicalData[selectedTimeframe].map((value, i) => (
                <div
                  key={i}
                  className="history-bar flex-1 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-500">
              <span>Start</span>
              <span>Mid</span>
              <span>End</span>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-600">
                <span className="font-black">Volatility: </span>
                {currentMetrics.volatility} •
                <span className="font-black ml-2">Return: </span>
                <span
                  className={
                    currentMetrics.change > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {currentMetrics.change > 0 ? "+" : ""}
                  {currentMetrics.change}%
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Middle Column - Risk Exposure */}
        <div className="lg:col-span-4 space-y-6">
          {/* Risk Meter */}
          <div className="portfolio-card bg-white p-6 rounded-3xl border border-slate-200 text-center">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
              Risk Exposure Meter
            </h3>
            <p className="text-xs text-slate-500 mb-8">
              {selectedTimeframe} risk assessment
            </p>

            {/* Gauge */}
            <div className="relative w-56 h-28 mx-auto mb-4">
              {/* Gauge Background */}
              <div className="absolute inset-0 border-[20px] border-slate-100 rounded-t-full"></div>

              {/* Gauge Colors */}
              <div
                className="absolute inset-0 border-[20px] border-t-green-500 border-r-yellow-500 border-b-orange-500 border-l-red-500 rounded-t-full"
                style={{
                  clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
                }}
              ></div>

              {/* Needle */}
              <div
                ref={needleRef}
                className="risk-needle absolute bottom-0 left-1/2 w-1.5 h-20 bg-slate-900 origin-bottom -translate-x-1/2 rounded-full z-10"
              >
                <div className="w-4 h-4 bg-slate-900 rounded-full absolute -bottom-1 -left-1.5"></div>
              </div>

              {/* Center Dot */}
              <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full -translate-x-1/2 z-20"></div>

              {/* Labels */}
              <div className="absolute -bottom-6 left-0 text-xs font-black text-green-600">
                Low
              </div>
              <div className="absolute -bottom-6 right-0 text-xs font-black text-red-600">
                High
              </div>
            </div>

            <div className="mt-10">
              <p
                className={`text-2xl font-black ${getRiskColor(portfolio.riskLevel)}`}
              >
                {portfolio.riskLevel}
              </p>
              <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
                Risk Score:{" "}
                <span className="font-black">{portfolio.riskScore}/100</span>
              </p>
            </div>

            {/* Risk Breakdown */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Volatility</p>
                <p className="text-xl font-black text-orange-500">
                  {selectedTimeframe === "1D"
                    ? "12.5%"
                    : selectedTimeframe === "1W"
                      ? "15.8%"
                      : selectedTimeframe === "1M"
                        ? "18.5%"
                        : selectedTimeframe === "3M"
                          ? "22.3%"
                          : selectedTimeframe === "1Y"
                            ? "28.7%"
                            : "35.2%"}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Beta</p>
                <p className="text-xl font-black text-indigo-600">
                  {selectedTimeframe === "1D"
                    ? "1.12"
                    : selectedTimeframe === "1W"
                      ? "1.24"
                      : selectedTimeframe === "1M"
                        ? "1.32"
                        : selectedTimeframe === "3M"
                          ? "1.45"
                          : selectedTimeframe === "1Y"
                            ? "1.58"
                            : "1.76"}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Sharpe</p>
                <p className="text-xl font-black text-green-600">
                  {selectedTimeframe === "1D"
                    ? "2.15"
                    : selectedTimeframe === "1W"
                      ? "1.95"
                      : selectedTimeframe === "1M"
                        ? "1.85"
                        : selectedTimeframe === "3M"
                          ? "1.62"
                          : selectedTimeframe === "1Y"
                            ? "1.48"
                            : "1.25"}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Max DD</p>
                <p className="text-xl font-black text-red-500">
                  {selectedTimeframe === "1D"
                    ? "-2.4%"
                    : selectedTimeframe === "1W"
                      ? "-5.8%"
                      : selectedTimeframe === "1M"
                        ? "-12.4%"
                        : selectedTimeframe === "3M"
                          ? "-18.6%"
                          : selectedTimeframe === "1Y"
                            ? "-24.3%"
                            : "-32.8%"}
                </p>
              </div>
            </div>
          </div>

          {/* Diversification Score */}
          <div className="portfolio-card bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-3xl text-white">
            <h3 className="text-sm font-black uppercase tracking-wider mb-4 opacity-90">
              Diversification Score ({selectedTimeframe})
            </h3>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="white"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - (portfolio.riskScore > 70 ? 0.65 : portfolio.riskScore > 50 ? 0.72 : 0.85))}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-black">
                  {portfolio.riskScore > 70
                    ? 65
                    : portfolio.riskScore > 50
                      ? 72
                      : 85}
                </span>
              </div>
              <div>
                <p className="text-3xl font-black">
                  {portfolio.riskScore > 70
                    ? 65
                    : portfolio.riskScore > 50
                      ? 72
                      : 85}
                  /100
                </p>
                <p className="text-xs opacity-80">
                  {portfolio.riskScore > 70
                    ? "Poor diversification"
                    : portfolio.riskScore > 50
                      ? "Moderate diversification"
                      : "Good diversification"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="opacity-80">Sector Concentration</span>
                <span className="font-black">
                  {portfolio.riskScore > 70
                    ? "Very High"
                    : portfolio.riskScore > 50
                      ? "High"
                      : "Medium"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-80">Geographic Spread</span>
                <span className="font-black">
                  {selectedTimeframe === "ALL" ? "Medium" : "Low"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-80">Asset Correlation</span>
                <span className="font-black">
                  {(portfolio.riskScore / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - AI Rebalancer */}
        <div className="lg:col-span-3">
          <div className="portfolio-card bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-xl border border-white/10 sticky top-24">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-indigo-500/30 text-indigo-300 text-[10px] font-black px-3 py-1 rounded-full border border-indigo-500/30">
                  AI-POWERED
                </span>
                <span className="bg-green-500/20 text-green-400 text-[10px] font-black px-3 py-1 rounded-full">
                  LIVE
                </span>
              </div>

              <h3 className="text-2xl font-black mb-2">Smart Rebalancer</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                AI-detected inefficiencies for {selectedTimeframe} timeframe
              </p>

              {/* Current Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Current Risk</p>
                    <p
                      className={`text-xl font-black ${getRiskColor(portfolio.riskLevel)}`}
                    >
                      {portfolio.riskLevel}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-1">Target Risk</p>
                    <p className="text-xl font-black text-green-400">
                      {portfolio.riskLevel === "Low"
                        ? "Low"
                        : portfolio.riskLevel === "Moderate"
                          ? "Moderate"
                          : portfolio.riskLevel === "Moderate-High"
                            ? "Moderate"
                            : "Moderate-High"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Expected Return
                    </p>
                    <p className="text-2xl font-black text-green-400">
                      +{(portfolio.yearlyChange * 0.8).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-1">
                      After Rebalance
                    </p>
                    <p className="text-2xl font-black text-indigo-400">
                      +{(portfolio.yearlyChange * 1.15).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="space-y-3 mb-6">
                <p className="text-xs font-black text-indigo-400 uppercase tracking-wider mb-2">
                  Optimization Opportunities
                </p>

                <div className="p-4 bg-white/5 rounded-xl border border-indigo-500/20">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 text-xl">⚠️</span>
                    <div>
                      <p className="text-sm font-black mb-1">
                        Crypto Overallocation
                      </p>
                      <p className="text-xs text-slate-400 mb-2">
                        Reduce {portfolio.assets[2].deviation}% from Crypto
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                          -15% Risk
                        </span>
                        <span className="text-[8px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          +8.2% Return
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 text-xl">💡</span>
                    <div>
                      <p className="text-sm font-black mb-1">
                        Increase Cash Position
                      </p>
                      <p className="text-xs text-slate-400 mb-2">
                        Add {Math.abs(portfolio.assets[3].deviation)}% to cash
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          -22% Risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">🌍</span>
                    <div>
                      <p className="text-sm font-black mb-1">
                        Add International Equity
                      </p>
                      <p className="text-xs text-slate-400 mb-2">
                        Diversify with global ETF
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          -18% Risk
                        </span>
                        <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full">
                          +11.3% Return
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOptimizeClick}
                className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all text-sm uppercase tracking-widest shadow-lg shadow-indigo-500/25"
              >
                Optimize Allocation Now
              </button>

              <p className="text-[8px] text-center text-slate-500 mt-4">
                AI-powered suggestions based on {selectedTimeframe} analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rebalance Modal */}
      {showRebalanceModal && optimizationSuggestion && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50">
          <div className="rebalance-modal bg-white rounded-3xl max-w-md w-full overflow-hidden">
            <div className="p-6 bg-indigo-600 text-white">
              <h3 className="text-2xl font-black mb-2">Optimization Plan</h3>
              <p className="text-sm opacity-90">
                AI-generated rebalancing strategy for {selectedTimeframe}
              </p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-xs text-slate-500 mb-2">SUGGESTED ACTION</p>
                <p className="text-lg font-black text-slate-900 mb-3">
                  {optimizationSuggestion.action}
                </p>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">From</p>
                    <p className="font-black text-orange-600">
                      {optimizationSuggestion.from}
                    </p>
                  </div>
                  <span className="text-2xl text-slate-400">→</span>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">To</p>
                    <p className="font-black text-green-600">
                      {optimizationSuggestion.to}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4">
                  {optimizationSuggestion.reason}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-xs text-green-600 mb-1">
                      Risk Reduction
                    </p>
                    <p className="text-2xl font-black text-green-700">
                      -{optimizationSuggestion.riskReduction}%
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-xl">
                    <p className="text-xs text-indigo-600 mb-1">
                      Potential Return
                    </p>
                    <p className="text-2xl font-black text-indigo-700">
                      {optimizationSuggestion.potentialReturn}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRebalanceModal(false)}
                  className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-black hover:border-slate-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowRebalanceModal(false);
                    // Apply rebalancing logic here
                  }}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-black hover:bg-indigo-700 transition-all"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

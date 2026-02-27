import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { gsap } from "gsap";

import { useAuth } from "./context/AuthContext";

import Navigation from "./components/Navigation.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Playground from "./components/Playground.jsx";
import NewsIntelligence from "./components/NewsIntelligence.jsx";
import Portfolio from "./components/Portfolio.jsx";
import AIAdvisor from "./components/AIAdvisor.jsx";
import Learning from "./components/Learning.jsx";
import Auth from "./components/Auth.jsx";

const App = () => {
  const { user, login } = useAuth();
  const location = useLocation();
  const pageContainerRef = useRef(null);

  useEffect(() => {
    if (user && pageContainerRef.current) {
      gsap.fromTo(
        pageContainerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    }
  }, [location, user]);

  if (!user) {
    return <Auth onAuthSuccess={(data) => login(data)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navigation user={user} />

      <main ref={pageContainerRef} className="pt-24 min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/news" element={<NewsIntelligence />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/advisor" element={<AIAdvisor />} />

            {/* Fallback - Redirect unauthorized paths to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>

      <footer className="py-10 text-center border-t border-slate-200 bg-white">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          © 2026 FIN-TECH AI Neural Systems
        </p>
      </footer>
    </div>
  );
};

export default App;

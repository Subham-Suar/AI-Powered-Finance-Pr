import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { gsap } from "gsap";

const Navigation = () => {
  const { user, login, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const profileRef = useRef(null);
  const linksRef = useRef([]);
  const signoutRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { label: "Dashboard", path: "/", icon: "📊" },
    { label: "Learning", path: "/learning", icon: "📚" },
    { label: "Playground", path: "/playground", icon: "🎮" },
    { label: "News", path: "/news", icon: "📰" },
    { label: "Portfolio", path: "/portfolio", icon: "💰" },
    { label: "Advisor", path: "/advisor", icon: "🤖" },
  ];

  useEffect(() => {
    // Entrance Animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 },
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" },
      );

      gsap.fromTo(
        ".mobile-link",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05, duration: 0.4, delay: 0.2 },
      );
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on resize (desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 z-[99999] px-4 md:px-6 lg:px-8 py-3 flex justify-between items-center shadow-sm"
      >
        {/* --- LEFT: PROFILE & LOGO --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Profile Circle - Always Visible */}
          <div
            ref={profileRef}
            className="flex items-center gap-2 sm:gap-3 border-r border-slate-200 pr-2 sm:pr-4"
          >
            <div className="relative group flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 border-2 border-white shadow-lg rounded-full flex items-center justify-center font-bold text-white text-sm cursor-pointer hover:scale-110 transition-all">
                S
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>

              {/* Tooltip */}
              <span className="absolute left-0 top-12 bg-slate-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100001] pointer-events-none">
                Sankar
              </span>
            </div>

            {/* Level & Status - Hidden on very small screens */}
            <div className="leading-none hidden xs:block min-w-[60px]">
              <p className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                LVL {user?.level || 4}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[8px] sm:text-[10px] font-black text-green-600 uppercase italic">
                  ONLINE
                </p>
              </div>
            </div>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 sm:gap-2 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic shadow-md group-hover:rotate-12 transition-transform">
              F
            </div>
            <h1 className="text-sm sm:text-base lg:text-lg font-black italic text-slate-800 tracking-tighter uppercase hidden xs:block truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
              FIN<span className="hidden sm:inline">-TECH</span>{" "}
              <span className="text-indigo-600">AI</span>
            </h1>
          </Link>
        </div>

        {/* --- CENTER: DESKTOP LINKS (Hidden on mobile) --- */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              ref={(el) => (linksRef.current[index] = el)}
              className={`text-[9px] xl:text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group px-2 py-1 ${
                location.pathname === link.path
                  ? "text-indigo-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* --- RIGHT: SIGN OUT & MOBILE MENU --- */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sign In/Out Button - Always Visible */}
          {user ? (
            <button
              onClick={logout}
              ref={signoutRef}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-slate-900 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              <span className="hidden xs:inline">Sign-out</span>
              <span className="xs:hidden">Exit</span>
              <span className="ml-1">→</span>
            </button>
          ) : (
            <button
              onClick={login}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-indigo-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 shadow-lg transition-all whitespace-nowrap"
            >
              <span className="hidden xs:inline">Sign-in</span>
              <span className="xs:hidden">Login</span>
              <span className="ml-1">→</span>
            </button>
          )}

          {/* Mobile Menu Toggle - Visible only on tablet/mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-indigo-100 transition-all focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="space-y-1">
              <span
                className={`block w-4 sm:w-5 h-0.5 bg-slate-800 transition-all ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-4 sm:w-5 h-0.5 bg-slate-800 transition-all ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-4 sm:w-5 h-0.5 bg-slate-800 transition-all ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-white shadow-2xl z-[99999] lg:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="pt-16 sm:pt-20 px-4 sm:px-6">
          {/* Mobile User Info */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8 p-3 sm:p-4 bg-indigo-50 rounded-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-black text-base sm:text-lg flex-shrink-0">
              S
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-base font-black text-slate-900 truncate">
                Sankar
              </p>
              <p className="text-[10px] sm:text-xs text-slate-600 truncate">
                Level 04 • 2,450 XP
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[8px] sm:text-[10px] font-black text-green-600 uppercase">
                  ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-link flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all ${
                  location.pathname === link.path
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <span className="text-lg sm:text-xl w-6 sm:w-7">
                  {link.icon}
                </span>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider flex-1">
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <span className="text-white text-sm">✓</span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Sign Out */}
          {user && (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-6 sm:mt-8 py-3 sm:py-4 bg-red-50 text-red-600 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-red-100 transition-all"
            >
              Sign Out
            </button>
          )}

          {/* Mobile Version Info */}
          <div className="mt-8 text-center">
            <p className="text-[8px] text-slate-400">Version 2.0 • Beta</p>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under navbar */}
      <div className="h-14 sm:h-16 lg:h-20 w-full"></div>

      {/* Custom CSS for extra small screens */}
      <style>{`
        @media (max-width: 380px) {
          .xs\\:block {
            display: none;
          }
          .xs\\:inline {
            display: none;
          }
          .xs\\:hidden {
            display: inline;
          }
        }
        
        @media (min-width: 381px) {
          .xs\\:block {
            display: block;
          }
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
        
        /* Better touch targets for mobile */
        @media (max-width: 768px) {
          button, a {
            min-height: 36px;
            min-width: 36px;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
